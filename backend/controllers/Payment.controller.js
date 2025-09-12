import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import PurchasedCourse from "../models/purchasedCourse.model.js";
import { getEsewaPaymentHash, verifyEsewaPayment } from "../utils/esewa.js";

export const initializePayment = async (req, res) => {
  try {
    const { courseId, totalPrice } = req.body;
    const userId = req.user.userId;
    // Validate item exists and the price matches
    const courseData = await Course.findOne({
      _id: courseId,
      price: Number(totalPrice),
    });

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course not found or price mismatch.",
      });
    }

    // Check if user already purchased or has a pending payment for this course
    const existingPurchase = await PurchasedCourse.findOne({
      course: courseId,
      enrollee: userId,
      status: { $in: ["completed"] }, // block both pending and completed
    });

    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "You have already completed payment for this course.",
        purchasedCourseData: existingPurchase,
      });
    }

    // Create a record for the purchase
    const purchasedCourseData = await PurchasedCourse.create({
      course: courseId,
      enrollee: userId,
      paymentMethod: "esewa",
      totalPrice: totalPrice,
    });
    // console.log("purchased courese", purchasedCourseData);

    // Initiate payment with eSewa
    const paymentInitiate = await getEsewaPaymentHash({
      amount: totalPrice,
      transaction_uuid: purchasedCourseData._id,
    });
    // console.log("paymentInitiate", paymentInitiate);
    // Respond with payment details
    res.json({
      success: true,
      payment: {
        amount: totalPrice,
        tax_amount: 0,
        total_amount: totalPrice,
        transaction_uuid: purchasedCourseData._id,
        product_code: process.env.ESEWA_PRODUCT_CODE,
        success_url: "http://localhost:8000/api/payment/complete-payment",
        failure_url: "http://localhost:8000/api/payment/failed",
        product_service_charge: 0,
        product_delivery_charge: 0,
        signature: paymentInitiate.signature,
        signed_field_names: paymentInitiate.signed_field_names,
      },
      message: "Course enrolled succesfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//Verify By Esewa
export const completePayment = async (req, res) => {
  const { data } = req.query; // Data received from eSewa's redirect
  // console.log("data", data);
  try {
    // Verify payment with eSewa
    const paymentInfo = await verifyEsewaPayment(data);

    // Find the purchased item using the transaction UUID
    const purchasedCourseData = await PurchasedCourse.findById(
      paymentInfo.response.transaction_uuid
    );

    if (!purchasedCourseData) {
      return res.status(500).json({
        success: false,
        message: "Purchase not found",
      });
    }

    const existingPayment = await Payment.findOne({
      transactionId: paymentInfo.decodedData.transaction_code,
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already processed",
        paymentData: existingPayment,
      });
    }

    // Create a new payment record in the database
    const paymentData = await Payment.create({
      pidx: paymentInfo.decodedData.transaction_code,
      transactionId: paymentInfo.decodedData.transaction_code,
      productId: paymentInfo.response.transaction_uuid,
      amount: purchasedCourseData.totalPrice,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "esewa",
      status: "success",
    });

    // Update the purchased item status to 'completed'
    await PurchasedCourse.findByIdAndUpdate(
      paymentInfo.response.transaction_uuid,
      { $set: { status: "completed" } }
    );

    const course = await Course.findById(purchasedCourseData.course);
    if (
      course &&
      !course.enrolledStudents.some(
        (id) => id.toString() === purchasedCourseData.enrollee.toString()
      )
    ) {
      course.enrolledStudents.push(purchasedCourseData.enrollee);
      await course.save();
    }
    // Respond with success message
    res.json({
      success: true,
      message: "Payment successful",
      paymentData,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification",
      error: error.message,
    });
  }
};

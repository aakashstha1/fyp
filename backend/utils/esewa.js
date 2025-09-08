import axios from "axios";
import crypto from "crypto";

// Generate eSewa payment hash
export async function getEsewaPaymentHash({ amount, transaction_uuid }) {
  try {
    const productCode = process.env.ESEWA_PRODUCT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;

    // Use & not ,
    // const data = `total_amount=${amount}&transaction_uuid=${transaction_uuid}&product_code=${productCode}`;
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    throw error;
  }
}

// Verify eSewa payment
export async function verifyEsewaPayment(encodedData) {
  try {
    // Decode base64 payload
    let decodedData = Buffer.from(encodedData, "base64").toString("utf-8");
    decodedData = JSON.parse(decodedData);

    // console.log("Decoded payment data:", decodedData);

    const productCode = process.env.ESEWA_PRODUCT_CODE;
    const secretKey = process.env.ESEWA_SECRET_KEY;

    // Signed string must match original structure
    // const data = `transaction_code=${decodedData.transaction_code}&status=${decodedData.status}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}&product_code=${productCode}&signed_field_names=${decodedData.signed_field_names}`;
    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${productCode},signed_field_names=${decodedData.signed_field_names}`;

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    if (hash !== decodedData.signature) {
      throw { message: "Invalid signature", decodedData };
    }

    // Verify with eSewa server
    const response = await axios.get(
      `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${productCode}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      {
        headers: { Accept: "application/json" },
      }
    );

    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw { message: "Invalid transaction", decodedData };
    }

    return { response: response.data, decodedData };
  } catch (error) {
    throw error;
  }
}

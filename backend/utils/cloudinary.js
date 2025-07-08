import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

// Extract public_id from full Cloudinary URL
export const extractPublicId = (url) => {
  const parts = url.split("/");
  const fileWithExtension = parts[parts.length - 1]; // "timestamp-filename.ext"
  const publicId = fileWithExtension.split(".")[0]; // Remove file extension
  return `instructor_docs/${publicId}`;
};

// Delete file from Cloudinary
export const deleteCloudinaryFile = async (url) => {
  const publicId = extractPublicId(url);
  return await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
};

// src/utils/cloudinary.js
export const CLOUD_NAME = "dk7nehuz3"; // your Cloudinary cloud name

export function getCloudinaryURL(publicId, width = 400, height = 400, format = "jpg") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill/${publicId}.${format}`;
}
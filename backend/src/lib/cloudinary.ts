import { v2 as cloudinary } from 'cloudinary';

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (cloud_name && api_key && api_secret) {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}


/**
 * Uploads a file buffer directly to Cloudinary
 * @param fileBuffer The file buffer from multer memory storage
 * @returns The secure URL of the uploaded image
 */
export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If no credentials found, throw error
    if (!process.env.CLOUDINARY_CLOUD_NAME && !process.env.CLOUDINARY_URL) {
      return reject(
        new Error(
          'Cloudinary environment variables (CLOUDINARY_CLOUD_NAME or CLOUDINARY_URL) are missing in the backend environment.'
        )
      );
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'values_vruksha_gallery',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload_stream error:', error);
          return reject(error);
        }
        if (!result || !result.secure_url) {
          return reject(new Error('Cloudinary response did not return a secure_url.'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

/**
 * Extracts Cloudinary public ID from a secure URL for image deletion.
 * Example secure_url: https://res.cloudinary.com/cloud_name/image/upload/v1234567/values_vruksha_gallery/xyz.png
 * Public ID: values_vruksha_gallery/xyz
 * @param url Cloudinary secure URL
 */
export const extractPublicId = (url: string): string | null => {
  try {
    if (!url || !url.includes('cloudinary.com')) return null;
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Everything after the version (v1234567) or after /upload if no version prefix is present
    // Normally it is /upload/v1234567/folder/name.ext -> parts after upload are [v1234567, folder, name.ext]
    const relevantParts = parts.slice(uploadIndex + 1);
    
    // If first part starts with 'v' and is a number, it's the version, so skip it
    if (relevantParts[0] && /^v\d+$/.test(relevantParts[0])) {
      relevantParts.shift();
    }
    
    const publicIdWithExtension = relevantParts.join('/');
    
    // Strip file extension
    const lastDotIndex = publicIdWithExtension.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return publicIdWithExtension.substring(0, lastDotIndex);
    }
    return publicIdWithExtension;
  } catch (err) {
    console.error('Error extracting public ID:', err);
    return null;
  }
};

/**
 * Deletes an image from Cloudinary using its secure URL
 * @param url Cloudinary secure URL
 */
export const deleteFromCloudinary = async (url: string): Promise<void> => {
  const publicId = extractPublicId(url);
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted Cloudinary asset ${publicId}:`, result);
  } catch (err) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, err);
  }
};

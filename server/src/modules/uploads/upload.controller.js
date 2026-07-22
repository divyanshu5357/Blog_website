import fs from "fs";
import cloudinary from "../../config/cloudinary.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("No image uploaded.");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "aarambh/posts",
    });

    fs.unlinkSync(req.file.path);

    return res.status(200).json(
      new ApiResponse(200, "Image uploaded successfully.", {
        url: result.secure_url,
        publicId: result.public_id,
      })
    );
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    next(error);
  }
};
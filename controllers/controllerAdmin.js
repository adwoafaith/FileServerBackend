const businessDistribution = require("../models/file");
const cloudinary = require('cloudinary');
const dotenv = require('dotenv')
dotenv.config();

cloudinary.v2.config({
    cloud_name: 'dxclgkewn',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const addFile = async (req, res, next) => {
    const { title, description, contentType, filename } = req.body
    try {
        const results = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'file_server' })

        if (results?.secure_url) {
            const data = {
                title,
                description,
                contentType,
                filename,
                file_url: results?.secure_url,
                format: results?.format
            }
            const newFile = await businessDistribution.create(data)
            return res.status(200).json({ message: "File added sucessfully", file: newFile });
        }
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: "File title already exists" })
        return res.status(error.code || 400).json({
            message: error.message || "An error occured",
            error: error,
        });
    }

};

const getCounts = async (req, res) => {
    const fileId = req.params.id;
    try {
        const file = businessDistribution(fileId);
        if (!file) {
            return res.status(400).json({ message: "file not found" });
        }
        return res
            .status(200)
            .json({ emailCount: file.emailCount, downloadCount: file.downloadCount });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    addFile,
    getCounts,
};
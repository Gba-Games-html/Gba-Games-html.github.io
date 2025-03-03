const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors'); // For handling CORS

const app = express();
const upload = multer({ dest: 'uploads/' });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Middleware for logging requests
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const originalName = req.file.originalname;
    const fileExtension = path.extname(originalName);
    const newFileName = `${req.file.filename}.something${fileExtension}`;
    const newFilePath = path.join(__dirname, 'uploads', newFileName);

    fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            return res.status(500).json({ success: false, message: 'Error processing file' });
        }

        const link = `http://localhost:3000/uploads/${newFileName}`;
        res.json({ success: true, link });
    });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

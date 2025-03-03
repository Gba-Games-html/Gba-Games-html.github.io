const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: 'No file uploaded' });
    }

    const originalName = req.file.originalname;
    const fileExtension = path.extname(originalName);
    const newFileName = `${req.file.filename}.something${fileExtension}`;
    const newFilePath = path.join(__dirname, 'uploads', newFileName);

    fs.renameSync(req.file.path, newFilePath);
    const link = `http://localhost:3000/uploads/${newFileName}`;

    res.json({ success: true, link });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

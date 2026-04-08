import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ make uploads publicly accessible
app.use("/uploads", express.static("uploads"));

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 🟢 CREATE PRODUCT
app.post("/api/products", upload.single("image"), (req, res) => {
  try {
    const product = {
      id: Date.now(),
      name: "Sample Product",
      price: 100,
      image: req.file.filename, // only store filename
    };

    res.json({
      ...product,
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
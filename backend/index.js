const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const postRoute = require("./routes/posts");
const cors = require("cors");

dotenv.config();

const whitelist = ['http://localhost:3000', 'http://localhost:8800', "myname"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/posts", postRoute);

if(process.env.NODE_ENV === 'production'){
  app.use( express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"frontend/build","index.html"))
  })
}

app.listen(8800, () => {
  console.log("Backend server running");
});

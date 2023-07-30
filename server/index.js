const express = require("express");
const cors = require("cors");
const pdf = require("html-pdf");
const pdfSample = require("./pdfsample/index");
const newSchema = require("./userModel");

const { connectDB } = require("./mongo");
connectDB();

const app = express();

const port = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/create-pdf/", (req, res) => {
  // const {templateid} = req.params;
  pdf.create(pdfSample(req.body), {}).toFile("Resume.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    res.send(Promise.resolve());
    console.log("Success");
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/Resume.pdf`);
});

app.use(express.static("../client/build"));

app.get("/", cors(), (req, res) => {});

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await collection.findOne({
      email: email,
      password: password
    });

    if (check) {
      res.json("Login Successfull");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const data = {
    email: email,
    password: password,
  };

  try {
    const check = await newSchema.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      user = new newSchema(data);
      await user.save();
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port=${port}`);
});

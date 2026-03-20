const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------ MongoDB Connection ------------------ */

mongoose
  .connect(
    "mongodb+srv://klencyantony_db_user:Klency12345@cluster0.mr3muxz.mongodb.net/civicchain?appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ------------------ Schema ------------------ */

const issueSchema = new mongoose.Schema({
  id: String,
  category: String,
  title: String,
  location: String,
  reporter: String,
  date: String,
  status: {
    type: String,
    default: "Open",
  },
  fund: {
    type: Number,
    default: 0,
  },
  txHash: String,
});

const Issue = mongoose.model("Issue", issueSchema);

/* ------------------ Routes ------------------ */

/* GET all issues */
app.get("/issues", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/issues", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.json(newIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.put("/issues/:id", async (req, res) => {
  try {
    const { status, fund } = req.body;

    const updatedIssue = await Issue.findOneAndUpdate(
      { id: req.params.id },
      { status, fund },
      { new: true }
    );

    res.json(updatedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000 🚀");
});
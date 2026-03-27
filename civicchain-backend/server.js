const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
/* ==================== USER SCHEMA ==================== */
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

/* ------------------ Schema ------------------ */
const IssueSchema = new mongoose.Schema({
  id: String,
  category: String,
  title: String,
  location: String,
  status: String,
  fund: Number,
  date: String,
  reporter: String,
  txHash: String,
  createdBy: String,
  votes: { type: Number, default: 0 },
  upvotedBy: { type: [String], default: [] }
});

const Issue = mongoose.model("Issue", IssueSchema);
/* ==================== BLOCKCHAIN LOG SCHEMA ==================== */
const BlockchainLogSchema = new mongoose.Schema({
  action: String,
  issueId: String,
  timestamp: { type: Date, default: Date.now },
  txHash: String
});

const BlockchainLog = mongoose.model("BlockchainLog", BlockchainLogSchema);

/* ==================== HELPER FUNCTION ==================== */
function generateTxHash() {
  return "0x" + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
}

/* ------------------ Routes ------------------ */

// GET all issues
app.get("/issues", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new issue
app.post("/issues", async (req, res) => {
  try {
    const txHash = generateTxHash();
    const newIssue = new Issue({
      ...req.body,
      txHash
    });
    await newIssue.save();

    // Log to blockchain
    await BlockchainLog.create({
      action: "ISSUE_CREATED",
      issueId: req.body.id,
      txHash
    });

    res.json(newIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE issue (Admin only)
app.put("/issues/:id", async (req, res) => {
  try {
    const { status, fund, role } = req.body;

    // Check if admin
    if (role !== "admin") {
      return res.status(403).json({ error: "Only admins can update issues" });
    }

    const updatedIssue = await Issue.findOneAndUpdate(
      { id: req.params.id },
      { status, fund },
      { new: true }
    );

    // Log to blockchain
    const txHash = generateTxHash();
    await BlockchainLog.create({
      action: "ISSUE_UPDATED",
      issueId: req.params.id,
      txHash
    });

    res.json(updatedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPVOTE issue
app.post("/issues/:id/upvote", async (req, res) => {
  try {
    const { userEmail } = req.body;
    
    const issue = await Issue.findOne({ id: req.params.id });
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    // Check if already upvoted
    if (issue.upvotedBy.includes(userEmail)) {
      return res.status(400).json({ error: "Already upvoted" });
    }

    // Add upvote
    issue.upvotedBy.push(userEmail);
    issue.votes += 1;
    await issue.save();

    // Log to blockchain
    const txHash = generateTxHash();
    await BlockchainLog.create({
      action: "ISSUE_UPVOTED",
      issueId: req.params.id,
      txHash
    });

    res.json(issue);
  } catch (err) {
    res.status(500).json(err);
  }
});
// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ username, email, password, role: "user" });
    await newUser.save();

    res.json({
      email: newUser.email,
      role: newUser.role
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// CREATE ADMIN (Temporary - Remove after first use)
app.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const adminUser = new User({
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin"
    });
    await adminUser.save();

    res.json({ message: "Admin created", email: "admin@gmail.com" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DATABASE STATUS
app.get("/db-status", async (req, res) => {
  try {
    const issueCount = await Issue.countDocuments();
    const userCount = await User.countDocuments();
    const logCount = await BlockchainLog.countDocuments();

    res.json({
      status: "✅ MongoDB Connected",
      database: "civicchain",
      issues: issueCount,
      users: userCount,
      blockchainLogs: logCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET DATABASE (Dangerous - Use with caution)
app.post("/reset-db", async (req, res) => {
  try {
    // Optional: Add password protection
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer reset-secret-key") {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Issue.deleteMany({});
    await BlockchainLog.deleteMany({});

    res.json({ message: "Database cleared (issues & logs). Users preserved." });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ------------------ MongoDB Connection ------------------ */

mongoose
  .connect("mongodb+srv://klencyantony_db_user:Klency12345@cluster0.mr3muxz.mongodb.net/civicchain?retryWrites=true&w=majority")
  .then(async () => {
    console.log("MongoDB Connected ✅");

    // Auto-create admin user on startup
    try {
      const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
      if (!existingAdmin) {
        const adminUser = new User({
          username: "admin",
          email: "admin@gmail.com",
          password: "admin123",
          role: "admin"
        });
        await adminUser.save();
        console.log("⚡ Admin account created automatically");
        console.log("📧 Email: admin@gmail.com");
        console.log("🔐 Password: admin123");
      } else {
        console.log("✅ Admin account already exists");
      }
    } catch (err) {
      console.error("Error creating admin:", err);
    }

    // Seed sample issues on startup if database is empty
    try {
      const issueCount = await Issue.countDocuments();
      if (issueCount === 0) {
        console.log("📝 Seeding sample issues...");
        const sampleIssues = [
          {
            id: "CIV-1024",
            title: "Deep pothole on Anna Salai causing vehicle damage",
            category: "Pothole",
            location: "Anna Salai, Zone 1 – T. Nagar",
            status: "In Progress",
            date: new Date().toLocaleDateString("en-IN"),
            fund: 120000,
            reporter: "Citizen",
            createdBy: "user@gmail.com",
            votes: 12,
            upvotedBy: ["admin@gmail.com"],
            txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          },
          {
            id: "CIV-1023",
            title: "Overflowing garbage bins near T. Nagar bus stand",
            category: "Garbage",
            location: "T. Nagar Market, Zone 2",
            status: "Open",
            date: new Date().toLocaleDateString("en-IN"),
            fund: 48000,
            reporter: "Citizen",
            createdBy: "citizen1@gmail.com",
            votes: 8,
            upvotedBy: [],
            txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          },
          {
            id: "CIV-1022",
            title: "Street lights non-functional — 6 units out",
            category: "Streetlight",
            location: "Adyar Signal, Zone 3",
            status: "Resolved",
            date: new Date().toLocaleDateString("en-IN"),
            fund: 90000,
            reporter: "Citizen",
            createdBy: "citizen2@gmail.com",
            votes: 5,
            upvotedBy: [],
            txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          },
          {
            id: "CIV-1021",
            title: "Water main burst flooding Mylapore street",
            category: "Water Issue",
            location: "Mylapore, Zone 4",
            status: "In Progress",
            date: new Date().toLocaleDateString("en-IN"),
            fund: 280000,
            reporter: "Citizen",
            createdBy: "citizen3@gmail.com",
            votes: 15,
            upvotedBy: [],
            txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          },
          {
            id: "CIV-1020",
            title: "Road cave-in near Velachery MRTS station",
            category: "Pothole",
            location: "Velachery, Zone 5",
            status: "Resolved",
            date: new Date().toLocaleDateString("en-IN"),
            fund: 380000,
            reporter: "Citizen",
            createdBy: "citizen4@gmail.com",
            votes: 20,
            upvotedBy: [],
            txHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
          }
        ];

        await Issue.insertMany(sampleIssues);
        console.log("✅ Sample issues seeded successfully");
      } else {
        console.log(`✅ Database has ${issueCount} issues`);
      }
    } catch (err) {
      console.error("Error seeding issues:", err);
    }

    app.listen(5000, () => {
      console.log("Backend running on http://localhost:5000 🚀");
    });
  })
  .catch((err) => console.error("MongoDB Error:", err));
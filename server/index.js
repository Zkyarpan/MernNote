require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 5700;

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// GET ALL NOTES
app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An error occurred while fetching notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching notes" });
  }
});

// GET NOTES BY ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);

    if (!data) {
      throw new Error("An error occurred while fetching notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching notes" });
  }
});

// CREATE A NOTE
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });

    if (!data) {
      throw new Error("An error occurred while creating notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating notes" });
  }
});

// UPDATE A NOTE
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteID, { title, description });

    if (!data) {
      throw new Error("An error occurred while updating notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating notes" });
  }
});

// DELETE A NOTE
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteID = req.params.id;
    const data = await Notes.findByIdAndDelete(noteID);

    if (!data) {
      throw new Error("An error occurred while updating notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating notes" });
  }
});

app.get("*", (req, res) => {
  res.send("404 NOT FOUND");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

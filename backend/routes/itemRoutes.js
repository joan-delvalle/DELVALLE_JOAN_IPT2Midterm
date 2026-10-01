const express = require("express");
const mongoose = require("mongoose");
const LostFoundItem = require("../models/LostFoundItem");

const router = express.Router();

// GET all found items
router.get("/", async (req, res) => {
  try {
    const items = await LostFoundItem.find().sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get found items."
    });
  }
});

// GET one found item
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item ID."
      });
    }

    const item = await LostFoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get the item."
    });
  }
});

// POST a new found item
router.post("/", async (req, res) => {
  try {
    const {
      description,
      placeFound,
      dateFound,
      claimedStatus,
      finder
    } = req.body;

    if (!description || !placeFound || !dateFound || !finder) {
      return res.status(400).json({
        message: "Please complete all required fields."
      });
    }

    const item = await LostFoundItem.create({
      description,
      placeFound,
      dateFound,
      claimedStatus: claimedStatus || "Unclaimed",
      finder
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create the item."
    });
  }
});

// PUT update
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item ID."
      });
    }

    const {
      description,
      placeFound,
      dateFound,
      claimedStatus,
      finder
    } = req.body;

    if (!description || !placeFound || !dateFound || !finder) {
      return res.status(400).json({
        message: "Please complete all required fields."
      });
    }

    const item = await LostFoundItem.findByIdAndUpdate(
      req.params.id,
      {
        description,
        placeFound,
        dateFound,
        claimedStatus,
        finder
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update the item."
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item ID."
      });
    }

    const item = await LostFoundItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Item not found."
      });
    }

    res.status(200).json({
      message: "Item deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the item."
    });
  }
});

module.exports = router;
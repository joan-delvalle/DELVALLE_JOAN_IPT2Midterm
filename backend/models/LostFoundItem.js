const mongoose = require("mongoose");

// This model defines the fields stored for every found item.
const lostFoundItemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    placeFound: {
      type: String,
      required: true,
      trim: true
    },
    dateFound: {
      type: Date,
      required: true
    },
    claimedStatus: {
      type: String,
      enum: ["Unclaimed", "Claimed"],
      default: "Unclaimed"
    },
    finder: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("LostFoundItem", lostFoundItemSchema);
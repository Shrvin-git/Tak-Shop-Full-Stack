const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },

    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      default: "open",
    },

    priority: { type: Number, enum: [1, 2, 3], default: 1 },

    department: { type: mongoose.Types.ObjectId, ref: "Department" },

    lastMessageAt: { type: Date, default: Date.now },
    lastMessageBy: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default model;

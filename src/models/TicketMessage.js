const mongoose = require("mongoose");

const TicketMessageSchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
      required: true,
      index: true,
    },

    senderType: { type: String, enum: ["user", "admin"], required: true },
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    lastMessageSender: { type: mongoose.Types.ObjectId, ref: "User" },

    body: { type: String, required: true },
  },
  { timestamps: true },
);

const model =
  mongoose.models.TicketMessage ||
  mongoose.model("TicketMessage", TicketMessageSchema);
export default model;

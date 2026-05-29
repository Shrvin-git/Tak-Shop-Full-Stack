const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    // pattern: /email/g,
  },
  email: {
    type: String,
    required: true,
    // pattern: /email/g,
  },
  phone: {
    type: String,
    required: true,
  },
  orderCode: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
});

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;

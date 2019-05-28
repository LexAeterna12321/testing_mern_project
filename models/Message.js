const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: { type: String, required: true },
  msg: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;

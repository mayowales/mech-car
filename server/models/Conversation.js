const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    participants: [String],
    messages: [{
      type: Schema.Types.Mixed,
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Conversation", conversationSchema);

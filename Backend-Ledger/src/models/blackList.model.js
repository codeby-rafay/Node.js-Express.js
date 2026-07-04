const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required to blacklist"],
      unique: [true, "Token already blacklisted"],
    },
  },
  { timestamps: true },
);

// creates a TTL index on the createdAt field, which will automatically remove documents after 3 days from MongoDB.
tokenBlacklistSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 3 },
); // 3 days

const tokenBlacklistModel = mongoose.model(
  "tokenBlacklist",
  tokenBlacklistSchema,
);

module.exports = tokenBlacklistModel;

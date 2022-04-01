const { Schema, model } = require("mongoose");

const allowedUsers = new Schema({
    guild: { type: String, required: true },
    users: { type: Array, default: [] }
});

const Rating = new Schema({
    guild: { type: String, required: true },
    user: { type: String },
    rating: { type: Number },
    questions: { type: Array },
    responses: { type: Array }
})

module.exports = {
    AllowedUsers: model("allowedusers", allowedUsers, "allowedusers"),
    Rating: model("ratings", Rating, "ratings")
}
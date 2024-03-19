const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            maxLength: 100,
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            reqiured: true,
        },
    },
    { timestamps: true }
);

commentSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString();

        delete returnedObj._id;
        delete returnedObj.__v;
    },
});

module.exports = mongoose.model("Comment", commentSchema);

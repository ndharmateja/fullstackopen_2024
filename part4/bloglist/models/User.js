const mongoose = require("mongoose");
require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
    name: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    // blogs: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Blog",
    //     },
    // ],
});

userSchema.set("toJSON", {
    transform: (_doc, returnedObj) => {
        returnedObj.id = returnedObj._id;

        // delete fields _id, __v, passwordHash
        delete returnedObj._id;
        delete returnedObj.__v;
        delete returnedObj.passwordHash;

        return returnedObj;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

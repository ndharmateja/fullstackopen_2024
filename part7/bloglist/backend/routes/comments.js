const express = require("express");

const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.route("/").post((req, res) => {
    console.log("comments post");
});

module.exports = commentsRouter;

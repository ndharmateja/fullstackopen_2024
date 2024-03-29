import express from "express";
import { getBmi } from "./controller";
import { errorHandler } from "./middleware";

const app = express();

app.get("/hello", (_req, res) => res.send("Hello Full Stack!"));
app.get("/bmi", getBmi);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => console.log(`server started. listening on ${PORT}.`));

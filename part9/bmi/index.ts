import express from "express";
import { getBmi, postExercises } from "./controller";
import { errorHandler } from "./middleware";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => res.send("Hello Full Stack!"));
app.get("/bmi", getBmi);
app.post("/exercises", postExercises);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => console.log(`server started. listening on ${PORT}.`));

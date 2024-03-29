import express from "express";
import { BmiInput, calculateBmi } from "./bmiCalculator";
import { validateNumber } from "./utils";
import { calculateExercises, ExerciseInput } from "./exerciseCalculator";

const parseBmiInput = (req: express.Request): BmiInput => {
    const { height: heightStr, weight: weightStr } = req.query;

    try {
        const height = validateNumber(heightStr);
        const weight = validateNumber(weightStr);

        return { height, weight };
    } catch (error) {
        throw new Error("malformed parameters");
    }
};

export const getBmi = (req: express.Request, res: express.Response) => {
    const { height, weight } = parseBmiInput(req);
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
};

const parseExercisesInput = (req: express.Request): ExerciseInput => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises: hours, target } = req.body;

    if (!hours || !target) throw new Error("parameters missing");
    if (!Array.isArray(hours)) throw new Error("malformatted parameters");

    try {
        validateNumber(target);
        hours.forEach(validateNumber);
    } catch (error) {
        throw new Error("malformatted parameters");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { hours, target };
};

export const postExercises = (req: express.Request, res: express.Response) => {
    const { hours, target } = parseExercisesInput(req);
    const computedData = calculateExercises(hours, target);
    return res.json(computedData);
};

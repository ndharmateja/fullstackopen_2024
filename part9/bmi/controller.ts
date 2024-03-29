import express from "express";
import { BmiInput, calculateBmi } from "./bmiCalculator";
import { validateNumber } from "./utils";

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

import { printError, validateNumber } from "./utils";

export interface BmiInput {
    height: number;
    weight: number;
}

const parseArgs = (args: string[]): BmiInput => {
    if (args.length < 4) throw new Error("not enough args");
    if (args.length > 4) throw new Error("too many args");

    const height = validateNumber(args[2]);
    const weight = validateNumber(args[3]);

    return { height, weight };
};

export const calculateBmi = (input: BmiInput): string => {
    const { height, weight } = input;
    const bmi = weight / ((height / 100) ^ 2);

    if (bmi < 16) return "Underweight (Severe thinness)";
    if (bmi < 17) return "Underweight (Moderate thinness)";
    if (bmi < 18.5) return "Underweight (Mild thinness)";
    if (bmi < 25) return "Normal (healthy weight)";
    if (bmi < 30) return "Overweight (Pre-obese)";
    if (bmi < 35) return "Obese (Class I)";
    if (bmi < 40) return "Obese (Class II)";
    return "Obese (Class III)";
};

try {
    const input = parseArgs(process.argv);
    console.log(calculateBmi(input));
} catch (error) {
    printError(error);
}

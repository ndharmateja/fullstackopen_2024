import { printError, validateNumber } from "./utils";

interface Rating {
    rating: number;
    ratingDescription: string;
}

const getRating = (average: number, target: number): Rating => {
    let rating;
    let ratingDescription;
    if (average < target / 2) {
        rating = 1;
        ratingDescription = "not great.";
    } else if (average < target) {
        rating = 2;
        ratingDescription = "not too bad but could be better.";
    } else {
        rating = 3;
        ratingDescription = "amazing performance. you exceeded your target.";
    }
    return { rating, ratingDescription };
};

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (input: ExerciseInput): ExerciseResult => {
    const { hours, target } = input;

    const hoursSum = hours.reduce((a, b) => a + b);
    const periodLength = hours.length;
    const trainingDays = hours.filter((h) => h > 0).length;
    const average = hoursSum / periodLength;
    const success = average >= target;
    const { rating, ratingDescription } = getRating(average, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

interface ExerciseInput {
    hours: number[];
    target: number;
}

const parseArgs = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error("not enough args");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, __, targetString, ...hourStrings] = args;
    const target = validateNumber(targetString);
    const hours = hourStrings.map(validateNumber);

    return { target, hours };
};

try {
    const input = parseArgs(process.argv);
    console.log(calculateExercises(input));
} catch (error) {
    printError(error);
}

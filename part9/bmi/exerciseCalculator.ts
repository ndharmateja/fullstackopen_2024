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

const calculateExercises = (
    hours: number[],
    target: number
): ExerciseResult => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
export const validateNumber = (numString: any): number => {
    const val = Number(numString);
    if (isNaN(val)) throw new Error(`${numString} not a number`);
    return val;
};

export const printError = (error: unknown) => {
    let errorMessage = "Error";
    if (error instanceof Error) errorMessage += `: ${error.message}`;
    console.log(errorMessage);
};

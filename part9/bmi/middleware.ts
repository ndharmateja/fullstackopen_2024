import express from "express";

export const errorHandler = (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (err instanceof Error) res.status(403).json({ error: err.message });
    next(err);
};

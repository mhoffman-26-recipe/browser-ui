import {NextFunction, Request, Response} from "express";
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

export const health = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK)
        res.json({status: getReasonPhrase(StatusCodes.OK)})
    } catch (error) {
        next(error)
    }
};
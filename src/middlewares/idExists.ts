import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { Developer, DeveloperResult } from "../interfaces";
import { AppError } from "../errors";
import { client } from "../database";

export const idExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {developerId} = req.body;
    if (developerId) {
        const queryString: string =
            `
            SELECT * FROM "developers" WHERE ID = $1;
            `;
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [developerId],
        };
            const queryResult: DeveloperResult = await client.query(queryConfig);
            const validDeveloperId: Developer = queryResult.rows[0];
            if (!validDeveloperId) {
                throw new AppError("Developer not found", 404);
            }
            return next();
    } else {
        return next();
    };
};

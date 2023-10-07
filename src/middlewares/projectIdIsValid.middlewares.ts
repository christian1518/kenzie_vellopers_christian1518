import { NextFunction, Request, Response } from "express";
import { Projects, ProjectsResult } from "../interfaces"; //O DeveloperInfosResult foi removido dessa importação
import { client } from "../database";
import { AppError } from "../errors";
import { QueryConfig } from "pg";

export const projectDeveloperIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const query: string = 'SELECT * FROM "projects" WHERE "id" = $1;';
    const queryConfig: QueryConfig = {text:query, values:[id], };
    const queryResult: ProjectsResult = await client.query(queryConfig)
    
    const validId: Projects = queryResult.rows[0]

    if(!validId) {
        throw new AppError("Project not found.", 404)
    }
    
    return next()
}
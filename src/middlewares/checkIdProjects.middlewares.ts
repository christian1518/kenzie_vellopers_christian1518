import { NextFunction, Request, Response } from "express";
import { Projects, ProjectsResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const checkIdProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { projectId } = req.params

    const queryResult: ProjectsResult = await client.query('SELECT * FROM "projects" WHERE "id" = $1;', [projectId])

    if(!queryResult.rowCount) {
        throw new AppError("Project not found.", 404)
    }


    const foundProjects: Projects = queryResult.rows[0]
    res.locals = { ...res.locals, foundProjects }

    return next()
}
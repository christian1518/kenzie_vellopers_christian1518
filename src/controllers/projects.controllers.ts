import { Request, Response } from "express";
import { projectsServices } from "../services";
import { Projects } from "../interfaces";
import { upProjectById } from "../services/projects.services";

const registerNewProjects = async (req: Request, res: Response): Promise<Response> => {
    const project: Projects = await projectsServices.registerNewProjects(req.body)

    return res.status(201).json(project)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
    const project: Projects = await projectsServices.retrive(req.params.projectId)

    return res.status(200).json(project)
}

const partialUpdate = async (req: Request, res: Response): Promise<Response> => {
   
   const { id } = req.params
   
    const project: Projects = await projectsServices.partialUpdate({ id:Number(id) }, req.body)

    return res.status(200).json(project)
};

const updateProject = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const upProject = await upProjectById(req.body, {id:Number(id)});
    console.log(req.body)
    return res.status(200).json(upProject)
}

export default {registerNewProjects, retrive, partialUpdate, updateProject }
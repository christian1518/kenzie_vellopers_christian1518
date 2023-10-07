import { Request, Response } from "express";
import { developerServices } from "../services";
import { Developer } from "../interfaces";

const registerNewDeveloper = async (req: Request, res: Response): Promise<Response> => {
    const developer: Developer = await developerServices.registerNewDeveloper(req.body)

    return res.status(201).json(developer)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const developers: Array<Developer> = await developerServices.read()

    return res.status(200).json(developers)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
    const developer: Developer = await developerServices.retrive(req.params.developerId)

    return res.status(200).json(developer)
}

const partialUpdate = async (req: Request, res: Response): Promise<Response> => {
   const { body } = req
   const {developerId} = req.params
   
    const developer: Developer = await developerServices.partialUpdate(developerId, body)

    return res.status(200).json(developer)
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    await developerServices.destroy(req.params.developerId)

    return res.status(204).json()
}

export default {registerNewDeveloper, read, retrive, partialUpdate, destroy}
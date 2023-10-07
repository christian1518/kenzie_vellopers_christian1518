import { Request, Response } from "express";
import { developerInfosServices } from "../services";
import { DeveloperInfos, DeveloperInfosCreate } from "../interfaces";

const registerAdditionalInformation = async (req: Request, res: Response): Promise<Response> => {
    const payload: DeveloperInfosCreate = {
        ...req.body,
        developerId: req.params.developerId
    }
    const developerInfos: DeveloperInfos = await developerInfosServices.registerAdditionalInformation(payload)

    return res.status(201).json(developerInfos)
}

export default { registerAdditionalInformation }
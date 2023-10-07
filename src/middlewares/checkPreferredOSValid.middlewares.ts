import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { OS } from "../interfaces";

export const checkPreferredOSValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const { preferredOS } = req.body;
   const additionalInformationIsVailid: OS[] = ["Windows", "Linux", "MacOS"];

   if(!additionalInformationIsVailid.includes(preferredOS)) {
    throw new AppError("Invalid OS optional.", 400)
   }
   
    return next()
}
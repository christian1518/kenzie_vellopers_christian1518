import { Router } from "express";
import { developerControllers, developerInfosControllers } from "../controllers";
import { uniqueEmail } from "../middlewares";
import { checkIdDeveloperExists } from "../middlewares/checkIdDeveloper.middlewares";
import { checkPreferredOSValid } from "../middlewares/checkPreferredOSValid.middlewares";
import { checkInfoExists } from "../middlewares/checkInfoExists.middlewares";

const developerRouter: Router = Router()

developerRouter.post("", uniqueEmail, developerControllers.registerNewDeveloper);
developerRouter.post("/:developerId/infos", checkIdDeveloperExists, checkPreferredOSValid, checkInfoExists, developerInfosControllers.registerAdditionalInformation)
developerRouter.get("", developerControllers.read)

developerRouter.get("/:developerId", checkIdDeveloperExists, developerControllers.retrive)
developerRouter.patch("/:developerId", checkIdDeveloperExists, uniqueEmail, developerControllers.partialUpdate)

developerRouter.delete("/:developerId", checkIdDeveloperExists, developerControllers.destroy)

export default developerRouter
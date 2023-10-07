import { Router } from "express";
import { projectsControllers } from "../controllers";
import { idExists } from "../middlewares/idExists";
import { checkIdProjects } from "../middlewares/checkIdProjects.middlewares";

const projectsRouter: Router = Router()

projectsRouter.post("/", idExists, projectsControllers.registerNewProjects)

projectsRouter.get("/:projectId", checkIdProjects, projectsControllers.retrive)

projectsRouter.patch("/:projectId",checkIdProjects, idExists, projectsControllers.updateProject)

export default projectsRouter
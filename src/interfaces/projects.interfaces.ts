import { QueryResult } from "pg";
import { Developer } from "./developer.interfaces";

type Projects = {
    id: number;
    name: string;
    description: Text;
    repository: string;
    startDate: Date;
    endDate?: Date;
    developerId: number;
};

type ProjectInfo = {
    developer: Developer;
    projects: Projects;
};

type ProjectInfoResult = QueryResult<ProjectInfo>

type ProjectsResult = QueryResult<Projects>
type ProjectsCreate = Omit<Projects, "id">
type ProjectsUpdate = Partial<ProjectsCreate>

export { Projects, ProjectsResult, ProjectsCreate, ProjectsUpdate, ProjectInfo, ProjectInfoResult }
import { QueryResult } from "pg"

type Developer = {
    id: number
    name: string
    email: string
}

type DeveloperResult = QueryResult<Developer>
type DeveloperCreate = Omit<Developer, "id">
type DeveloperRead = Array<Developer>
type DeveloperUpdate = Partial<DeveloperCreate>

export { Developer, DeveloperResult, DeveloperCreate, DeveloperRead, DeveloperUpdate }
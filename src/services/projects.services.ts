import format from "pg-format";
import { ProjectInfo, ProjectInfoResult, Projects, ProjectsCreate, ProjectsResult, ProjectsUpdate } from "../interfaces";
import { client } from "../database";
import { QueryConfig, QueryResult } from 'pg';

const registerNewProjects = async (payload: ProjectsCreate): Promise<Projects> => {
    const queryFormat: string = format(
        'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResult: ProjectsResult = await client.query(queryFormat)

    return queryResult.rows[0]
}

const retrive = async (projectId: string): Promise<Projects> => {
    const query: string = `
        SELECT
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."id" AS "developerId",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS "p"
        LEFT JOIN "developers" AS "d"
            ON "p"."developerId" = "d"."id"
        WHERE "p"."id" = $1;
        `

    const queryResult: ProjectsResult = await client.query(query, [projectId])

    return queryResult.rows[0]
}

const partialUpdate = async (params: {id:number}, payload: ProjectsUpdate): Promise<Projects> => {
    const updateColumn: string[] = Object.keys(payload);
    const updateValues: (string | number | Text | Date)[] = Object.values(payload);
    const queryFomart: string = format(
      `
            UPDATE "projects"
            SET (%I) = ROW (%L)
            WHERE id = $1
            RETURNING *;
          `,
      updateColumn,
      updateValues
    );
    const queryConfig: QueryConfig = {
      text: queryFomart,
      values: [params.id],
    };

    const queryResult: ProjectsResult = await client.query(queryConfig)

    return queryResult.rows[0]
};

export const upProjectById = async (
  projectBody: Projects,
  params: { id: number }
): Promise<ProjectInfo> => {
  const updateColumn: string[] = Object.keys(projectBody);
  const updateValues: (string | number | Text | Date)[] =
    Object.values(projectBody);
  const setClause = updateColumn
    .map((col, index) => `"${col}" = $${index + 1}`)
    .join(", ");
  const queryString: string = `
        UPDATE "projects" SET ${setClause} WHERE "id" = $${
    updateColumn.length + 1
  } RETURNING *;
    `;
  const queryValues = [...updateValues, params.id];
  const queryConfig: QueryConfig = {
    text: queryString,
    values: queryValues,
  };
  const queryResult: QueryResult = await client.query(queryConfig);
  const upProject: ProjectInfo = queryResult.rows[0];
  return upProject;
};

export default { registerNewProjects, retrive, partialUpdate }
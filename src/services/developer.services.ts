import format from "pg-format";
import { Developer, DeveloperCreate, DeveloperRead, DeveloperResult, DeveloperUpdate } from "../interfaces";
import { client } from "../database";

const registerNewDeveloper = async (payload: DeveloperCreate): Promise<Developer> => {
    const queryFormat: string = format(
        'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResult: DeveloperResult = await client.query(queryFormat)

    return queryResult.rows[0]
}

const read = async (): Promise<DeveloperRead> => {
    const query: string = 'SELECT * FROM "developers";'
    const queryResult: DeveloperResult = await client.query(query)

    return queryResult.rows
}

const retrive = async (developerId: string): Promise<Developer> => {
    const query: string = `
        SELECT 
            "d"."id" AS "developerId",
            "d"."name" AS "developerName",
            "d"."email" AS "developerEmail",
            "di"."developerSince" AS "developerInfoDeveloperSince",
            "di"."preferredOS" AS "developerInfoPreferredOS"
        FROM "developers" AS "d"
        LEFT JOIN "developerInfos" AS "di" 
            ON "di"."developerId" = "d"."id" 
        WHERE "d"."id" = $1;
        `

    const queryResult: DeveloperResult = await client.query(query, [developerId])

    return queryResult.rows[0]
}

const partialUpdate = async (developerId: string, payload: DeveloperUpdate): Promise<Developer> => {
    const queryFormat: string = format(
        'UPDATE "developers" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const queryResult: DeveloperResult = await client.query(queryFormat, [developerId])

    return queryResult.rows[0]
}


const destroy = async (developerId: string): Promise<void> => {
    await client.query('DELETE FROM "developers" WHERE "id" = $1;', [developerId])
}

export default { registerNewDeveloper, read, retrive, partialUpdate, destroy }
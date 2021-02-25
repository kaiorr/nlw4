import { Connection, createConnection, getConnectionOptions } from 'typeorm'

const connectionTest = {
  type: "postgres",
  host: "localhost",
  port: "5533",
  username: "postgres",
  password: "1234",
  database: "postgres"
}

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV  === 'test'
      ? connectionTest
      : defaultOptions.database
    })
  )
}

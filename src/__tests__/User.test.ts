import request from 'supertest'
import { app } from '../app'

describe("Users", () => {
  beforeAll(async () => {
  })
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "User Example"
    })

    expect(response.status).toBe(201)
  })
})

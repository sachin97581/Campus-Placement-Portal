const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("Auth API Tests", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a user and send OTP", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser123@gmail.com",
        password: "Test@123",
        role: "STUDENT"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("OTP sent to email. Please verify.");
  });
});

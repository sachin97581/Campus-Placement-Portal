const request = require("supertest");
const app = require("../app");

describe("Admin Job API", () => {
  it("should block request without token", async () => {
    const res = await request(app)
      .post("/api/admin/job")
      .send({ title: "Test Job" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("No token");
  });
});


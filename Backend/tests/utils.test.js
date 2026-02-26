const generateToken = require("../utils/generateToken");

describe("Token Utility Test", () => {
  it("should generate a JWT token", () => {
    const user = {
      _id: "123456",
      role: "ADMIN"
    };

    const token = generateToken(user);
    expect(token).toBeDefined();
  });
});

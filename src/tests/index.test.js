const { PORT, mongoUri } = require("../config/config.js");

const request = require("supertest");
const ExpressServer = require("../express-server");

beforeAll(async () => {
  server = new ExpressServer(mongoUri, PORT);
  app = server.app;
});

describe("POST /user/login", () => {
  describe("Given a PIN", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/user/login").send({
        PIN: "1234",
      });

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
      expect(response.body).toEqual(
        expect.objectContaining({
          message: "Successfully logged in.",
          data: {
            token: expect.any(String),
          },
        })
      );
      expect(response.statusCode).toBe(200);
    });
  });
});

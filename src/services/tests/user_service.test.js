const { UserService } = require("../UserService");
const mockingoose = require("mockingoose");
const User = require("../../models/User");

beforeAll(() => {
  jest
    .spyOn(UserService.prototype, "checkACollectionExist")
    .mockImplementation(() => true);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("UserService test", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
  });
  describe("checkAUserExist", () => {
    it("A user exists", async () => {
      const _doc = [
        {
          _id: { $oid: "619db0bf4b50b6136ab2b770" },
          hashed_PIN:
            "$2b$10$IrIK300GhpQe2Iajc3rsvesbwC2AkTVT4qHOiHEXR/In30MEba9Ri",
          loginAttempts: 0,
          createdAt: { $date: "2021-11-24T03:25:51.863Z" },
          updatedAt: { $date: "2021-11-24T03:25:51.863Z" },
          __v: 0,
        },
      ];
      mockingoose(User).toReturn(_doc);
      const userService = new UserService(undefined, undefined, undefined);
      const actual = await userService.checkAUserExist();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it("A user does not exist", async () => {
      const _doc = {};
      mockingoose(User).toReturn(_doc);
      const userService = new UserService(undefined, undefined, undefined);
      const actual = await userService.checkAUserExist();
      const expected = false;
      expect(actual).toBe(expected);
    });
  });

  describe("createUser", () => {
    it("Create User with Valid PIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
      const userService = new UserService(undefined, "1234", "1234");
      const actual = await userService.createUser();
      expect(actual).toMatchObject({
        message: "User successfully created",
        success: true,
      });
    });
    it("Create User when another User exists", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
      const userService = new UserService(undefined, "1234", "1234");
      const actual = await userService.createUser();
      expect(actual).toMatchObject({
        message: "A user already exists",
        success: false,
      });
    });
    it("Create User with Invalid PIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
      let actual;
      const wrongPINS = [
        { PIN: 1234 },
        { PIN: "Haha" },
        { PIN: "ShouldNotPass" },
      ];
      let error = null;
      for (const PIN of wrongPINS) {
        try {
          const userService = new UserService(undefined, PIN, PIN);
          actual = await userService.createUser();
        } catch (e) {
          error = e;
        }
        expect(actual).toMatchObject({
          message: "An error occurred",
          success: false,
        });
      }
    });
  });
});

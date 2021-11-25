const { UserService } = require("../UserService");
const mockingoose = require("mockingoose");
const User = require("../../models/User");

beforeAll(() => {});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("UserService test", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
  });
  describe("checkAUserExist", () => {
    it("A user exist", async () => {
      const count = 1;
      mockingoose(User).toReturn(count, "estimatedDocumentCount");
      const userService = new UserService(undefined, undefined, undefined);
      const actual = await userService.checkAUserExist();
      await User.estimatedDocumentCount().then((docCount) => {
        let expected = false;
        if (docCount > 0) {
          expected = true;
        }
        expect(actual).toBe(expected);
      });
    });
    it("A user does not exist", async () => {
      const count = 0;
      mockingoose(User).toReturn(count, "estimatedDocumentCount");
      const userService = new UserService(undefined, undefined, undefined);
      const actual = await userService.checkAUserExist();
      await User.estimatedDocumentCount().then((docCount) => {
        let expected = false;
        if (docCount > 0) {
          expected = true;
        }
        expect(actual).toBe(expected);
      });
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
        { choosePIN: 1234, confirmPIN: 1234 },
        { choosePIN: "HAHA", confirmPIN: "HAHA" },
        { choosePIN: "ShouldNotPass", confirmPIN: "ShouldNotPass" },
      ];
      let error = null;
      for (const wrong of wrongPINS) {
        try {
          const userService = new UserService(
            undefined,
            wrong.choosePIN,
            wrong.confirmPIN
          );
          actual = await userService.createUser();
        } catch (e) {
          error = e;
        }
        expect(actual).toMatchObject({
          message: "ValidationError: PIN: PIN must be 4 integers",
          success: false,
        });
      }
    });

    it("Create User with non-matching PIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
      const userService = new UserService(undefined, "1234", "4321");
      const actual = await userService.createUser();

      expect(actual).toMatchObject({
        message: "PINs do not match. Please try again",
        success: false,
      });
    });
  });

  describe("login", () => {
    it("No user exist", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
      const _doc = [{}];
      mockingoose(User).toReturn(_doc);
      const userService = new UserService("1234");
      const actual = await userService.login();
      expect(actual).toMatchObject({
        message: "A user does not exist.",
        success: false,
      });
    });
    it("Successful login", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
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
      const userService = new UserService("1234");
      const actual = await userService.login();
      expect(actual).toMatchObject({
        message: "Successfully logged in.",
        success: true,
        token: expect.any(String),
      });
    });
    it("Wrong PIN ", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
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
      const userService = new UserService("9876");
      const actual = await userService.login();
      expect(actual).toMatchObject({
        message: "User does not exist or PIN is incorrect",
        success: false,
      });
    });

    it("Exceed login attempt ", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
      const _doc = [
        {
          _id: { $oid: "619db0bf4b50b6136ab2b770" },
          hashed_PIN:
            "$2b$10$IrIK300GhpQe2Iajc3rsvesbwC2AkTVT4qHOiHEXR/In30MEba9Ri",
          loginAttempts: 5,
          createdAt: { $date: "2021-11-24T03:25:51.863Z" },
          updatedAt: { $date: "2021-11-24T03:25:51.863Z" },
          lockUntil: Date.parse(new Date(new Date().getTime() + 5 * 60000)),
          __v: 0,
        },
      ];
      mockingoose(User).toReturn(_doc);
      const userService = new UserService("9876");
      const actual = await userService.login();
      expect(actual).toMatchObject({
        message:
          "You have exceed the max login attempts(5). Barred from logging in for the next 5 minutes.",
        success: false,
      });
    });
  });

  describe("resetPIN", () => {
    it("No user exist", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
      const _doc = [{}];
      mockingoose(User).toReturn(_doc);
      const userService = new UserService("1234", "2345", "2345");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "A user does not exist.",
        success: false,
      });
    });

    it("Succesfully Reset", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
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
      const userService = new UserService("1234", "2345", "2345");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "PIN successfully reset",
        success: true,
      });
    });

    it("One of the PINs is missing", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
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
      const userService = new UserService("1234", "2345");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "A required parameter is missing. Please try again",
        success: false,
      });
    });

    it("confirmPIN do not match choosePIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
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
      const userService = new UserService("1234", "2345", "5678");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "PINs do not match. Please try again",
        success: false,
      });
    });

    it("should return New PIN must have 4 integers", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
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
      const userService = new UserService("1234", "56", "56");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "PIN must be 4 integers",
        success: false,
      });
    });

    it("ConfirmPIN same as old PIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => false);
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
      const userService = new UserService("1234", "1234", "1234");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message:
          "New PIN is the same as the old PIN. Please choose a different PIN",
        success: false,
      });
    });

    it("Incorrect PIN", async () => {
      jest
        .spyOn(UserService.prototype, "checkAUserExist")
        .mockImplementation(() => true);
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
      const userService = new UserService("2345", "5678", "5678");
      const actual = await userService.resetPIN();
      expect(actual).toMatchObject({
        message: "User does not exist or incorrect PIN",
        success: false,
      });
    });
  });
});

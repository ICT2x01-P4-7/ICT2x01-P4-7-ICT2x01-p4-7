const mongoose = require("mongoose");
const mongoUri = "mongodb://localhost:27017/test_database";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));
const User = require("../index");

describe("User model test", () => {
  beforeAll(async () => {
    await User.remove({});
  });
  afterEach(async () => {
    await User.remove({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  it("has a module", () => {
    expect(User).toBeDefined();
  });
  describe("Create user", () => {
    it("Valid PIN", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const foundUser = await User.find({}).exec();
      const actual = foundUser[0];
      expect(actual).toHaveProperty("hashed_PIN");
    });
    it("Invalid PINS ", async () => {
      const wrongPINS = [
        { PIN: 1234 },
        { PIN: "HahaThis" },
        { PIN: "ShouldNotPass" },
      ];
      let error = null;

      for (const PIN of wrongPINS) {
        try {
          const user = await new User({ PIN: PIN }).save();
        } catch (e) {
          error = e;
        }
        expect(error).not.toBeNull();
      }
    });
  });
  describe("get user", () => {
    it("gets a user", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const foundUser = await User.find({}).exec();
      const actual = foundUser[0];
      expect(actual).toHaveProperty("hashed_PIN");
    });
  });

  describe("update user", () => {
    it("Update PIN", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const current_hash = user.hashed_PIN;
      user.PIN = "4321";
      const updatedUser = await user.save();
      const actual = updatedUser.hashed_PIN;
      expect(actual).not.toEqual(current_hash);
    });
  });

  describe("Validation", () => {
    it("No PIN provided", async () => {
      const user = await new User({ PIN: "" });
      expect(user.save()).rejects.toThrow(
        "User validation failed: PIN: PIN is required"
      );
    });
    it("PIN length less than 4", async () => {
      const user = await new User({ PIN: "123" });
      expect(user.save()).rejects.toThrow(
        "User validation failed: PIN: PIN must be 4 integers"
      );
    });

    it("PIN length more than 4", async () => {
      const user = await new User({ PIN: "123456" });
      expect(user.save()).rejects.toThrow(
        "User validation failed: PIN: PIN must be 4 integers"
      );
    });
    it("PIN is NaN", async () => {
      const user = await new User({ PIN: "HA12" });
      expect(user.save()).rejects.toThrow(
        "User validation failed: PIN: PIN must be 4 integers"
      );
    });
  });

  describe("Authenticate", () => {
    it("successfully if given correct PIN", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const foundUser = await User.find({}).exec();
      const actual = foundUser[0];
      const auth = await User.authenticate("1234", actual.hashed_PIN);
      expect(auth).toEqual(true);
    });
    it("failed if given wrong PIN", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const foundUser = await User.find({}).exec();
      const actual = foundUser[0];
      const auth = await User.authenticate("5678", actual.hashed_PIN);
      expect(auth).toEqual(false);
    });
  });

  describe("virtual PIN attribute", () => {
    it("getter should succeed ", async () => {
      const PIN = "1234";
      const user = await new User({ PIN: PIN }).save();
      expect(user.PIN).toEqual(PIN);
    });
  });

  describe("Increment Login Attempt", () => {
    it("should increment  ", async () => {
      const user = await new User({ PIN: "1234" }).save();
      const { lockUntil, updates } = user.incLoginAttempts();
      await User.updateOne({ _id: user._id }, updates).exec();
      const updatedUser = await User.find({}).exec();
      expect(updatedUser[0]).toMatchObject({
        __v: expect.anything(),
        _id: expect.anything(),
        createdAt: expect.anything(),
        hashed_PIN: expect.anything(),
        loginAttempts: 1,
        updatedAt: expect.anything(),
      });
    });
    it("should lock  ", async () => {
      let user = await new User({ PIN: "1234" }).save();
      for (let i = 0; i <= 5; i++) {
        const { lockUntil, updates } = user.incLoginAttempts();
        await User.updateOne({ _id: user._id }, updates).exec();
        user = await User.findOne({ _id: user._id });
      }

      expect(user).toMatchObject({
        __v: expect.anything(),
        _id: expect.anything(),
        createdAt: expect.anything(),
        hashed_PIN: expect.anything(),
        loginAttempts: 6,
        updatedAt: expect.anything(),
        lockUntil: expect.anything(),
      });
    });
    it("should unlock  ", async () => {
      let user = await new User({ PIN: "1234" }).save();
      for (let i = 0; i <= 5; i++) {
        const { lockUntil, updates } = user.incLoginAttempts();
        await User.updateOne({ _id: user._id }, updates).exec();
        user = await User.findOne({ _id: user._id });
      }
      const newLockUntil = Date.parse(
        new Date(new Date().getTime() - 5 * 60000)
      );
      await User.updateOne(
        { _id: user._id },
        { lockUntil: newLockUntil }
      ).exec();
      user = await User.findOne({ _id: user._id });
      const { lockUntil, updates } = user.incLoginAttempts();
      await User.updateOne({ _id: user._id }, updates).exec();
      user = await User.findOne({ _id: user._id });

      expect(user).toMatchObject({
        __v: expect.anything(),
        _id: expect.anything(),
        createdAt: expect.anything(),
        hashed_PIN: expect.anything(),
        loginAttempts: 1,
        updatedAt: expect.anything(),
      });
    });
  });
});

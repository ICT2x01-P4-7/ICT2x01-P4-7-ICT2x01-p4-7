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
});

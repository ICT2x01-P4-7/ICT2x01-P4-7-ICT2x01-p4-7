const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { saltRounds } = require("../../config/config.js");

/*
References
https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-2 
*/

const UserSchema = new Schema(
  {
    hashed_PIN: {
      type: String,
      required: true,
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
  },
  { timestamps: true }
);

UserSchema.statics.generateHash = function (PIN) {
  try {
    const hashedPIN = bcrypt.hashSync(PIN, saltRounds);
    return hashedPIN;
  } catch (err) {
    return err;
  }
};

UserSchema.virtual("PIN")
  .set(async function (PIN) {
    this._PIN = PIN;
    this.hashed_PIN = this.model("User").generateHash(PIN);
  })
  .get(function () {
    return this._PIN;
  });

UserSchema.virtual("isLocked").get(() => {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.path("hashed_PIN").validate(function () {
  if (this._PIN && this._PIN.length !== 4) {
    this.invalidate("PIN", "PIN must be 4 integers");
  }
  if (!this._PIN) {
    this.invalidate("PIN", "PIN is required");
  }
}, null);

/**
 *
 * @param {String} given_PIN
 * @param {String} hashed_PIN
 * @returns A promise
 */
UserSchema.statics.authenticate = function (given_PIN, hashed_PIN) {
  return bcrypt.compare(given_PIN, hashed_PIN);
};

// expose enum on the model
UserSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2,
};

const User = model("User", UserSchema);

module.exports = User;

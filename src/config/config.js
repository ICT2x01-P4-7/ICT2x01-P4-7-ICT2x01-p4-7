module.exports = {
  mongoUri: process.env.MONGO_URI || "mongodb+srv://dbUser:dbUserPassword@cluster0.z9m2y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  PORT: process.env.PORT || 3000,
};

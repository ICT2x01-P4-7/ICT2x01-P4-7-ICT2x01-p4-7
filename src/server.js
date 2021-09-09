const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config/config.js");
const cors = require("cors");
const userRoutes = require("./routes/api/User");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));
app.use("/api/User", userRoutes);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/dist'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
//     })
// }

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

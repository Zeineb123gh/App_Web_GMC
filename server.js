//** */

const express = require("express");
const path = require("path");
const connectDB = require("./db/connectDB");
require("dotenv").config();
//************************** *
const app = express();
//************************** */
connectDB();
//************************** */
//router
app.use(express.json());
app.use("/api/user", require("./routes/users"));
app.use("/api/cinema", require("./routes/cinema"));
app.use("/api/invitations", require("./routes/invitations"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/reservation", require("./routes/reservation"));
app.use("/api/showtime", require("./routes/showtime"));
// app.use("/", require("./router/user"));
//************************** */

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
  });
}
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server is running on PORT=${PORT}`)
);

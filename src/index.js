const express = require("express");
const cors = require("cors");
const session = require("express-session");
// const path = require("path");
const db = require("./config/database");

require("./models/associations");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const managerRoutes = require("./routes/managerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: process.env.COOKIE,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000,
      sameSite: "strict",
    },
  })
);

// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/employee", employeeRoutes);


(async () => {
  await db.sync();
})();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

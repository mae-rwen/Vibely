require("dotenv/config");
require("./db");
const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser")

const { authRouter } = require("./routes/auth")
const { userRouter } = require("./routes/users")
const { eventRouter } = require("./routes/events")

const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3001;

// console.log(process.env.CONNECTION_STRING);

app.use(cors({
  // origin: ["http://localhost:300"],
  // credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/events", eventRouter)

app.use(errorHandler);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
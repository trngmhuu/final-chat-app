const express = require('express');
const app = express();
require("dotenv").config();
// const { chats } = require("./data/data");
const {notFound, errorHandler} = require("./middlewares/errorMiddleware");

app.use(express.json());

const colors = require("colors");

//------- Kết nối CSDL
const connectDB = require('./config/db');
connectDB();

//------- Định nghĩa các Route
const userRoute = require("./routes/userRoute");
app.use("/api/user/", userRoute);

const chatRoute = require("./routes/chatRoute");
app.use("/api/chat", chatRoute);

const messageRoute = require("./routes/messageRoute");
app.use("/api/message", messageRoute);
//-------

app.use(notFound);
app.use(errorHandler);

//------- Định nghĩa port
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`.yellow.bold))
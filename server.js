const express = require("express");
const seed = require("./seed");
const db = require("./db");
const app = express();
const userRouter = require("./src/routes/user");
const showRouter = require("./src/routes/shows")

app.use(express.json());

app.use("/users", userRouter);
app.use("/shows", showRouter);

app.listen(5001, async () => {
    await seed();
    console.log("listening on port 5001");
})
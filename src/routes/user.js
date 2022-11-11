const {Router} = require("express");
const userRouter = Router();

const { User , Show } = require("../../db/models/index");


userRouter.get("/", async (req,res) => {
    res.status(200).send(await User.findAll());
})

userRouter.get("/:userID", async (req,res) => {
    res.status(200).send(await User.findByPk(req.params.userID));
})

userRouter.get("/:userID/shows", async (req,res) => {
    res.status(200).send(await User.findByPk(req.params.userID, {include: "shows"}));
})

userRouter.put("/:userID/shows/:showsID" , async (req, res) => {
    const user = await User.findByPk(req.params.userID);
    const show = await Show.findByPk(req.params.showsID);
    res.status(200).send(user.addShow(show));
})

module.exports = userRouter




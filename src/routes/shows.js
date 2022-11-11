const {Router} = require("express");
const { body, validationResult } = require('express-validator');
const showRouter = Router();

const { User , Show } = require("../../db/models/index");
showRouter.get("/", async (req,res) => {
    res.status(200).send(await Show.findAll());
})

showRouter.get("/:showID", async (req,res) => {
    res.status(200).send(await Show.findByPk(req.params.showID));
})

showRouter.get("/genres/:genre", async (req,res) => {
    res.status(200).send(await Show.findAll({where: {genre: req.params.genre}}));
})

showRouter.put("/:showID/watched" , [body("rating").isNumeric(),body("rating").isLength({min:1})], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()})
    }
    res.status(200).send(await Show.update({rating: req.body.rating},{where: {id: req.params.showID}}));
})

showRouter.put("/:showID/updates", async (req,res) => {
    const show  = await Show.findByPk(req.params.showID)
    res.status(200).send(await Show.update({status: show.status === "cancelled" ? "on-going" : "cancelled"},{where: {id: req.params.showID}}));
})

showRouter.delete("/:showID", async (req,res) => {
    const user = await Show.destroy({where: {id: req.params.showID}});
    await res.json(user);
})



module.exports = showRouter
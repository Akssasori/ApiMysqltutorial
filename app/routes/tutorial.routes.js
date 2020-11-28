const { tutorials } = require("../models");

module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller");

    var router = require("express").Router();

    //criando um novo tutorial
    router.post("/", tutorials.create);

    //buscando todos tutoriais
    router.get("/", tutorials.findAll);

    //buscando os published
    router.get("/published", tutorials.findAllPublished);

    //buscando pelo id
    router.get("/:id", tutorials.findOne);

    // Update tutorial com id
    router.put("/:id", tutorials.update);

    //delete tutorial
    router.delete("/:id", tutorials.delete);

    //delete all
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};
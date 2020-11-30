const { sequelize } = require("../models");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

//Criar e salvar
exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({
            message: "Não pode ser vazio o campo!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    Tutorial.create(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algum erro ocorreu ao salvar"
        });
    });

};

//recuperar tudo do banco
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {[Op.like]: `%${title}`}} : null;

    Tutorial.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum error ocorreu enquanto recuperava tutoriais"
        });
    });

};

//procurar pelo id
exports.findOne = (req, res) =>{
    const id = req.params.id;

    Tutorial.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error ao buscar tutorial com id=" + id
        });
    });

};

//atualizar com um id
exports.update = (req,res) => {
    const id = req.params.id;

    Tutorial.update(req.body,{
        where: { id : id }
    })
    .then(num => {
        if(num ==1){
            res.send({
                message: "Update com sucesso"
            });
        }else{
            res.send({
                message: `Não foi possivel atualizar o tutorial com id=${id}. sera que ele existe?`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "erro ao atualizar o id= "+id
        });
    });

};

//deletar pelo id
exports.delete = (req,res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
    .then(num => {
        if(num ==1 ){
            res.send({
                message: "Tutorial deletado"
            });
        }else {
            res.send({
                message: `Não foi possivel deletar o id= ${id}. ele existe?`
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Não foi possivel deletar o id= " + id
        });
    });

};

//deletar tudao
exports.deleteAll = (req, res) =>{
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Tutorial foi deletado`});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algum erro ao apagar o tutorial"
        });
    });
};

//buscar todos published
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true }})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Algo ocorreu ao buscar o tutorial"
        });
    });
};


exports.insertMany = (req,res) =>{

    // if(!req.body.title){
    //     res.status(400).send({
    //         message: "Não pode ser vazio o campo!"
    //     });
    //     return;
    // }
    // var notes = [
    //         {
    //             'title': 'lucas90',
    //             'description':'sera que foi',
    //             'published': true
    //         },
    //         {
    //             'title': 'lucas100',
    //             'description': 'sera que foi',
    //             'published': true
    //         }
    //     ];
    // notes.create(tutorial)
    // .then(data => {
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message:
    //         err.message || "Algum erro ocorreu ao salvar"
    //     });
    // });


    let Note = sequelize.define('notes',{
        
        title:{
            type:Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }

    });
    var notes = [
        {
            'title': 'lucas90',
            'description':'sera que foi',
            'published': true
        },
        {
            'title': 'lucas100',
            'description': 'sera que foi',
            'published': true
        }
    ];

    sequelize.sync({ force : true }).then(() => {

        Note.bulkCreate(notes, { validate: true }).then(() => {
            console.log('acoes criadas')
        }).catch((err) => {
            console.log('falhou ao criar as acoes');
            console.log(err);
        }).finally(() => {
            sequelize.close();
        });
        console.log(notes)
        
    });


};


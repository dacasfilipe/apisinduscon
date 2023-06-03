const express = require('express');
const router = express.Router();
const Task = require('./model/Task');

//GET Retorna tarefas com paginação e ordenação
router.get('/tasks', async (req, res) => {
    const {page = 1 , limit = 10} = req.query;
    Task.findAll({
        offset: (page - 1) * limit,
        limit: +limit,
        order: [['updatedAt', 'desc']]
    }).then((tasks) => {res.json(tasks)});
});

//GET Consulta uma tarefa pelo ID
router.get('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        if(!task){
            res.status(404).json({
                sucess: false,
                message:"tarefa não encontrada",
            });
        }else{
            res.json({
                sucess: true,
                task: task,
            });
        }
        
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
    });

module.exports = router;
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

//POST Cria uma tarefa
router.post('/tasks', async (req, res) => {
    try{
        const task = new Task({
            description: req.body.description,
        });
        await task.save();
        res.status(201).json({
            sucess: true,
            message: "Tarefa criada com sucesso",
        });
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

//PUT Atualiza uma tarefa pelo ID
router.put('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        if(!task){
            res.status(404).json({
                sucess: false,
                message:"tarefa não encontrada",
            });
        }else{
            await task.update({
                description: req.body.description,
            });
            res.json({
                sucess: true,
                message: "Tarefa atualizada com sucesso",
            });
        }
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
})

//DELETE Deleta uma tarefa pelo ID
router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByPk(req.params.id);
        if(!task){
            res.status(404).json({
                sucess: false,
                message:"tarefa não encontrada",
            });
        }else{
            await task.destroy();
            res.json({
                sucess: true,
                message: "Tarefa deletada com sucesso",
            });
        }
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
})

module.exports = router;
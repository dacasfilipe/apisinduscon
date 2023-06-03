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

module.exports = router;
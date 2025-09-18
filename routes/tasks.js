const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Task = require('../models/task')

//POST
router.post('/', async (req,res)=>{
    try{
        const {title,completed} = req.body
        if(!title||typeof title!== 'string'){
            return res.status(400).json({ error: "title is required and must be a string" });
        }
        const task = await Task.create({ title: title.trim(), completed });
        return res.status(201).json(task);
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
})

// Update (PUT /tasks/:id)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete (DELETE /tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    return res.status(204).send(); // No Content
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
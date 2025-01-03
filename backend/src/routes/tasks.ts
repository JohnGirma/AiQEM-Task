import express from 'express';
import Task from '../models/Task';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      category: req.body.category,
      completed: false
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const result = await Task.destroy({
      where: { id: req.params.id }
    });
    if (result) {
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Update a task completion status
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.completed = !task.completed;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Add description update route
router.patch('/:id/description', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.description = req.body.description;
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating task description' });
  }
});

export default router; 
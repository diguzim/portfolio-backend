import express from 'express';
import { Project } from '../models';

const router = express.Router();

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      res.status(404).send();
    }

    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/projects', async (req, res) => {
  const project = new Project(req.body);

  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndUpdate(id, req.body);
    if (!project) {
      res.status(404).send();
    }
    await project?.save();
    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).send();
    }

    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;

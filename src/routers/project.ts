import express from 'express';
import { Project } from '../models';

const router = express.Router();

router.post('/projects', async (req, res) => {
  const project = new Project(req.body);

  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;

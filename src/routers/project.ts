import express, { Request } from 'express';
import { Project } from '../models';

const router = express.Router();

function isValidOperation(body: Request) {
  const allowedUpdates = ['name'];

  const updates = Object.keys(body);
  return updates.every((update) => allowedUpdates.includes(update));
}

router.get('/projects', async (_req, res) => {
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
      return res.status(404).send();
    }

    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/projects', async (req, res) => {
  const { body } = req;

  const isValid = isValidOperation(body);
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid fields' });
  }

  const project = new Project(body);

  try {
    await project.save();
    res.status(201).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/projects/:id', async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const isValid = isValidOperation(body);
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid fields' });
  }

  try {
    const project = await Project.findByIdAndUpdate(id, body);

    if (project === null) {
      return res.status(404).send();
    }

    await project.save();
    res.status(204).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).send();
    }

    res.status(200).send(project);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;

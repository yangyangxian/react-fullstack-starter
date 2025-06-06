import { Router } from 'express';
import { HelloResponse, HelloNameResponse, helloTest } from '@fullstack/common'; 

const router = Router();

router.get('/', (req, res) => {
  const response: HelloResponse = { message: 'Hello from /api/hello!'};
  res.json(response);
});

router.get('/:name', (req, res) => {
  const name = req.params.name;
  const response: HelloNameResponse = { message: `Hello, ${name}!` + helloTest};
  res.json(response);
});

export default router;

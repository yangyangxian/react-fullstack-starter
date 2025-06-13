import { Router, Request, Response } from 'express';
import { HelloResponse, HelloNameResponse, HelloNameRequest } from '@fullstack/common'; 

const router = Router();

router.get('/', (req: Request, res: Response<HelloResponse>) => {
  const response: HelloResponse = { message: 'Hello from /api/hello!'};
  res.json(response);
});

router.get('/:name', (req: Request<HelloNameRequest>, res: Response<HelloNameResponse>) => {
  const name = req.params.name;
  const response: HelloNameResponse = { message: `Hello, ${name}!`};
  res.json(response);
});

export default router;

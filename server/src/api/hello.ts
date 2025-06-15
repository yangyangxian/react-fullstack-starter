import { Router, Request, Response } from 'express';
import { HelloResDto } from '@fullstack/common'; 

const router = Router();

router.get('/', (req: Request, res: Response<HelloResDto>) => {
  const response: HelloResDto = { message: 'Hello from /api/hello!'};
  res.json(response);
});

export default router;

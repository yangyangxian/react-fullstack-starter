import { Router, Request, Response } from 'express';
import { HelloResDto } from '@fullstack/common'; 
import { createApiResponse } from 'src/utils/apiResponseUtils';

const router = Router();

router.get('/', (req: Request, res: Response<HelloResDto>) => {
  const response: HelloResDto = { message: 'Hello from /api/hello!'};
  res.json(createApiResponse<HelloResDto>(response));
});

export default router;

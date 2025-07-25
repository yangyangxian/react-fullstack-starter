import { Router, Request, Response } from 'express';
import { HelloResDto, ApiResponse } from '@fullstack/common'; 
import { createApiResponse } from '../utils/apiUtils.js';

const protectedRouter = Router();

protectedRouter.get('/', (req: Request, res: Response<ApiResponse<HelloResDto>>) => {
  const response: HelloResDto = { message: 'Hello from /api/hello!'};
  res.json(createApiResponse<HelloResDto>(response));
});

export {
  protectedRouter
};

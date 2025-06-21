import { Router, Request, Response, NextFunction } from 'express';
import { UserEntity, UserService } from '../services/UserService.js';
import { UserReqDto, UserResDto, ApiResponse } from '@fullstack/common';
import { mapObject } from '../utils/mappers.js';
import { createApiResponse } from '../utils/apiResponseUtils.js';

const router = Router();

// Sample API endpoint to demonstrate user retrieval from database
// GET /api/users/:id
router.get('/:id', async (req: Request<UserReqDto>, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
  const userId = req.params.id;

  const user: UserEntity = await UserService.getUser(userId); // Ensure UserService.getUser can return null

  const userDto = mapObject(user, new UserResDto()); 
  
  res.json(createApiResponse<UserResDto>(userDto));
});

export default router;

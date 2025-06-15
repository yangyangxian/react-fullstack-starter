import { Router, Request, Response, NextFunction } from 'express';
import { UserEntity, UserService } from '../services/UserService.js';
import { UserResDto, ApiResponse } from '@fullstack/common';
import { mapObject } from '../utils/mappers.js';
import { createApiResponse } from '../utils/apiResponseUtils.js';
import { CustomError } from '../classes/CustomError.js';

const router = Router();

// Sample API endpoint to demonstrate user retrieval from database
// GET /api/users/:id
router.get('/:id', async (req: Request<{ id: string }>, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
  const userId = req.params.id;

  try { 
    const user: UserEntity | null = await UserService.getUser(userId); // Ensure UserService.getUser can return null

    if (user) {
      const userDto = mapObject(user, new UserResDto()); // Assuming mapObject correctly maps to UserDto
      
      res.json(createApiResponse<UserResDto>(true, userDto));
    } else {
      throw new CustomError('NotFoundError', `User with ID ${userId} not found.`);
    }
  } catch (err) {
    // Pass errors to the error handler middleware
    return next(err);
  }
});

export default router;

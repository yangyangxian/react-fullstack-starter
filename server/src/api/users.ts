import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services/UserService.js';
import { UserReqDto, UserResDto, ApiResponse, ErrorCodes } from '@fullstack/common';
import { mapObject } from '../utils/mappers.js';
import { createApiResponse } from '../utils/apiUtils.js';
import { CustomError } from 'src/classes/CustomError.js';

const router = Router();

// GET /api/users/email/:email
router.get('/email/:email', async (req: Request<UserReqDto>, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
  const email = req.params.email;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new CustomError('User not found', ErrorCodes.NOT_FOUND);
  }
  const userDto = mapObject(user, new UserResDto());
  res.json(createApiResponse<UserResDto>(userDto));
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { createJWT } from '../utils/jwt.js';
import { createApiResponse } from '../utils/apiUtils.js';
import { CustomError } from '../classes/CustomError.js';
import { 
  ApiResponse, 
  UserResDto, 
  LoginReqDto, 
  LogoutResDto, 
  ErrorCodes
} from '@fullstack/common';
import appConfig from '../appConfig.js';
import { userService } from '../services/UserService.js';

const router = Router();

// Login endpoint
router.post('/login', (req: Request<LoginReqDto>, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
  const loginHandler = async () => {
    try {
      const { email, password }: LoginReqDto = req.body;
      if (!email || !password) {
        throw new CustomError(
          'Email and password are required',
          ErrorCodes.MISSING_CREDENTIALS
        );
      }
      const user = await userService.getUserByEmail(email);
      if (!user) {
        throw new CustomError(
          'Invalid credentials',
          ErrorCodes.INVALID_CREDENTIALS
        );
      }
      const isValidPassword = await bcrypt.compare(password, user.password!);
      if (!isValidPassword) {
        throw new CustomError(
          'Invalid credentials',
          ErrorCodes.INVALID_CREDENTIALS
        );
      }
      const token = createJWT({
        userId: user.id,
        email: user.email,
        name: user.name
      });
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: appConfig.envMode === 'production',
        sameSite: 'strict',
        maxAge: appConfig.jwtMaxAge
      });
      const userResDto: UserResDto = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      res.json(createApiResponse<UserResDto>(userResDto));
    } catch (error) {
      next(error);
    }
  };
  loginHandler();
});

// Signup endpoint
router.post('/signup', (req: Request<LoginReqDto>, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
  const signupHandler = async () => {
    try {
      const { email, password }: LoginReqDto = req.body;
      if (!email || !password) {
        throw new CustomError(
          'Email and password are required',
          ErrorCodes.MISSING_CREDENTIALS
        );
      }
      // For demo, use email as name
      const user = await userService.createUser({ name: email, email, password });
      const token = createJWT({
        userId: user.id,
        email: user.email,
        name: user.name
      });
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: appConfig.envMode === 'production',
        sameSite: 'strict',
        maxAge: appConfig.jwtMaxAge
      });
      const userResDto: UserResDto = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      res.json(createApiResponse<UserResDto>(userResDto));
    } catch (error) {
      next(error);
    }
  };
  signupHandler();
});

// Get current user (auth status check) - Protected by global auth middleware
router.get('/me', async (req: Request, res: Response<ApiResponse<UserResDto>>, next: NextFunction) => {
    try {
        const user = req.user; // Global auth middleware sets this
        if (!user) {
            throw new CustomError(
                'User authentication failed',
                ErrorCodes.UNAUTHORIZED
            );
        }

        const dbUser = await userService.getUserById(user.userId);
        if (!dbUser) {
            throw new CustomError(
                'User not found',
                ErrorCodes.NOT_FOUND
            );
        }
        const userResDto: UserResDto = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email
        };
        res.json(createApiResponse<UserResDto>(userResDto));
    } catch (error) {
        next(error);
    }
});

// Logout endpoint
router.post('/logout', (req: Request, res: Response<ApiResponse<LogoutResDto>>, next: NextFunction) => {

    // Clear the auth cookie
    res.clearCookie('auth-token', {
        httpOnly: true,
        secure: appConfig.envMode === 'production',
        sameSite: 'strict'
    });

    const logoutResDto: LogoutResDto = { message: 'Logged out successfully' };
    res.json(createApiResponse<LogoutResDto>(logoutResDto));

});

export default router;

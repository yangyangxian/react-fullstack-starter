import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createJWT } from '../utils/jwt.js';
import { createApiResponse } from '../utils/apiUtils.js';
import { 
  ApiResponse, 
  UserResDto, 
  LoginReqDto, 
  LogoutResDto, 
  ErrorCode, 
  HttpStatusCode 
} from '@fullstack/common';

const router = Router();

// Demo users (in real app, this would be a database)  
const demoUsers = [
  {
    id: '1',
    email: 'alice@demo.com',
    name: 'Alice Smith',
    password: bcrypt.hashSync('demo', 10)
  }
];

// Login endpoint
router.post('/login', (req: Request<LoginReqDto>, res: Response<ApiResponse<UserResDto>>) => {
  const loginHandler = async () => {
    try {
      const { email, password }: LoginReqDto = req.body;
      
      if (!email || !password) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          createApiResponse<UserResDto>(undefined, {
            code: ErrorCode.MISSING_CREDENTIALS,
            message: 'Email and password are required',
            timestamp: new Date().toISOString()
          })
        );
      }
      
      // Find user by email
      const user = demoUsers.find(u => u.email === email);
      if (!user) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json(
          createApiResponse<UserResDto>(undefined, {
            code: ErrorCode.INVALID_CREDENTIALS,
            message: 'Invalid credentials',
            timestamp: new Date().toISOString()
          })
        );
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json(
          createApiResponse<UserResDto>(undefined, {
            code: ErrorCode.INVALID_CREDENTIALS,
            message: 'Invalid credentials',
            timestamp: new Date().toISOString()
          })
        );
      }
      
      // Create JWT token
      const token = createJWT({
        userId: user.id,
        email: user.email,
        name: user.name
      });
      
      // Set httpOnly cookie for browsers
      res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      // Return user data (excluding password)
      const userResDto: UserResDto = {
        id: user.id,
        name: user.name,
        email: user.email
      };
      res.json(createApiResponse<UserResDto>(userResDto));
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        createApiResponse<UserResDto>(undefined, {
          code: ErrorCode.INTERNAL_ERROR,
          message: 'Internal server error',
          timestamp: new Date().toISOString()
        })
      );
    }
  };
  
  loginHandler();
});

// Get current user (auth status check) - Protected by global auth middleware
router.get('/me', (req: Request, res: Response<ApiResponse<UserResDto>>) => {
  try {
    const user = req.user!; // Global auth middleware ensures user exists
    
    const userResDto: UserResDto = {
      id: user.userId,
      name: user.name,
      email: user.email
    };
    res.json(createApiResponse<UserResDto>(userResDto));
  } catch (error) {
    console.error('Get user error:', error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
      createApiResponse<UserResDto>(undefined, {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      })
    );
  }
});

// Logout endpoint
router.post('/logout', (req: Request, res: Response<ApiResponse<LogoutResDto>>) => {
  try {
    // Clear the auth cookie
    res.clearCookie('auth-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    const logoutResDto: LogoutResDto = { message: 'Logged out successfully' };
    res.json(createApiResponse<LogoutResDto>(logoutResDto));
  } catch (error) {
    console.error('Logout error:', error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
      createApiResponse<LogoutResDto>(undefined, {
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Internal server error',
        timestamp: new Date().toISOString()
      })
    );
  }
});

export default router;

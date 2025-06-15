import { executeQuery } from '../utils/databaseAccess.js';
import { CustomError } from '../classes/CustomError.js';
import { mock } from 'node:test';

// User entity interface
export class UserEntity {
  id : string = '';
  name: string = '';
  email: string = '';
  createdAt: string = '';
}

export class UserService {
  static async getUser(userId: string): Promise<UserEntity> {
    try {
      const result = await executeQuery<UserEntity>(
        `SELECT id, name, email, created_at as createdAt FROM public.users WHERE id = ${userId}`
      );
      
      const user = result.length > 0 ? result[0] : null;
      
      if (!user) {
        throw new CustomError('UserNotFound', `User with ID ${userId} not found`);
      }
      
      return user;
    } catch (error) {
      if (error instanceof Error && error.name == 'DatabaseURLNotConfigured') {
        const mockUser : UserEntity = {
          id: userId,
          name: 'Mock User',
          email: 'mock.user@example.com',
          createdAt: new Date().toISOString()
        };
        return mockUser;
      }
      // If it's already a CustomError, re-throw it
      if (error instanceof CustomError) {
        throw error;
      }
      
      // Otherwise, wrap it in a CustomError
      throw new CustomError('DatabaseError', 'Failed to retrieve user', error instanceof Error ? error.stack : undefined);
    }
  }
}

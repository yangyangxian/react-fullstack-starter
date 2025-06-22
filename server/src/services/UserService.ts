import { executeQuery } from '../database/databaseAccess.js';
import { CustomError } from '../classes/CustomError.js';
import { ErrorCodes } from '@fullstack/common';

export class UserEntity {
  id : string = '';
  name: string = '';
  email: string = '';
  createdAt: string = '';
}

export class UserService {
  static async getUser(userId: string): Promise<UserEntity> {
    const result = await executeQuery<UserEntity>(
      `SELECT id, name, email, created_at as createdAt FROM users WHERE id = $1`, [userId]
    );
    
    const user = result.length > 0 ? result[0] : null;
    
    if (!user) {
      throw new CustomError(
        'UserNotFound',
        `User with ID ${userId} not found`,
        ErrorCodes.NOT_FOUND
      );
    }
    
    return user;
  }
}

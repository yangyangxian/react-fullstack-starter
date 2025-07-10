import bcrypt from 'bcryptjs';
import { CustomError } from '../classes/CustomError.js';
import { ErrorCodes } from '@fullstack/common';

export class UserEntity {
  id: string = '';
  name: string = '';
  email: string = '';
  password?: string = '';
  createdAt: string = '';
}

class UserService {

  private users: UserEntity[] = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@demo.com',
      password: bcrypt.hashSync('demo', 10),
      createdAt: new Date().toISOString(),
    },
  ];

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async createUser({ name, email, password }: { name: string; email: string; password: string }): Promise<UserEntity> {
    if (await this.getUserByEmail(email)) {
      // TODO: Add a specific error code for conflict/duplicate if needed
      throw new CustomError('Email already exists', ErrorCodes.EMAIL_ALREADY_EXISTS);
    }
    const user: UserEntity = {
      id: (this.users.length + 1).toString(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    return user;
  }
}

export const userService = new UserService();

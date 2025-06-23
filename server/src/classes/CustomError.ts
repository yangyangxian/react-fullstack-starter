import { ErrorCodes } from '@fullstack/common';

export class CustomError extends Error {
  public readonly timestamp: string;
  public readonly errorCode: ErrorCodes;

  constructor(
    message: string, 
    errorCode: ErrorCodes,
    stack?: string
  ) {
    super(message);
    
    this.errorCode = errorCode;
    
    if (stack) {
      this.stack = stack;
    }
    
    this.timestamp = new Date().toISOString();
    
    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

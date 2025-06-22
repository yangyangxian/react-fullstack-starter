import { ErrorCode } from '@fullstack/common';

export class CustomError extends Error {
  public readonly timestamp: string;
  public readonly errorCode: ErrorCode;

  constructor(
    name: string, 
    message: string, 
    errorCode: ErrorCode,
    stack?: string
  ) {
    super(message);
    
    this.name = name;
    this.errorCode = errorCode;
    
    // Set custom stack if provided, otherwise use the default
    if (stack) {
      this.stack = stack;
    }
    
    // Add timestamp
    this.timestamp = new Date().toISOString();
    
    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

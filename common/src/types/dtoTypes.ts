/*
* The reason why using classes instead of interfaces is to ensure that the fields of DTOs can be used for object mapping in api.
*/
export class UserResDto {
  id: string | undefined;
  name: string = '';
  email?: string = '';
}

export class UserReqDto {
  id : string;
  constructor(id: string) {
    this.id = id;
  }
}

export class HelloResDto {
  message: string = '';
}

// Authentication DTOs
export class LoginReqDto {
  email: string = '';
  password: string = '';
}

export class LogoutResDto {
  message: string = '';
}


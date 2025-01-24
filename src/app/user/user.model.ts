export interface RegisterRequest {
    name: string;
    emailId: string;
    contactNo: string;
    password: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
  }
  
  export interface LoginRequest {
    emailId: string;
    password: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data:{
      token: string,
      userId: string,
      role: string
    }
  }

  export interface ProfileResponse {
    success: boolean;
    message: string;
    data:{
      name: string,
      emailId: string,
      contactNo: number,
      role: string,
      createdAt: string
    }
  }

  export interface ToggleRoleRequest {
    password: string;
    userId: string;
  }

  export interface ToggleRoleResponse {
    success: boolean;
    message: string;
  }

  export interface UserListData {
    userId: string;
    name: string;
    role:string;
  }
  
  export interface ListUsersResponse {
    success: boolean;
    message: string;
    data: UserListData[];
  }
  
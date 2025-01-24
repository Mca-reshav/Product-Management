import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, ProfileResponse, ToggleRoleResponse, ToggleRoleRequest, ListUsersResponse } from './user.model';
import { API_ROUTES } from '../routes/user.routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ROUTES.register, data);
  }

  loginUser(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ROUTES.login, data)
  }

  showProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(API_ROUTES.profile);
  }

  toggleRole(data: ToggleRoleRequest): Observable<ToggleRoleResponse> {
    return this.http.put<ToggleRoleResponse>(API_ROUTES.toggleRole, data)
  }

  getAllUsers(): Observable<ListUsersResponse> {
    return this.http.get<ListUsersResponse>(API_ROUTES.listUsers)
  }
}


# EcomAngularFrontend

This is an Angular frontend application for a product management system, built using Angular Material and SCSS for the UI. It integrates with a MEAN stack backend for authentication, product management, and role-based access control.

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd EcomAngularFrontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200/`.

## Features

- **Role-Based Access Control**: Different features available based on user roles (Admin/Regular).
- **Authentication**: JWT-based login, secured endpoints, and role toggle functionality.
- **Auth Guard**: Ensures secure routes are only accessible to authenticated users.
- **Interceptors**: Handles HTTP requests, including token attachment for authentication.
- **Shared Services**: Facilitates communication and state management across components using `Subject` and `BehaviorSubject`.
- **AES Encryption**: Used for encrypting/decrypting JWT tokens and other sensitive data.
- **Modular Structure**: Angular modules used to structure the application for scalability.
- **UI**: Angular Material for modern, responsive design with smooth transitions.
- **SCSS**: Used for styling and creating a flexible, responsive layout.

## Project Flow

1. **Setup the Project**:
   - Clone the repo and install dependencies using `npm install`.
   - Run the application with `ng serve`.

2. **Authentication Flow**:
   - Log in if you are a registered user. If not, register yourself first.
   - On successful login, receive a JWT token for authentication.
   - Use the token for accessing protected routes.

3. **Admin Role**:
   - If you're an admin, you can access features like adding, editing, and removing products.
   - You can also toggle your role to 'Admin' and view/manage all users.

4. **Features**:
   - **View All Products**: Admin and regular users can see a paginated list of products.
   - **Add/Remove/Edit Products**: Admin users can perform CRUD operations on products.
   - **User Management**: Admin users can see a list of all users and change their roles.
   - **Profile View**: View user profile details (email, contact, etc.) with the option to change the role.
   - **Secure Login/Logout**: JWT token is stored securely in `localStorage`. Logout clears the token and unsubscribes from any active subscriptions.

5. **Logout**:
   - Click the logout button to unsubscribe from all services and clean up the local storage.

## Key Technologies

- **Angular**: Main framework for building the frontend application.
- **RxJS**: For managing asynchronous operations like API calls and state management.
- **JWT**: Used for secure user authentication and role management.
- **Angular Material**: UI components for modern design and functionality.
- **SCSS**: For styling with a focus on responsive design and smooth transitions.
- **AES Encryption**: For encrypting sensitive data stored in `localStorage`.

## Project Structure

The project follows a modular structure where each feature (such as user management, product management) is encapsulated in its own module.

- **Modules**: Organize the application into distinct sections, like `AuthModule`, `ProductModule`, `UserModule`.
- **Services**: Provide data handling, API communication, and shared functionality like authentication and user state management.
- **Components**: Contain the UI logic and presentation.
- **Shared**: Houses common utilities like interceptors, guards, and shared services.

## API Endpoints (Backend)

- **User Login**: `POST http://localhost:6001/web/user/login`
  - Body: `{ "emailId": "email", "password": "password" }`
  
- **User Registration**: `POST http://localhost:6001/web/user/register`
  - Body: `{ "name": "Name", "emailId": "email", "contactNo": "number", "password": "password" }`
  
- **Product Management**:
  - List All Products: `GET http://localhost:6001/web/product/listAll?limit=5&page=2`
  - Add Product: `POST http://localhost:6001/web/product/add`
  - Edit Product: `PUT http://localhost:6001/web/product/edit/:id`
  - Remove Product: `DELETE http://localhost:6001/web/product/remove/:id`

- **User Management**:
  - List Users: `GET http://localhost:6001/web/user/list`
  - Toggle User Role: `PUT http://localhost:6001/web/user/toggleRole`
  - Show Profile: `GET http://localhost:6001/web/user/profile/:id`

## Conclusion

This project demonstrates the integration of Angular with a backend API to create a dynamic, role-based product management system. The modular structure, use of JWT authentication, and secure token handling make this system highly scalable and maintainable.

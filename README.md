# IAM (Identity and Access Management) Service

## Overview

The IAM Service handles all user authentication, authorization, and user management operations in the Uber-like ride-sharing platform. It manages user accounts, driver profiles, and provides JWT-based authentication for the entire system.

## Role in the System

The IAM Service is the **security and identity layer** of the platform, providing:
- User registration and authentication
- Driver signup and profile management
- JWT token generation and validation
- User data management
- Access control and authorization

## Key Responsibilities

### User Management
- **User Registration**: Creates new rider accounts
- **User Authentication**: Validates user credentials and issues JWT tokens
- **User Profile Management**: Manages user information and preferences
- **User Lookup**: Provides user information to other services

### Driver Management
- **Driver Signup**: Handles driver registration with vehicle and license information
- **Driver Profile**: Manages driver profiles, ratings, and statistics
- **Driver Verification**: Tracks driver verification status
- **Driver Data**: Provides driver information to other services

### Authentication & Authorization
- **JWT Token Generation**: Creates secure tokens for authenticated users
- **Token Validation**: Validates tokens for protected endpoints
- **Session Management**: Manages user sessions
- **Password Security**: Handles secure password storage and validation

### User Data
- **User Information**: Stores user details (name, email, phone)
- **Driver Information**: Stores driver details (vehicle, license, documents)
- **Profile Data**: Manages user and driver profiles

## Service Interactions

- **Receives Commands From**: API Gateway
- **Provides**: User authentication, user data, driver profiles
- **Used By**: All services (via API Gateway) for authentication

## Use Cases

1. **User Registration**: New rider creates an account
2. **User Login**: User authenticates and receives JWT token
3. **Driver Signup**: New driver registers with vehicle and license info
4. **User Lookup**: Other services need user information
5. **Token Validation**: API Gateway validates tokens for protected routes

## User Types

### Riders
- Can register and create accounts
- Can authenticate and receive JWT tokens
- Can access rider-specific features

### Drivers
- Can sign up with vehicle and license information
- Have additional profile information (vehicle type, license, etc.)
- Can access driver-specific features

## Data Stored

- User ID, email, phone, name
- Hashed passwords
- Driver profiles (vehicle type, license, documents)
- User preferences and settings
- Authentication tokens

## Security Features

- Password hashing (bcrypt)
- JWT token-based authentication
- Secure token storage
- Session management

## Health Check

- `GET /health` - Basic health status
- `GET /health/ready` - Readiness check (database connection)
- `GET /health/live` - Liveness check

## Environment Variables

- `HTTP_PORT`: HTTP server port for health checks (default: 3006)
- `RABBITMQ_URL`: RabbitMQ connection URL
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing (shared with API Gateway)

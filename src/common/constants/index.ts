// Common constants for the IAM microservice

export const EnvConstants = {
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV,
  rabbitMQUrl: process.env.RABBITMQ_URL,
};

export const Service = {
  status: {
    up: 'up',
    down: 'down',
  },
  IAM: 'IAM_SERVICE',
  API_GATEWAY: 'API_GATEWAY_SERVICE',
};

export const Queue = {
  IAM: 'iam_queue',
  API_GATEWAY: 'api_gateway_queue',
};

export const ErrorMessages = {
  // User related errors
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_DOES_NOT_EXIST: 'User does not exist',
  INVALID_USER_DATA: 'Invalid user data',
  INTERNAL_USER_CREATION: 'Internal server error occurred while creating user',
  INTERNAL_USER_FETCHING: 'Internal server error occurred while fetching user',
  INTERNAL_USER_UPDATE: 'Internal server error occurred while updating user',
  INTERNAL_USER_DELETE: 'Internal server error occurred while deleting user',
  INTERNAL_USER_EXISTENCE_CHECK: 'Internal server error checking user existence',
  // Auth related errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  PHONE_ALREADY_EXISTS: 'Phone number already exists',
  UNAUTHORIZED: 'Unauthorized access',
  TOKEN_NOT_FOUND: 'Authentication token not found',
  INVALID_TOKEN: 'Invalid authentication token',
  // Add more error messages as needed
};

export const SuccessMessages = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  USER_FETCHED: 'User fetched successfully',
  USERS_FETCHED: 'Users fetched successfully',
  USER_EXISTENCE_CHECKED: 'User existence checked successfully',
  // Auth related success messages
  USER_REGISTERED: 'User registered successfully',
  DRIVER_REGISTERED: 'Driver registered successfully',
  LOGIN_SUCCESS: 'Login successful',
  // Add more success messages as needed
};


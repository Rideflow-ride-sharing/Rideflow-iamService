import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UserService } from './user.service';
import { LoggerService } from '../../common/logger/logger.service';
import { commands } from '../../common/constants/commands';
import { ErrorMessages, SuccessMessages } from '../../common/constants';

@Controller()
export class UserController {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern({ cmd: commands.GET_USER })
  async handleGetUser(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request to get user: ${JSON.stringify(data)}`,
        'IAM - handleGetUser',
      );

      const user = await this.userService.getUser(data);

      this.logger.log(
        `User fetched successfully: ${JSON.stringify(data)}`,
        'IAM - handleGetUser',
      );

      return {
        data: user,
        message: SuccessMessages.USER_FETCHED,
      };
    } catch (error) {
      this.logger.error(
        `Error in fetching user: ${JSON.stringify(error)}`,
        'IAM - handleGetUser',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_FETCHING,
      });
    }
  }

  @MessagePattern({ cmd: commands.UPDATE_USER })
  async handleUpdateUser(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request to update user: ${JSON.stringify(data)}`,
        'IAM - handleUpdateUser',
      );

      const user = await this.userService.updateUser(data);

      this.logger.log(
        `User updated successfully: ${JSON.stringify(data)}`,
        'IAM - handleUpdateUser',
      );

      return {
        data: user,
        message: SuccessMessages.USER_UPDATED,
      };
    } catch (error) {
      this.logger.error(
        `Error in updating user: ${JSON.stringify(error)}`,
        'IAM - handleUpdateUser',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_UPDATE,
      });
    }
  }

  @MessagePattern({ cmd: commands.DELETE_USER })
  async handleDeleteUser(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request to delete user: ${JSON.stringify(data)}`,
        'IAM - handleDeleteUser',
      );

      const result = await this.userService.deleteUser(data);

      this.logger.log(
        `User deleted successfully: ${JSON.stringify(data)}`,
        'IAM - handleDeleteUser',
      );

      return {
        data: result,
        message: SuccessMessages.USER_DELETED,
      };
    } catch (error) {
      this.logger.error(
        `Error in deleting user: ${JSON.stringify(error)}`,
        'IAM - handleDeleteUser',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_DELETE,
      });
    }
  }

  @MessagePattern({ cmd: commands.REGISTER_USER })
  async handleRegisterUser(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request to register user: ${JSON.stringify({ ...data, password: '***' })}`,
        'IAM - handleRegisterUser',
      );

      const user = await this.userService.registerUser(data);

      this.logger.log(
        `User registered successfully: ${user.email}`,
        'IAM - handleRegisterUser',
      );

      return {
        data: user,
        message: SuccessMessages.USER_REGISTERED,
      };
    } catch (error) {
      this.logger.error(
        `Error in registering user: ${JSON.stringify(error)}`,
        'IAM - handleRegisterUser',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_CREATION,
      });
    }
  }

  @MessagePattern({ cmd: commands.DRIVER_SIGNUP })
  async handleDriverSignup(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request for driver signup: ${JSON.stringify({ ...data, password: '***' })}`,
        'IAM - handleDriverSignup',
      );

      const driver = await this.userService.driverSignup(data);

      this.logger.log(
        `Driver registered successfully: ${driver.email}`,
        'IAM - handleDriverSignup',
      );

      return {
        data: driver,
        message: SuccessMessages.DRIVER_REGISTERED,
      };
    } catch (error) {
      this.logger.error(
        `Error in driver signup: ${JSON.stringify(error)}`,
        'IAM - handleDriverSignup',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_CREATION,
      });
    }
  }

  @MessagePattern({ cmd: commands.CHECK_USER_EXISTS })
  async handleCheckUserExists(@Payload() data: any) {
    try {

      this.logger.log(
        `Received request to check if user exists: ${JSON.stringify({ email: data.email, phone: data.phone })}`,
        'IAM - handleCheckUserExists',
      );

      const result = await this.userService.checkUserExists(data);

      this.logger.log(
        `User existence checked successfully: ${JSON.stringify(result)}`,
        'IAM - handleCheckUserExists',
      );

      return {
        data: result,
        message: result.exists ? ErrorMessages.USER_ALREADY_EXISTS : ErrorMessages.USER_DOES_NOT_EXIST,
      };
    } catch (error) {
      this.logger.error(
        `Error checking user existence: ${JSON.stringify(error)}`,
        'IAM - handleCheckUserExists',
      );

      throw new RpcException({
        statusCode: error.status || 500,
        message: error.message || ErrorMessages.INTERNAL_USER_EXISTENCE_CHECK,
      });
    }
  }

  @MessagePattern({ cmd: commands.LOGIN })
  async handleLogin(@Payload() data: any) {
    try {

      this.logger.log(
        `Received login request: ${JSON.stringify({ email: data.email, password: '***' })}`,
        'IAM - handleLogin',
      );

      const result = await this.userService.login(data);

      this.logger.log(
        `User logged in successfully: ${data.email}`,
        'IAM - handleLogin',
      );

      return {
        data: result,
        message: SuccessMessages.LOGIN_SUCCESS,
      };
    } catch (error) {
      this.logger.error(
        `Error in login: ${JSON.stringify(error)}`,
        'IAM - handleLogin',
      );

      throw new RpcException({
        statusCode: error.status || 401,
        message: error.message || ErrorMessages.INVALID_CREDENTIALS,
      });
    }
  }
}

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoggerService } from '../../common/logger/logger.service';
import { ErrorMessages, SuccessMessages } from '../../common/constants';
import { AuthJwtService } from '../../core/auth/jwt.service';
import {
  User,
  UserDocument,
  Role,
  RoleDocument,
  RiderProfile,
  RiderProfileDocument,
  DriverProfile,
  DriverProfileDocument,
} from './schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(RiderProfile.name) private riderProfileModel: Model<RiderProfileDocument>,
    @InjectModel(DriverProfile.name) private driverProfileModel: Model<DriverProfileDocument>,
    private readonly logger: LoggerService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async createUser(data: any) {

    this.logger.log('Creating user', 'IAM - createUser');

    // TODO: Implement user creation logic (e.g., save to database)
    return {
      id: 'generated-id',
      ...data,
    };
  }

  async getUser(data: any) {

    this.logger.log(`Getting user with id: ${data.id}`, 'IAM - getUser');

    // TODO: Implement get user logic (e.g., fetch from database)
    return {
      id: data.id,
      name: 'Sample User',
    };
  }

  async getUsers(data: any) {

    this.logger.log('Getting all users', 'IAM - getUsers');

    // TODO: Implement get users logic (e.g., fetch from database)
    return [];
  }

  async updateUser(data: any) {

    this.logger.log(`Updating user with id: ${data.id}`, 'IAM - updateUser');

    // TODO: Implement update user logic (e.g., update in database)
    return {
      id: data.id,
      ...data,
    };
  }

  async deleteUser(data: any) {

    this.logger.log(`Deleting user with id: ${data.id}`, 'IAM - deleteUser');

    // TODO: Implement delete user logic (e.g., delete from database)
    return {
      id: data.id,
      deleted: true,
    };
  }

  async registerUser(data: any) {

    this.logger.log('Registering user', 'IAM - registerUser');

    const { name, email, phone, password } = data;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }
      throw new ConflictException(ErrorMessages.PHONE_ALREADY_EXISTS);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Get RIDER role
    let riderRole = await this.roleModel.findOne({ name: 'RIDER' });
    if (!riderRole) {
      riderRole = await this.roleModel.create({
        name: 'RIDER',
        description: 'Rider role',
      });
    }

    // Create user
    const user = await this.userModel.create({
      name,
      email,
      phone,
      passwordHash,
      roleId: riderRole._id,
      isActive: true,
      isVerified: false,
    });

    // Create rider profile
    await this.riderProfileModel.create({
      userId: user._id,
      defaultPaymentMethod: null,
      rating: 0,
      totalTrips: 0,
      preferredLanguage: 'en',
      homeLocation: null,
      workLocation: null,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async driverSignup(data: any) {

    this.logger.log('Driver signup', 'IAM - driverSignup');

    const {
      name,
      email,
      phone,
      password,
      vehicleType,
      vehicleNumber,
      licenseNumber,
      licenseExpiry,
      aadharNumber,
      panNumber,
    } = data;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException(ErrorMessages.EMAIL_ALREADY_EXISTS);
      }
      throw new ConflictException(ErrorMessages.PHONE_ALREADY_EXISTS);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Get DRIVER role
    let driverRole = await this.roleModel.findOne({ name: 'DRIVER' });
    if (!driverRole) {
      driverRole = await this.roleModel.create({
        name: 'DRIVER',
        description: 'Driver role',
      });
    }

    // Create user
    const user = await this.userModel.create({
      name,
      email,
      phone,
      passwordHash,
      roleId: driverRole._id,
      isActive: true,
      isVerified: false,
    });

    // Create driver profile
    await this.driverProfileModel.create({
      userId: user._id,
      vehicleType,
      vehicleNumber,
      licenseNumber,
      licenseExpiry: new Date(licenseExpiry),
      aadharNumber,
      panNumber,
      verifiedByAdmin: false,
      isOnline: false,
      currentLocation: null,
      rating: 0,
      totalTrips: 0,
    });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async login(data: any) {

    this.logger.log('User login', 'IAM - login');

    const { email, password } = data;

    // Find user by email
    const user = await this.userModel.findOne({ email }).populate('roleId');
    if (!user) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }

    // Generate JWT token
    const token = await this.authJwtService.generateToken({
      userId: user._id.toString(),
      email: user.email,
      roleId: user.roleId._id.toString(),
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId._id.toString(),
      },
    };
  }
}


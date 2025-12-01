import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerService } from '../../common/logger/logger.service';
import { AuthJwtService } from '../../core/auth/jwt.service';
import {
  User,
  UserSchema,
  Role,
  RoleSchema,
  RiderProfile,
  RiderProfileSchema,
  DriverProfile,
  DriverProfileSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: RiderProfile.name, schema: RiderProfileSchema },
      { name: DriverProfile.name, schema: DriverProfileSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') || '24h';
        return {
          secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LoggerService, AuthJwtService],
  exports: [UserService],
})
export class UserModule {}


import { Module } from '@nestjs/common';
import { DbService } from '@libs/db';
import { PassportModule } from '@nestjs/passport';
import { LOGIN_TIMEOUT } from '@common';
import { JwtModule } from '@nestjs/jwt';
import { APP_KEY_COMPASS } from '../../config';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: APP_KEY_COMPASS,
      signOptions: { expiresIn: LOGIN_TIMEOUT },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, DbService, JwtStrategy],
})
export class UsersModule {}

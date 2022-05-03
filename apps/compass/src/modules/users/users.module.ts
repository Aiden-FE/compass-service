import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbService } from '@libs/db';
import { PassportModule } from '@nestjs/passport';
import { APP_KEY_COMPASS } from '../../config';
import { LOGIN_TIMEOUT } from '@common';
import { JwtModule } from '@nestjs/jwt';
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../entities/user/user.entity';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Role } from 'src/entities/user/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.REDIS,
      options : {
        url: 'redis://redis:6379'
      }
    }])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

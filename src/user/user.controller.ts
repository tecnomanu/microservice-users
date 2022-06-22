import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from '../entities/user/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({ role: 'user', cmd: 'get' })
  async getUser(data: any) {
    //{ id:1, username: "user", password: "$2b$10$lqHLSX5lo0oxj5zINDNS/.Q6Fk30BrNzJ63CGSz7I.NOP9S6iusXO"}; 
    console.log("getting User: " +  data.username );
    return await this.userService.findOne({ email: data.email });
  }

  @Post('signup') 
  async create(@Body() data:CreateUserDto): Promise<string> {
    return await this.userService.createUser(data);
  }

  @UseGuards(AuthGuard)
  @Get('greet') 
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
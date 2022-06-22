import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(query: FindConditions<User>): Promise<User> {
    const user = await this.userRepository.findOne(query);
    if(!user)
      return null;

    return user;
  }

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      if(await this.findOne({email : user.email}))
        throw new ConflictException({
          "message" : "USER_ALREADY_EXIST"
        });
      
      const userEntity = this.userRepository.create(user);
      userEntity.salt = await bcrypt.genSalt()
      
      Logger.log('createUser - Created user');
      
      return await this.userRepository.save(userEntity);
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}

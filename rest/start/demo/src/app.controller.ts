import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller('get')
export class AppController {
  constructor(
    @Inject('ABC') private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('hello')
  getHello(): string {
    return this.userService.findAll(); // 通过公有模块的形式使用子模块中的方法
  }
}

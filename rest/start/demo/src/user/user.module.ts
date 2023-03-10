import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global() // 将模块注册为全局模块, 这样就可以直接在别的控制器内使用模块功能，而不用在模块部分导入
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 当你有模块需要共享的时候，需要将它定义到共享模块中
})
export class UserModule {}

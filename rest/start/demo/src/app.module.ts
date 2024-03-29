import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ReqestModule } from './reqest/reqest.module';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [DemoModule, UserModule, ReqestModule, QrCodeModule],
  controllers: [AppController, DemoController],
  providers: [
    {
      provide: 'ABC',
      useClass: AppService,
    },
  ],
})
export class AppModule {}

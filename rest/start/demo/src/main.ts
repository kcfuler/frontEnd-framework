import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 通过 uri 进行版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: '小马', // "加盐"的过程
      rolling: true, // 每次请求都设置cookie， 这样会刷新cookie的时间
      name: 'kcfuler-cookie',
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3000);
}
bootstrap();

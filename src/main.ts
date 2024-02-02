import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    // {
    //   bufferLogs: true
    // }
  );
  // app.useLogger(app.get(MyLoggerService))
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.setGlobalPrefix("api")
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
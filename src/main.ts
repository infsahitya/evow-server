import AppModule from "./app.module";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "debug", "fatal", "log", "verbose", "warn"],
  });

  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Users")
    .setDescription("The users API description")
    .setVersion("1.0")
    .addTag("users")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();

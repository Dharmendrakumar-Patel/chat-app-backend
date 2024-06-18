import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import MongoStore from 'connect-mongo'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECERET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1 * 24 * 60
      },
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASENAME}`,
        ttl: 1 * 24 * 60,
        stringify: false
      })
    }),
  );
  await app.listen(3000);
}
bootstrap();

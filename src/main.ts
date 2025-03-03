import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const userService = app.get(UsersService);
  const adminExists = await userService.findByUsername('admin');

  if (!adminExists) {
    await userService.createUser({
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Cuenta de administrador creada: admin / admin123');
  }

  await app.listen(3000);
}
bootstrap();

import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { username: string; password: string; role: 'admin' | 'bartender' }) {
        return this.authService.register(body.username, body.password, body.role);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            return { message: 'Credenciales incorrectas' };
        }
        return this.authService.login(user);
    }
}

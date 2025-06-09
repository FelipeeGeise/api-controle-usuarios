import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserWithoutPassword } from '../user/user-without-password.interface';
import { Request } from 'express';

// Crie uma interface para o Request que tenha user tipado corretamente
interface RequestWithUser extends Request {
  user: UserWithoutPassword;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser): Promise<{ access_token: string }> {
    const user = req.user; // agora não tem erro porque o tipo está explícito
    return await this.authService.login(user);
  }
}

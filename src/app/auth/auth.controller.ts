import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/domain/dtos/login.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/libs/security/decorators/public.decorator';
import { RefreshTokenGuard } from 'src/libs/security/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }

  @Get('logout')
  async logout(@Req() req: any) {
    this.authService.logout(req.user.sub);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

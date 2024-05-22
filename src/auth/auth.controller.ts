import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserReqDto } from 'src/user/dto/req.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body()
    { id, password, passwordConfirm, email, name, phone }: CreateUserReqDto,
  ): Promise<any> {
    if (password !== passwordConfirm)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다');
    const { idx, accessToken, refreshToken } = await this.authService.signup(
      id,
      email,
      password,
      name,
      phone,
    );
    return { idx, accessToken, refreshToken };
  }
}

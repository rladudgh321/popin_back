import { UserService } from './../user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    id: string,
    email: string,
    password: string,
    name: string,
    phone: string,
  ) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) throw new ConflictException('이미 존재하는 이메일주소입니다');

      const salt = 10;
      const hashPassword = await hash(password, salt);
      //   const userEntity = queryRunner.manager.create(User, {
      //     email,
      //     password: hashPassword,
      //   });
      const userEntity = await this.prisma.user.create({
        data: {
          idx: uuidv4(),
          id,
          email,
          password: hashPassword,
          name,
          phone,
        },
      });

      const accessToken = await this.generateAccessToken(userEntity.idx);
      const refreshToken = await this.generateRefreshToken(userEntity.idx);
      const refreshEntity = await this.prisma.refresh.create({
        data: {
          idx: uuidv4(),
          user: { connect: { idx: userEntity.idx } },
          token: refreshToken,
        },
      });
      return { idx: refreshEntity.idx, accessToken, refreshToken };
    } catch (err) {
      console.error(err);
    }
  }

  private async generateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private async generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dtos';
import * as argon from 'argon2';
import { SignUpDto } from './dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);
    const user = await this.prisma.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });
    if (user) {
      throw new ForbiddenException('Credentials taken');
    }
    const newUser = await this.prisma.user.create({
      data: {
        email: signUpDto.email,
        password: hash,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
      },
    });
    delete newUser.password;
    return newUser;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email does not exist!');
    }
    const pwMatches = await argon.verify(user.password, signInDto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Password is incorrect!');
    }
    delete user.password;
    return {
      ...user,
      token: await this.signToken(user.id, user.email),
    };
  }

  signToken(userId: number, email: string) {
    const payload = { sub: userId, email: email };
    return this.jwt.signAsync(payload, {
      expiresIn: '5h',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}

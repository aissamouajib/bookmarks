import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    delete user.password;
    return user;
  }
}

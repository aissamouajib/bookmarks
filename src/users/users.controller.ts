import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }
}

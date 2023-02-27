import { Body, Controller, Post } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post('singout')
    signOut() {
        return this.authService.signOut();
    }
}
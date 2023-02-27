import { Body, Controller, Post } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos";
import { SignUpDto } from "./dtos/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @Post('signup')
    signOut(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }
}
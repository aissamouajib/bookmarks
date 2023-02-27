import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto } from "./dtos";
import * as argon from 'argon2'; 
import { SignUpDto } from "./dtos/signup.dto";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    async signUp(signUpDto: SignUpDto) {
        try {
            const hash = await  argon.hash(signUpDto.password);
            const user = await this.prisma.user.create({
                data: {
                    email: signUpDto.email,
                    password: hash
                },
            });
            delete user.password;
            return user;
        } catch (exception) {
            if(exception.code === 'P2002') {
                throw new ForbiddenException('Credentials taken!');
            }
            throw exception;
        }
    }

    async signIn(signInDto: SignInDto) {
        return {msg: 'Signed in'};
    }
}
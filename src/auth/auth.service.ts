import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignInDto } from "./dtos";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    signIn(singInDto: SignInDto) {
        return {msg: 'Signed in'};
    }

    signOut() {
        return {msg: 'Signed out'};
    }
}
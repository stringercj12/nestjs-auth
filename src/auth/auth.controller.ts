import { Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private readonly authService: AuthService) {
    }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    async authenticate(@Request() request: AuthRequest){

    }
}

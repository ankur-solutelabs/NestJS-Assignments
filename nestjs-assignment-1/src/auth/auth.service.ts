import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-crendentials.dto';
import { UserRepository } from './user.repository';
import {JwtService} from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUP(authCredentialDto:AuthCredentialDto): Promise<void>{
        return this.userRepository.signUp(authCredentialDto);
    }

    async singIn(authCredentialDto:AuthCredentialDto): Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        // console.log(username);
        if(!username){
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }
   
}

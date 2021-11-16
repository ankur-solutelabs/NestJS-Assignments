import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-crendentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async signUP(authCredentialDto:AuthCredentialDto): Promise<void>{
        return this.userRepository.signUp(authCredentialDto);
    }

    async singIn(authCredentialDto:AuthCredentialDto){
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        // console.log(username);
        if(!username){
            throw new UnauthorizedException('Invalid username or password');
        }
    }
   
}

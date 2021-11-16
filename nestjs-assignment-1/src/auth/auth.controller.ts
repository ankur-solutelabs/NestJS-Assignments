import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-crendentials.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

   @Post('/signup')
   signUp(@Body(ValidationPipe)authCredentialDto: AuthCredentialDto): Promise<void>{

    //console.log(authCredentialDto);
    return this.authService.signUP(authCredentialDto);
 
   }

   @Post('/signin')
   singIn(@Body(ValidationPipe)authCredentialDto: AuthCredentialDto): Promise<{accessToken:string}>{
       return this.authService.singIn(authCredentialDto)
   }
 
}

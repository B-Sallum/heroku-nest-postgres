import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Make Login',
  })
  login(@Body() data: CredentialsDto) {
    return this.service.login(data);
  }
}

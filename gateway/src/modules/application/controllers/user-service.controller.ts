import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { UserService } from '../services/user-service.service';

// @UseGuards(AuthGuard)
// @Controller('applications/cascade')
// @ApiTags('Cascade Apis')
@Controller('user')
@UseInterceptors(new TransformInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  @UseGuards(AuthGuard)
  getUser(@Param('username') username: string) {
    return this.userService.get(username);
  }

  //   @Post()
  //   @UsePipes(new ValidationPipe({transform: true, disableErrorMessages: false}))
  // 	async save(
  // 		@CurrentUser()
  // 		currentUser: {name: string | undefined; email: string; roles: string[]},
  // 		@Body() newCascade: CascadeDto,
  // 	): Promise<CascadeDto> {
  // 		const rs = await this.cascadeService.save(newCascade, currentUser)
  // 		return rs
  // 	}
}

import {
    Controller,
    Get,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { CommonService } from '../services/common-service.service';

// @UseGuards(AuthGuard)
// @Controller('applications/cascade')
// @ApiTags('Cascade Apis')
@Controller('common')
@UseInterceptors(new TransformInterceptor())
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('list-countries')
  @UseGuards(AuthGuard)
  getListCountries() {
    return this.commonService.getCountries();
  }
}

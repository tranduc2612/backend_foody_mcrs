import { Controller } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { TCP_MESSAGES } from 'lib';
import { SeasonService } from '../services/season.service';

@Controller()
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_SEASON },
    Transport.TCP,
  )
  getListCountries() {
    return this.seasonService.gets();
  }
}

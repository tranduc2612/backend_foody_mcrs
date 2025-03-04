import { Controller } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';
import { TCP_MESSAGES } from 'lib';
import { CountryService } from '../services/country.service';

@Controller()
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @MessagePattern(
    { cmd: TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_COUNTRY },
    Transport.TCP,
  )
  getListCountries() {
    return this.countryService.gets();
  }
}

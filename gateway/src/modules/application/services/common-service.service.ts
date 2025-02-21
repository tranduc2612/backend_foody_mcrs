import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Country, Season, TCP_MESSAGES, TCP_SERVICES_KEYS, UserDTO } from 'lib';
import { transformRequest } from 'src/utils/request.helper';

@Injectable()
export class CommonService {
  constructor(
    @Inject(TCP_SERVICES_KEYS.RECIPES_SERVICE_KEY) private client: ClientProxy,
  ) {}

  async getCountries() {
    return transformRequest<Country>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_COUNTRY,
      {
      },
    );
  }

  async getSeasons() {
    return transformRequest<Season>(
      this.client,
      TCP_MESSAGES.RECIPES_SERVICE.GET_LIST_SEASON,
      {
      },
    );
  }

  // save(
  // 	newCascade: CascadeDto,
  // 	currentUser: {name: string | undefined; email: string; roles: string[]},
  // ): Promise<CascadeDto> {
  // 	return transformRequest<CascadeDto>(
  // 		this.clientProxy,
  // 		TCP_MESSAGES.CASCADE.CREATE,
  // 		{applicationDto: newCascade, user: currentUser},
  // 	)
  // }
}

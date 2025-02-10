import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'lib';
import { Repository } from 'typeorm';

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private readonly respository: Repository<Season>
  ) {}

  async gets(): Promise<any> {
    const seasons = await this.respository.find();

    return seasons;

  }
}

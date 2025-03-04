import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'lib';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly respository: Repository<Country>
  ) {}

  async gets(): Promise<any> {
    const countries = await this.respository.find();

    return countries;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcels } from './entities/parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcels)
    private parcelsRepository: Repository<Parcels>,
  ) {}

  async create(createParcelDto: CreateParcelDto): Promise<Parcels> {
    // Calculate price
    const totalPrice = this.calculatePrice(
      createParcelDto.weight,
      createParcelDto.dimensions,
      createParcelDto.serviceType,
      createParcelDto.destinationCountry,
      createParcelDto.parcelType,
      createParcelDto.insured,
    );

    const parcel = this.parcelsRepository.create({
      ...createParcelDto,
      totalPrice,
    });

    return this.parcelsRepository.save(parcel);
  }

  async findAll(): Promise<Parcels[]> {
    return this.parcelsRepository.find();
  }

  calculatePrice(
    weight: number,
    dimensions: string,
    serviceType: string,
    destinationCountry: string,
    parcelType: string,
    insured: boolean,
  ): number {
    const PRICE_RATES = {
      serviceRates: {
        Express: 4500,
        Standard: 3000,
        Economy: 2100,
        Priority: 6000,
        International: 7500,
      },
      countryMultipliers: {
        'Sri Lanka': 1.0,
        India: 1.2,
        USA: 1.8,
        UK: 1.7,
        Australia: 1.6,
        Japan: 1.5,
        Germany: 1.5,
        Canada: 1.6,
        UAE: 1.4,
        Singapore: 1.3,
      },
      insuranceRate: 0.05,
      volumetricFactor: 5000,
      minimumCharge: 500,
    };

    const [length, width, height] = dimensions.split('x').map(Number);
    const volume = length * width * height;
    const volumetricWeight = volume / PRICE_RATES.volumetricFactor;
    const chargeableWeight = Math.max(weight, volumetricWeight);

    const baseRate = PRICE_RATES.serviceRates[serviceType] || 3000;
    const countryMultiplier = PRICE_RATES.countryMultipliers[destinationCountry] || 1.2;

    let basePrice = chargeableWeight * baseRate * countryMultiplier;

    let parcelTypeAdjustment = 1;
    if (parcelType === 'PostOffice') parcelTypeAdjustment = 0.9;
    if (parcelType === 'Company') parcelTypeAdjustment = 0.8;

    basePrice *= parcelTypeAdjustment;

    const insuranceCost = insured ? basePrice * PRICE_RATES.insuranceRate : 0;
    return Math.max(basePrice + insuranceCost, PRICE_RATES.minimumCharge);
  }
}

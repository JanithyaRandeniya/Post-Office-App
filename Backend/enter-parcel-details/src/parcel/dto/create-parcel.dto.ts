import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ParcelType, ServiceType } from '../entities/parcel.entity';

export class CreateParcelDto {
  @IsEnum(ParcelType)
  parcelType: ParcelType;

  @IsString()
  senderAddress: string;

  @IsString()
  receiverAddress: string;

  @IsNumber()
  @Type(() => Number)
  weight: number;

  @IsString()
  dimensions: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsString()
  destinationCountry: string;

  @IsBoolean()
  insured: boolean;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNumber()
  @Type(() => Number)
  totalPrice: number;
}

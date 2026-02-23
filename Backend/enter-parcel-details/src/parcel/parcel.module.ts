import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelsController } from './parcel.controller';
import { ParcelsService } from './parcel.service';
import { Parcels } from './entities/parcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcels])],
  controllers: [ParcelsController],
  providers: [ParcelsService],
})
export class ParcelsModule {}

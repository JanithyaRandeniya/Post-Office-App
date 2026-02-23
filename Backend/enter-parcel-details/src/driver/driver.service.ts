import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  // Create a new driver
  create(dto: CreateDriverDto) {
    const driver = this.driverRepository.create({
      driverName: dto.driverName,
      driverPhone: dto.driverPhone,
      nicNumber: dto.nicNumber,
      vehicleNumber: dto.vehicleNumber,
      vehicleType: dto.vehicleType,
    });
    return this.driverRepository.save(driver);
  }

  // Get all drivers
  findAll() {
    return this.driverRepository.find();
  }

  // Find driver by ID
  findOne(id: number) {
    return this.driverRepository.findOne({ where: { id: id } });
  }

  // Update driver
  async update(id: number, dto: Partial<CreateDriverDto>) {
    await this.driverRepository.update(id, dto as any); // TypeORM typing fix
    return this.findOne(id);
  }

  // Delete driver
  delete(id: number) {
    return this.driverRepository.delete(id);
  }
}

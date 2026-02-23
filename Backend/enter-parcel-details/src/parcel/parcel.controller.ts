import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParcelsService } from './parcel.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { multerConfig } from '../config/multer.config';

@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createParcel(
    @Body() createParcelDto: CreateParcelDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      if (file) {
        createParcelDto.imageUrl = `/uploads/${file.filename}`;
      }
      const parcel = await this.parcelsService.create(createParcelDto);
      return {
        success: true,
        message: 'Parcel created successfully',
        data: parcel,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllParcels() {
    return this.parcelsService.findAll();
  }
}

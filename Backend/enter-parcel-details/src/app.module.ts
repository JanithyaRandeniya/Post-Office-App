import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelsModule } from './parcel/parcel.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'parcel_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ParcelsModule,
    DriverModule,
  ],
})
export class AppModule {}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'drivers' })
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  driverName: string;

  @Column()
  driverPhone: string;

  @Column()
  nicNumber: string;

  @Column()
  vehicleNumber: string;

  @Column()
  vehicleType: string;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ParcelType {
  Private = 'Private',
  PostOffice = 'PostOffice',
  Company = 'Company',
}

export enum ServiceType {
  Express = 'Express',
  Standard = 'Standard',
  Economy = 'Economy',
  Priority = 'Priority',
  International = 'International',
}

@Entity('parcels')
export class Parcels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ParcelType })
  parcelType: ParcelType;

  @Column()
  senderAddress: string;

  @Column()
  receiverAddress: string;

  @Column('float')
  weight: number;

  @Column()
  dimensions: string;

  @Column({ type: 'enum', enum: ServiceType })
  serviceType: ServiceType;

  @Column()
  destinationCountry: string;

  @Column()
  insured: boolean;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column('float')
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flights {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flight_number: string;

  @Column()
  origin: string;

  @Column()
  destiny: string;

  @Column({ type: 'date' })
  departure_date: Date;

  @Column({ type: 'date' })
  arrival_date: Date;

  @Column({ type: 'time' })
  departure_hour: string;

  @Column({ type: 'time' })
  arrival_hour: string;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @Column()
  total_capacity: number;

  @Column()
  available_seats: number;

  @Column()
  aircraft_type: string;

  @Column()
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../users/user.entity';
import { Flights } from '../flights/flights.entity';

@Entity({ name: 'bookings' })
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reservation_code', type: 'varchar', length: 50 })
  reservationCode: string;

  @ManyToOne(() => Users, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Flights, (flight) => flight.id, { eager: true })
  @JoinColumn({ name: 'flight_id' })
  flight: Flights;

  @Column({ name: 'reservation_date', type: 'date' })
  reservationDate: string;

  @Column({ name: 'seat_quantity', type: 'int' })
  seatQuantity: number;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

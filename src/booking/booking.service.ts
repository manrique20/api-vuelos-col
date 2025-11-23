import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Bookings } from './booking.entity';
import { CreateReservationDto } from './dto/create-booking.dto';
import { Users } from '../users/user.entity';
import { Flights } from '../flights/flights.entity';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Bookings)
    private readonly reservationRepository: Repository<Bookings>,
  ) {}
  getAllBookings() {
    return this.reservationRepository.find();
  }
  async create(dto: CreateReservationDto) {
    const currentYear = new Date().getFullYear();

    const count = await this.reservationRepository.count();
    const number = String(count + 1).padStart(4, '0'); // 0001, 0002, etc.

    const generatedCode = `RES${currentYear}${number}`;

    const reservation = this.reservationRepository.create({
      reservationCode: generatedCode,
      reservationDate: dto.reservationDate,
      seatQuantity: dto.seatQuantity,
      totalPrice: dto.totalPrice,
      status: 'confirmed',
      user: dto.userId as any,
      flight: dto.flightId as any,
    });
    await this.reservationRepository.save(reservation);
    return {
      status: true,
      data: reservation,
      code: 100,
    };
  }
  async getAllReservationsByUser(userId: number) {
    const reservations = await this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['flight', 'user'],
    });
    return reservations;
  }
}

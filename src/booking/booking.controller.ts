import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Bookings } from './booking.entity';
import { CreateReservationDto } from './dto/create-booking.dto';
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Get()
  async getAllBookings() {
    return {
      status: true,
      data: await this.bookingService.getAllBookings(),
      code: 100,
    };
  }
  @Post('create')
  @Post()
  async createBooking(@Body() bookingData: CreateReservationDto) {
    const newBooking = await this.bookingService.create(bookingData);
    return {
      status: true,
      data: newBooking,
      message: 'Booking created successfully',
      code: 100,
    };
  }
  @Get('user/:id')
  async getBookingsByUser(@Param('id', ParseIntPipe) id: number) {
    const bookings = await this.bookingService.getAllReservationsByUser(id);
    return {
      status: true,
      data: bookings,
      code: 100,
    };
  }
}

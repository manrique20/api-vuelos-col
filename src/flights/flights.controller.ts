import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FilterFlightDto } from './dto/filter-flight.dto';
@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Get('get-all-flights')
  findAll() {
    return this.flightsService.getAllFlights();
  }

  @Post('search')
  async searchFlights(@Body() filterDto: FilterFlightDto) {
    return this.flightsService.getFilteredFlights(filterDto);
  }
}

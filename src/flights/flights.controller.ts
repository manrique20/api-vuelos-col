import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
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
  @Get('detail/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.flightsService.getFlightById(id);
  }
  @Patch('update-status/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.flightsService.changeFlightStatus(id, status);
  }
  @Post('create-flight')
  createFlight(@Body() flightData: any) {
    return this.flightsService.createFlight(flightData);
  }
}

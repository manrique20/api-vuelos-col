import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flights } from './flights.entity';
import { FilterFlightDto } from './dto/filter-flight.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flights) private flightsRepository: Repository<Flights>,
  ) {}

  async getAllFlights() {
    return {
      code: 100,
      status: true,
      data: await this.flightsRepository.find(),
    };
  }

  private airportCodeMap = {
    BOG: 'Bogotá',
    MDE: 'Medellín',
    MED: 'Medellín',
    CTG: 'Cartagena',
    CLO: 'Cali',
    BAQ: 'Barranquilla',
    BGA: 'Bucaramanga',
    PEI: 'Pereira',
    SMR: 'Santa Marta',
  };

  private cityToCodeMap = {
    Bogotá: 'BOG',
    Medellín: 'MDE',
    Cartagena: 'CTG',
    Cali: 'CLO',
    Barranquilla: 'BAQ',
    Bucaramanga: 'BGA',
    Pereira: 'PEI',
    'Santa Marta': 'SMR',
  };

  async getFilteredFlights(filterDto: FilterFlightDto) {
    const { origin, destination, departureDate, arrivalDate } = filterDto;

    const query = this.flightsRepository.createQueryBuilder('flight');

    if (origin) {
      const originCity = this.airportCodeMap[origin.toUpperCase()] || origin;
      query.andWhere('flight.origin = :originCity', { originCity });
    }

    if (destination) {
      const destinationCity =
        this.airportCodeMap[destination.toUpperCase()] || destination;
      query.andWhere('flight.destiny = :destinationCity', { destinationCity });
    }

    if (departureDate && arrivalDate) {
      query.andWhere('flight.departure_date BETWEEN :startDate AND :endDate', {
        startDate: departureDate,
        endDate: arrivalDate,
      });
    } else if (departureDate) {
      query.andWhere('flight.departure_date >= :startDate', {
        startDate: departureDate,
      });
    } else if (arrivalDate) {
      query.andWhere('flight.departure_date <= :endDate', {
        endDate: arrivalDate,
      });
    }

    query.andWhere('flight.available_seats > 0');
    query.andWhere('flight.status = :status', { status: 'scheduled' });

    query
      .orderBy('flight.departure_date', 'ASC')
      .addOrderBy('flight.departure_hour', 'ASC');

    const flights = await query.getMany();

    if (flights.length === 0) {
      throw new HttpException(
        {
          status: false,
          error:
            'No se encontraron vuelos disponibles con los criterios de búsqueda especificados',
          code: 404,
        },
        404,
      );
    }

    const flightsWithCodes = flights.map((flight) => ({
      ...flight,
      origin_code: this.cityToCodeMap[flight.origin] || 'N/A',
      destiny_code: this.cityToCodeMap[flight.destiny] || 'N/A',
    }));

    return {
      status: true,
      data: flightsWithCodes,
      code: 100,
    };
  }
  async getFlightById(flightId: number) {
    const flight = await this.flightsRepository.findOne({
      where: { id: flightId },
    });
    if (!flight) {
      return new HttpException(
        { status: false, error: 'Vuelo no encontrado', code: 404 },
        404,
      );
    }

    return {
      status: true,
      data: flight,
      code: 100,
    };
  }
}

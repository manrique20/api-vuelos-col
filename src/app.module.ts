import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { FlightsModule } from './flights/flights.module';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [UsersModule, FlightsModule, BookingModule, TypeOrmModule.forRoot({
    type: 'mysql',
    username: 'root',
    host: 'localhost',
    port: 3306,
    password:'',
    database: 'api_vuelos_col',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }), ],
  controllers: [],
  providers: [],
})
export class AppModule {}

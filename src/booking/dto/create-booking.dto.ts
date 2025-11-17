import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateReservationDto {

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  flightId: number;

  @IsDateString()
  @IsNotEmpty()
  reservationDate: string;

  @IsInt()
  @IsNotEmpty()
  seatQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

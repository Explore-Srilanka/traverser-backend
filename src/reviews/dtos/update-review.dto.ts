import { IsNotEmpty, IsString, IsNumber, IsEmail} from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  rating: Number;

  @IsString()
  @IsNotEmpty()
  place_id: string;
}

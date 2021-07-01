import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @ApiPropertyOptional()
  readonly id?: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly password?: string;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional()
  readonly fields?: { [key: string]: string };

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userType: number;
}

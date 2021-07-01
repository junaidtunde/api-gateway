import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { RoleDto } from './role.dto';
export class UserDto {
  @IsOptional()
  @ApiPropertyOptional()
  id?: string;

  @ApiProperty()
  readonly firstname: string;

  @ApiProperty()
  readonly lastname: string;

  @ApiProperty()
  readonly email: string;

  @ApiPropertyOptional()
  readonly fields?: { [key: string]: string | number };

  @IsOptional()
  @ApiPropertyOptional()
  active?: string;

  @IsOptional()
  @ApiPropertyOptional()
  createdAt?: string;

  @IsOptional()
  @ApiPropertyOptional()
  updatedAt?: string;

  @IsOptional()
  @ApiPropertyOptional()
  roles?: RoleDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '../../types';
import { UserDto } from './user.dto';

export class UserResponseDto extends ResponseDto {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: UserDto;
}

// tslint:disable-next-line: max-classes-per-file
export class UserArrayResponseDto extends ResponseDto {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: UserDto[];
}

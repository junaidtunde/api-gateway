import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiPropertyOptional()
  readonly id?: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly resourceId: string;
}

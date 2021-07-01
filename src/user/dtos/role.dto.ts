import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleDto {
  @ApiPropertyOptional()
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiPropertyOptional()
  readonly permissionIds?: any;
}

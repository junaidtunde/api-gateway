import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiPropertyOptional()
  readonly id?: string;

  @ApiProperty()
  readonly name: string;

  @ApiPropertyOptional()
  permissionIds: string[];
}

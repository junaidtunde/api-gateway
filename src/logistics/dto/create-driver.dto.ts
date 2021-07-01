import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDriverDTO {
  @ApiProperty()
  readonly fullName: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly vendorId: string;

  @ApiProperty()
  readonly nationalIdNumber: string;

  @ApiProperty()
  readonly nationIdExpiryDate: Date;

  @ApiProperty()
  readonly passportImage: string;
}

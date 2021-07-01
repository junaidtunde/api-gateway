import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface IPricingSettings {
  settings: [
    {
      destination: string;
      origin: string;
      price: string;
    },
  ];
}
export class CreateVendorDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly companyName: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly managerId: string;

  @ApiPropertyOptional()
  pricingSettings: IPricingSettings;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/aggregates/address/dto';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @ApiProperty({ example: 'Musterfeuerwache' })
  name!: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({ type: CreateAddressDto })
  address!: CreateAddressDto;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '3f1c2d4e-8a7b-4d9f-91c2-6e5b8f1a2d3c' })
  keycloakId!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: null })
  mpid?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Max Mustermann' })
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'max.mustermann@example.com' })
  email!: string;
}

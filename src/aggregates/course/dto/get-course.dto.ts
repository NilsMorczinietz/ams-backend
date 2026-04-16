import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'generated/prisma/client';

export class GetCourseDto {
  @ApiProperty({ example: 'f2a9d3b7-1c4e-48f2-9d8b-7e6a5c3b2f1a' })
  id: string;

  @ApiProperty({ example: 'Truppmann Modul 1' })
  name: string;

  @ApiProperty({ example: 'TM-M1' })
  abbreviation: string;

  constructor(course: Course) {
    this.id = course.id;
    this.name = course.name;
    this.abbreviation = course.abbreviation;
  }
}

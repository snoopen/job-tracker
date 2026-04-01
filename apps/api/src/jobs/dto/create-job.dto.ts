import {
  IsString,
  IsUrl,
  IsOptional,
  IsEnum,
  IsArray,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApplicationStatus } from '@job-tracker/types';

export class CreateJobDto {
  @IsString()
  company!: string;

  @IsString()
  role!: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  appliedAt?: Date;
}

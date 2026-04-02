import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FindJobsDto } from './dto/find-jobs.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    const userId = 'placeholder';
    return this.jobsService.create(createJobDto, userId);
  }

  @Get()
  findAll(@Query() findJobsDto: FindJobsDto) {
    const userId = 'placeholder';
    return this.jobsService.findAll(userId, findJobsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = 'placeholder';
    return this.jobsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const userId = 'placeholder';
    return this.jobsService.update(id, updateJobDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = 'placeholder';
    return this.jobsService.remove(id, userId);
  }
}

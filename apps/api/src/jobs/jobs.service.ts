import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './jobs.schema';
import { Model } from 'mongoose';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FindJobsDto } from './dto/find-jobs.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto, userId: string) {
    return this.jobModel.create({ ...createJobDto, userId });
  }

  async findAll(userId: string, { page, limit }: FindJobsDto) {
    const [data, total] = await Promise.all([
      this.jobModel
        .find({ userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.jobModel.countDocuments({ userId }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string, userId: string) {
    const job = await this.jobModel.findOne({ _id: id, userId }).exec();
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, userId: string) {
    const job = await this.jobModel
      .findOneAndUpdate({ _id: id, userId }, updateJobDto, { new: true })
      .exec();
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return job;
  }

  async remove(id: string, userId: string) {
    const job = await this.jobModel
      .findOneAndDelete({ _id: id, userId })
      .exec();
    if (!job) throw new NotFoundException(`Job ${id} not found`);
    return job;
  }
}

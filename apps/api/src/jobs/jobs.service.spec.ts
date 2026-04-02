import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { Job } from './jobs.schema';
import { NotFoundException } from '@nestjs/common';
import { ApplicationStatus } from '@job-tracker/types';

const mockUserId = 'user-1';
const mockJobId = '507f1f77bcf86cd799439011'; // valid ObjectId format

const mockJob = {
  _id: mockJobId,
  userId: mockUserId,
  company: 'Acme',
  role: 'Full Stack Developer',
  status: ApplicationStatus.Applied,
};

const mockJobModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn(),
  countDocuments: jest.fn(),
};

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getModelToken(Job.name),
          useValue: mockJobModel,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  describe('findAll', () => {
    it('returns paginated results for the given userId', async () => {
      const jobs = [mockJob, { ...mockJob, _id: 'other-id' }];
      mockJobModel.find.mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(jobs),
          }),
        }),
      });
      mockJobModel.countDocuments.mockResolvedValue(2);

      const result = await service.findAll(mockUserId, { page: 1, limit: 10 });

      expect(result.data).toEqual(jobs);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(mockJobModel.find).toHaveBeenCalledWith({ userId: mockUserId });
    });
  });

  describe('findOne', () => {
    it('returns the job when found', async () => {
      mockJobModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockJob),
      });

      const result = await service.findOne(mockJobId, mockUserId);

      expect(result).toEqual(mockJob);
      expect(mockJobModel.findOne).toHaveBeenCalledWith({
        _id: mockJobId,
        userId: mockUserId,
      });
    });

    it('throws NotFoundException when job not found', async () => {
      mockJobModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(mockJobId, mockUserId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('returns the updated job when found', async () => {
      const updatedJob = { ...mockJob, role: 'Senior Engineer' };
      mockJobModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedJob),
      });

      const result = await service.update(
        mockJobId,
        { role: 'Senior Engineer' },
        mockUserId,
      );

      expect(result).toEqual(updatedJob);
      expect(mockJobModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockJobId, userId: mockUserId },
        { role: 'Senior Engineer' },
        { new: true },
      );
    });

    it('throws NotFoundException when job not found', async () => {
      mockJobModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update(mockJobId, {}, mockUserId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('creates and returns a new job', async () => {
      const createDto = {
        company: mockJob.company,
        role: mockJob.role,
        status: mockJob.status,
      };
      mockJobModel.create.mockResolvedValue(mockJob);

      const result = await service.create(createDto, mockUserId);

      expect(result).toEqual(mockJob);
      expect(mockJobModel.create).toHaveBeenCalledWith({
        ...createDto,
        userId: mockUserId,
      });
    });
  });

  describe('remove', () => {
    it('returns the deleted job when found', async () => {
      mockJobModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockJob),
      });

      const result = await service.remove(mockJobId, mockUserId);

      expect(result).toEqual(mockJob);
      expect(mockJobModel.findOneAndDelete).toHaveBeenCalledWith({
        _id: mockJobId,
        userId: mockUserId,
      });
    });

    it('throws NotFoundException when job not found', async () => {
      mockJobModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove(mockJobId, mockUserId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  afterEach(() => jest.clearAllMocks());
});

import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { FindJobsDto } from './dto/find-jobs.dto';
import { UpdateJobDto } from './dto/update-job.dto';

const mockJobId = '507f1f77bcf86cd799439011'; // valid ObjectId format

const mockJobsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
};

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [{ provide: JobsService, useValue: mockJobsService }],
    }).compile();

    controller = module.get<JobsController>(JobsController);
  });

  describe('findAll', () => {
    it('calls service.findAll with userId and dto, returns result', async () => {
      const dto = { page: 1, limit: 10 } as FindJobsDto;
      const expected = {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      };
      mockJobsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(dto);

      expect(mockJobsService.findAll).toHaveBeenCalledWith('placeholder', dto);
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('calls service.findOne with id and userId, returns one result', async () => {
      const expected = { _id: mockJobId, company: 'Acme' };
      mockJobsService.findOne.mockResolvedValue(expected);

      const result = await controller.findOne(mockJobId);

      expect(mockJobsService.findOne).toHaveBeenCalledWith(
        mockJobId,
        'placeholder',
      );
      expect(result).toEqual(expected);
    });
  });

  describe('create', () => {
    it('calls service.create with dto and userId, returns one result', async () => {
      const dto = { company: 'Acme' } as CreateJobDto;
      const expected = { _id: mockJobId, company: 'Acme' };
      mockJobsService.create.mockResolvedValue(expected);

      const result = await controller.create(dto);

      expect(mockJobsService.create).toHaveBeenCalledWith(dto, 'placeholder');
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('calls service.remove with userId and id, returns one result', async () => {
      const expected = { _id: mockJobId, company: 'Acme' };
      mockJobsService.remove.mockResolvedValue(expected);

      const result = await controller.remove(mockJobId);

      expect(mockJobsService.remove).toHaveBeenCalledWith(
        mockJobId,
        'placeholder',
      );
      expect(result).toEqual(expected);
    });
  });

  describe('update', () => {
    it('calls service.update with dto and userId, returns one result', async () => {
      const dto = { company: 'Acme' } as UpdateJobDto;
      const expected = { _id: mockJobId, company: 'Acme' };
      mockJobsService.update.mockResolvedValue(expected);

      const result = await controller.update(mockJobId, dto);

      expect(mockJobsService.update).toHaveBeenCalledWith(
        mockJobId,
        dto,
        'placeholder',
      );
      expect(result).toEqual(expected);
    });
  });

  afterEach(() => jest.clearAllMocks());
});

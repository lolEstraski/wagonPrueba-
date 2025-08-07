import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './../dto/create_task.dto';
import { UpdateTaskDto } from './../dto/update_task.dto';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('TasksService', () => {
  let service: TasksService;
  let repository: MockRepository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<MockRepository<Task>>(getRepositoryToken(Task));
  });

  describe('findAll', () => {
    it('should return empty array when no tasks exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });

    it('should return all tasks ordered by creation date', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', isCompleted: false },
        { id: '2', title: 'Task 2', isCompleted: true },
      ];
      repository.find.mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
      expect(repository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });

    it('should throw error when database fails', async () => {
      repository.find.mockRejectedValue(new Error('Database error'));

      await expect(service.findAll()).rejects.toThrow('Database error');
    });
  });

  describe('create', () => {
    it('should create and return a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const mockTask = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.create.mockReturnValue(mockTask);
      repository.save.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto);

      expect(repository.create).toHaveBeenCalledWith(createTaskDto);
      expect(repository.save).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTask);
    });

    it('should set default values correctly', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
      };

      const mockTask = {
        id: '1',
        title: 'Test Task',
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.create.mockReturnValue(mockTask);
      repository.save.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto);

      expect(result.isCompleted).toBe(false);
      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('findOne', () => {
    it('should return a task when found', async () => {
      const mockTask = { id: '1', title: 'Task 1' };
      repository.findOne.mockResolvedValue(mockTask);

      const result = await service.findOne('1');

      expect(result).toEqual(mockTask);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when task not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        isCompleted: true,
      };

      const existingTask = {
        id: '1',
        title: 'Original Task',
        isCompleted: false,
      };

      const updatedTask = {
        ...existingTask,
        ...updateTaskDto,
      };

      repository.findOne.mockResolvedValue(existingTask);
      repository.save.mockResolvedValue(updatedTask);

      const result = await service.update('1', updateTaskDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingTask,
        ...updateTaskDto,
      });
      expect(result).toEqual(updatedTask);
    });

    it('should throw NotFoundException when task not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update('999', { title: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the task successfully', async () => {
      const mockTask = { id: '1', title: 'Task to delete' };
      repository.findOne.mockResolvedValue(mockTask);
      repository.remove.mockResolvedValue(mockTask);

      await service.remove('1');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.remove).toHaveBeenCalledWith(mockTask);
    });

    it('should throw NotFoundException when task not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
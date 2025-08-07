import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';  
import { CreateTaskDto } from '../dto/create_task.dto';
import { UpdateTaskDto } from '../dto/update_task.dto';

const mockTasksService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('TasksController', () => {
  let controller: TasksController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useFactory: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('findAll', () => {
    it('should return empty array when no tasks exist', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return all tasks', async () => {
      const mockTasks = [
        { id: '1', title: 'Task 1', isCompleted: false },
        { id: '2', title: 'Task 2', isCompleted: true },
      ];
      service.findAll.mockResolvedValue(mockTasks);

      const result = await controller.findAll();

      expect(result).toEqual(mockTasks);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task when found', async () => {
      const mockTask = { id: '1', title: 'Task 1' };
      service.findOne.mockResolvedValue(mockTask);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockTask);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when task not found', async () => {
      service.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Description',
      };

      const mockTask = {
        id: '1',
        ...createTaskDto,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.create.mockResolvedValue(mockTask);

      const result = await controller.create(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('update', () => {
    it('should update and return task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        isCompleted: true,
      };

      const mockUpdatedTask = {
        id: '1',
        title: 'Updated Task',
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.update.mockResolvedValue(mockUpdatedTask);

      const result = await controller.update('1', updateTaskDto);

      expect(result).toEqual(mockUpdatedTask);
      expect(service.update).toHaveBeenCalledWith('1', updateTaskDto);
    });

    it('should throw NotFoundException when task not found', async () => {
      service.update.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update('999', { title: 'Updated' })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove task successfully', async () => {
      service.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when task not found', async () => {
      service.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});

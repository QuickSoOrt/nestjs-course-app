import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status-dto";
import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTasksFilteredDto } from "./dto/get-tasks-filtered.dto";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService
{
	constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository)
	{

	}

	public async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task>
	{
		const { title, description } = createTaskDto;

		const newTask = this.tasksRepository.create
		({
			title,
			description,
			status: TaskStatus.OPEN,
			user
		});

		await this.tasksRepository.save(newTask);

		return newTask;
	}

	public async getTaskById(user: User, id: string): Promise<Task>
	{
		const task = await this.tasksRepository.findOne({where: {user, id}});

		if (task == null)
		{
			throw new NotFoundException();
		}

		return task;
	}

	public async deleteTask(user: User, id: string): Promise<void>
	{
		const result = await this.tasksRepository.delete({user, id});

		if (result.affected === 0)
		{
			throw new NotFoundException();
		}
	}

	public async updateTaskStatus(user: User, id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task>
	{
		const { status } = updateTaskStatusDto;

		const task = await this.tasksRepository.findOne({where: {user, id}});

		if (task == null)
		{
			throw new NotFoundException();
		}

		task.status = status;

		await this.tasksRepository.save(task);

		return task;
	}

	public async getTasks(user, getTasksFilteredDto: GetTasksFilteredDto) : Promise<Task[]>
	{
		const { status, search } = getTasksFilteredDto;

		return await this.tasksRepository.getTasks(user, status, search);
	}
}

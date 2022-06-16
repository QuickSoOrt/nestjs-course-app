import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilteredDto } from "./dto/get-tasks-filtered.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status-dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../auth/user.entity";
import { Logger } from "@nestjs/common";

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController
{
	private logger = new Logger("TasksController");

	private tasksService: TasksService;

	constructor(tasksService : TasksService)
	{
		this.tasksService = tasksService;
	}

	@Post()
	public createTask(@GetUser() user: User, @Body() createTaskDto: CreateTaskDto): Promise<Task>
	{
		return this.tasksService.createTask(user, createTaskDto);
	}

	@Post('/:id')
	public deleteTask(@GetUser() user: User, @Param('id') taskId: string): Promise<void>
	{
		return this.tasksService.deleteTask(user, taskId);
	}

	@Get('/:id')
	public getTaskById(@GetUser() user: User, @Param('id') taskId: string): Promise<Task>
	{
		this.logger.verbose(`User ${user.username} retrieving task ${taskId}`);

		return this.tasksService.getTaskById(user, taskId);
	}

	@Patch('/:id/status')
	public updateTaskStatus(@GetUser() user: User, @Param('id') taskId: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task>
	{
		return this.tasksService.updateTaskStatus(user, taskId, updateTaskStatusDto);
	}

	@Get()
	public getTasks(@GetUser() user: User, @Query() getTasksFilteredDto: GetTasksFilteredDto): Promise<Task[]>
	{
		return this.tasksService.getTasks(user, getTasksFilteredDto);
	}
}

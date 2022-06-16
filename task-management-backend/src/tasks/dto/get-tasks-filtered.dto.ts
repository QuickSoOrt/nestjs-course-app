import { TaskStatus } from "../task-status.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetTasksFilteredDto {
	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@IsOptional()
	@IsString()
	search?: string;
}
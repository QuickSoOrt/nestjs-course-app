import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>
{
	public async getTasks(user, status, search): Promise<Task[]>
	{
		const query = this.createQueryBuilder('task');

		if (user) {
			query.where(user);
		}

		if (status) {
			query.andWhere('task.status = :status', { status });
		}

		if (search) {
			query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', {search: `%${search}%`});
		}

		return await query.getMany();;
	}
}
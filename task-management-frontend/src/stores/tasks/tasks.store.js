import { observable, action } from 'mobx';

export default class TasksStore
{
    @observable tasks = [];

    @observable filters = { status: '', search: '' };

    constructor()
    {

    }

    updateFilters({ status, search })
    {
        this.filters.status = status;
        this.filters.search = search;
    }

    @action
    resetTasks()
    {
        this.tasks = [];
    }

    @action
    async fetchTasks()
    {

    }

    @action
    async createTask(title, description)
    {

    }

    @action
    async deleteTask(id)
    {

    }

    @action
    async updateTaskStatus(id, status) {
    }
}
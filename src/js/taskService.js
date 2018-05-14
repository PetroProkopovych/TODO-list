import { HttpClient } from './httpClient.js';

export class TaskService {
    constructor() {
        this.httpClient = new HttpClient();

        // endpoints for different actions
        this.endpoints = {
            save: 'todos.json',
            remove: 'todos/${key}.json',
            put: 'todos/${key}/done.json',
            get: 'todos.json'
        };
    }

    saveTask(description) {
        /*
         * save task
         * @param {string} description - description of the task
         */
        const data = {
            description: description,
            date: new Date(),
            done: false
        };
        return this.httpClient.post(data, this.endpoints.save);
    }

    removeTask(key) {
        /*
         * remove task
         * @param {string} key - unique task identifier
         */
        return this.httpClient.remove(this.endpoints.remove.replace('${key}', key));
    }

    updateTaskStatus(key, status) {
        /*
         * update task status
         * @param {string} key - unique task identifier
         * @param {boolean} status - true: if task is done, false: if isn't
         */
        return this.httpClient.put(status, this.endpoints.put.replace('${key}', key));
    }

    fetchTasks() {
        /*
         * fetch stored tasks
         */
        return this.httpClient.get(this.endpoints.get);
    }
}
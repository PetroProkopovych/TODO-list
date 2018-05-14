import { isToday } from './utils.js';

require("jquery");
require("jquery-ui/ui/widgets/sortable");

export class UiClient {

    constructor(service) {
        this.modal = document.getElementById('new-task-modal');
        this.allTaskList = document.getElementsByClassName('task-list')[0];
        this.todayTaskList = document.getElementsByClassName('task-list')[1];
        this.service = service;
    }

    init() {
        /*
         * initialize ui part
         */

        // add all needed event listeners
        document.getElementById('close-modal').addEventListener('click', () => {
            this.toggleModal();
        });
        document.getElementById('add-task').addEventListener('click', () => {
            this.toggleModal();
        });
        document.getElementById('new-task-from').addEventListener('submit', (e) => {
            this.onFormSubmit(e);
        });

        // initialize jQuery UI sortable plugin
        this.initSortable();

        // fetch today tasks
        this.service.fetchTasks().then(data => {
            for (const k in data) {
                if (isToday(data[k].date)) {
                    UiClient.renderTask(data[k].description, this.todayTaskList, k, data[k].done);
                }
            }
        });

        // initialize task status checkbox change event listener
        this.initCheckboxEventListener();
    }

    initSortable() {
        /*
         * initialize jQuery UI sortable plugin
         */
        $(".task-list").sortable({
            connectWith: ".task-list",
            items: "> li",
            cancel: "li.done",
            receive: (event, ui) => {
                const task = $(ui.item);
                const taskList = $(event.target);

                //check which list task has been added to
                if (UiClient.isParentExists(taskList, '.today')) {

                    // check length of today tasks list (5 task max)
                    if (taskList.children().length > 5) {
                        $(ui.sender).sortable('cancel');
                    } else {
                        this.service.saveTask(task.find('p').text()).then(data => {
                            task.attr('key', data.name);
                        }).catch(err => {
                            $(ui.sender).sortable('cancel');
                            console.log(err);
                        });
                    }
                } else if (taskList.parents('.all').length) {
                    this.service.removeTask(task.attr('key')).catch(err => {
                        $(ui.sender).sortable('cancel');
                        console.log(err);
                    });
                }
            }
        });
    }

    onFormSubmit(e) {
        /*
         * submit new task form
         * @param {Event} e - html event object
         */
        e.preventDefault();
        UiClient.renderTask(e.target.description.value, this.allTaskList, '');
        e.target.description.value = '';
        this.toggleModal();
    }

    toggleModal() {
        /*
         * toggle modal popup
         */
        this.modal.classList.toggle('open');
    }

    initCheckboxEventListener() {
        /*
         * initialize task status checkbox change event listener
         */
        this.todayTaskList.addEventListener('change', (e) => {
            if (e.target && e.target.matches('input[type=checkbox]')) {
                const task = e.target.closest('.task');
                task.classList.toggle('done');
                this.service.updateTaskStatus(task.getAttribute('key'), e.target.checked).catch(err => {
                    e.target.checked = false;
                });
            }
        });
    }

    static renderTask(taskDescription, taskList, key, isDone = false) {
        /*
         * render task element on ui
         * @param {string} taskDescription - description of the task
         * @param {HTMLUListElement} taskList - list of tasks where task to be added
         * @param {string} key - unique task identifier
         * @param {boolean} isDone - is task checked as done
         */
        const task = document.createElement('li');
        task.classList.add('task', 'ui-sortable-handle');
        if (isDone) task.classList.add('done');
        task.setAttribute('key', key);
        task.innerHTML = `<label class="checkbox-container">
                        <input type="checkbox" ${isDone ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <p>${taskDescription}</p>`;
        taskList.appendChild(task);
    }

    static isParentExists(child, parentSelector) {
        /*
         * check if element has parent with specified selector
         * @param {HTMLElement} child - child element
         * @param {string} parentSelector - css selector of parent
         */
        return child.parents(parentSelector).length;
    }
}

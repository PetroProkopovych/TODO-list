import { TaskService } from './taskService';
import { UiClient } from './uiClient';

const taskService = new TaskService();
const uiClient = new UiClient(taskService);

// initialize app
uiClient.init();


















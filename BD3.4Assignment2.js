let express = require('express');
let app = express();
let port = 3000;

let cors = require('cors');

app.use(cors());

//sample data
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];
//Endpoint 1. Add a Task to the Task List

function addNewTask(tasks, taskId, text, priority) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId != taskId) {
      tasks.push({ taskId: taskId, text: text, priority: priority });
    }
  }
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addNewTask(tasks, taskId, taskId, priority);
  res.json(result);
});
//Endpoint 2. Read All Tasks in the Task List
function taskeList(tasks) {
  return tasks;
}
app.get('/tasks', (req, res) => {
  let result = taskeList(tasks);
  res.json(result);
});
//Endpoint 3. Sort Tasks by Priority
function sortTaskByPriority(tasks) {}
app.get('tasks/sort-by-priority', (req, res) => {
  let sortedTasks = tasks.slice();
  sortedTasks.sort(sortTaskByPriority);
  res.json(sortedTasks);
});
//Endpoint 4. Edit Task Priority
function editTaskPriority(tasks, taskId, priority) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-proority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(tasks, taskId, priority);
  res.json({ result: result });
});

//Endpoint 5. Edit/Update Task Text
function editTaskText(tasks, taskId, text) {
  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTaskText(tasks, taskId, text);
  res.json({ result: result });
});
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});

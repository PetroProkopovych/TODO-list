# TODO-list
Simple javascript TODO list app

## How to install
Go to app root directory and run:

 `npm install`
 
`npx webpack --config webpack.config.js`

## How to use
User can create tasks, then move them to 'today' list (not more than 5). When user moves task to 'today' list, task is saved in database (Firebase). When user moves task back to 'all tasks' list, task is removed from database. User can mark/unmark task as done, status also updates in database. Completed task can't be moved back to 'all tasks' list.

## License
This project is licensed under the terms of the MIT license.

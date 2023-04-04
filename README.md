# ToDo List Web Application

This is a simple ToDo List web application that allows users to create and manage their daily tasks. Users can also create custom lists by visiting a specific URL.

Made to practice web development with Mongoose, Node, and MongoDB.

## CHECK OUT LIVE SITE
You can check out the live site [HERE](https://benny-beaver-todo.herokuapp.com/).
Hosted using Heroku and MongoDB Atlas

## Features

- Add tasks to the list
- Delete tasks from the list
- Create custom lists by visiting a unique URL
- Responsive design for desktop and mobile devices

## Technologies Used

- Node.js
- Express.js
- EJS
- MongoDB with Mongoose
- Lodash
- Body-parser

## Installation

Before you start, make sure you have [Node.js](https://nodejs.org/en/) installed.

1. Clone the repository:

2. Navigate to the project directory:
```
cd todolist
```

3. Install the required dependencies:
```
npm install
```

4. Start the server:
```
node app.js
```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application in action.

## Usage

- To add a new task, enter the task name in the input field and click the "+" button or press Enter.
- To delete a task, click the checkbox next to the task.
- To create a custom list, visit [http://localhost:3000/your-list-name](http://localhost:3000/your-list-name), replacing `your-list-name` with the desired name for the list.

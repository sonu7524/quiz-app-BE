# Quiz Backend Application:

This assignment aims to assess your backend development skills using Node.js, Express.js, and MongoDB. You will be building a RESTful API for a quiz application that allows users to create and participate in timed quizzes.

## Functionalities:

### Create a Quiz:

- Users can create quizzes by sending a POST request to /quizzes endpoint.
- Required fields in the request body:
    - question: The text of the question.
    - options: An array of strings representing answer options.
    - rightAnswer: The index of the correct answer in the options array (starting from 0).
    - startDate: The date and time (ISO format) when the quiz should start.
    - endDate: The date and time (ISO format) when the quiz should end.

### Get Active Quiz:

- Users can retrieve the currently active quiz (within the start and end time) by sending a GET request to /quizzes/active.
- The response should include the quiz data, including current status.

### Get Quiz Result:

- After 5 minutes of the quiz's end time, users can retrieve the quiz result by sending a GET request to /quizzes/:id/result, where :id is the quiz's unique identifier.
- The response should include the correct answer and additional information if needed.

### Get All Quizzes:

- Users can retrieve all quizzes (including inactive and finished) by sending a GET request to /quizzes/all.
- The response should include a list of quiz objects with relevant information.


## Technical Requirements:

- Backend:
- Node.js (version 16 or later)
- Express.js
- Mongoose (for MongoDB interaction)
- Cron Job (for automating status updates)

## How to setup and run ?
1. Clone the repo in local machine by applying-
```
git clone https://github.com/sonu7524/quiz-app-BE.git
```
2. Install necessary dependencies
```
npm install
```
3. Create .env file and define env variables
```
MONGODB_URI="mongodb-uri"
PORT=5000
JWT_SECRET="my-secret"
JWT_EXPIRES_IN="90d"
```
4. Run the server.
```
npm install
```
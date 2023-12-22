

const express = require('express');
const Quiz = require('../models/Quiz');
const quizRouter = express.Router();
const authorization = require('../middleware/authorization');

quizRouter.post('/quizzes',authorization, async (req, res) => {
    const { questions, startDate, endDate } = req.body;
    try{
        const newQuiz = new Quiz({
            questions,
            startDate,
            endDate,
          });
        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quizDetails: newQuiz });
    }
    catch(err){
        res.status(500).json({ error: 'Error creating quiz' });
    }
});
  
quizRouter.get('/quizzes/active', authorization, async (req, res) => {
    try{
      const quizzes = await Quiz.find(
        {status: 'Active' }
      );
      res.json({ quizzes });
    }
    catch(err){
        res.status(500).json({ error: 'Internal server error' });
    }
});

quizRouter.get('/quizzes/:id/result', authorization, async (req, res) => {
    const quizId = req.params.id;
    const resultDisplayTime = new Date();
    const currentTime = new Date();
    resultDisplayTime.setMinutes(fiveMinutesAgo.getMinutes() + 5);
    try{
        const quiz = await Quiz.findById(quizId);
        if(currentTime < resultDisplayTime) {
        return res.status(400).json({ error: 'Result display time has not started yet' });
        }
        if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json({ 
            quizId: quiz._id,
            result: quiz.getResultArray()
         });
    }
    catch(err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

quizRouter.get('/quizzes/all', authorization, async (req, res) => {
      try{
        const quizzes = await Quiz.find();
        res.json({ quizzes });
      }
      catch(err){
          res.status(500).json({ error: 'Internal server error' });
      }
});

quizRouter.put('/quizzes/:id',authorization, async (req, res) => {
    const quizId = req.params.id;
    const { questions, startDate, endDate, status } = req.body;
    try{
        const quiz = await Quiz.findByIdAndUpdate(quizId,{
            questions,
            startDate,
            endDate,
            status
        });
        res.json({ message: 'Quiz updated successfully', quizDetails: quiz });
    }
    catch(err){
        res.status(500).json({ error: 'Error updating quiz' });
    }
})

module.exports = quizRouter;
  
  
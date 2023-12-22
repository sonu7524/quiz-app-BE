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
    const now = new Date();
    await Quiz.findOne(
      { startDate: { $lte: now }, endDate: { $gte: now }, status: 'Active' },
      (err, quiz) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching active quiz' });
        }
        if (!quiz) {
          return res.status(404).json({ message: 'No active quiz at the moment' });
        }
        res.json({ quiz });
      }
    );
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

quizRouter.get('/quizzes/all', authorization, (req, res) => {
    Quiz.find({}, (err, quizzes) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching quizzes' });
      }
      res.json({ quizzes });
    });
});

module.exports = quizRouter;
  
  
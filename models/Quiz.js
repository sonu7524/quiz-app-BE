const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
      type: [
        {
          question: String,
          options: [String],
          rightAnswer: Number,
        },
      ],
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: 'Active',
    },
});

quizSchema.methods.getResultArray = function () {
    const resultArray = this.questions.map((question) => {
        const answer = question.options[question.rightAnswer];
        return {
            question: question.question,
            answer: answer,
        };
    });
    return resultArray;
};

module.exports = mongoose.model('Quiz', quizSchema);
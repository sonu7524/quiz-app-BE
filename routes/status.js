const cron = require('node-cron');
const Quiz = require('../models/Quiz');


cron.schedule('0 * * * *', async () => {
    const now = new Date();
    try{
        await Quiz.updateMany(
            { endDate: { $lt: now } },
            { $set: { status: 'Finished' } },
            (err, result) => {
              if (err) {
                console.error('Error updating quiz status:', err);
              }
            }
          );
    }
    catch(err){
        console.error('Error updating quiz status:', err);
    }
});

module.exports = cron;
const cron = require('node-cron');
const Quiz = require('../models/Quiz');


cron.schedule('0 * * * *', async () => { // Runs every hour at the 0th minute
    const now = new Date();
    console.log('Current date/time:', now);

    try {
        await Quiz.updateMany(
            {
                endDate: { $lt: now.getDate() },
                status: 'Active'
            },
            { $set: { status: 'Finished' } }
        );
    } catch (err) {
        console.error('Error updating quiz status:', err);
    }
});

module.exports = cron;
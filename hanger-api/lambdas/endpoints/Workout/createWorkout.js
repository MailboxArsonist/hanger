const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');
const { v4: uuidv4 } = require('uuid');


const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.body) {
        // failed without aany data to persist
        return Responses._400({ message: 'missing the request body' });
    }
    
    const { ID, name, intervals, intervalTime, restTime } = JSON.parse(event.body);

    // add validation for other fields too (probably put into a hook)
    if(!ID) {
        return Responses._400({ message: 'You need to provide a valid user ID' });
    }

    const user = await Dynamo.get({
        ID, 
        SK: 'profile'
    }, tableName)
    .catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if(!user) {
        return Responses._404({ message: 'Could not find a user' });
    }
    const SK = `workout_${uuidv4()}`;

    const totalTime = (intervals * intervalTime) + ( restTime * intervals);

    const params = {
        ID,
        SK,
        intervals,
        intervalTime,
        name,
        restTime,
        totalTime
    }

    const workout = await Dynamo.write(params, tableName).catch(err => {
        console.log('Error creating the user', err);
        return null;
    })

    if (!workout) {
        return Responses._400({ message: 'Failed to create new workout' });
    }

    return Responses._200({ workout });
};
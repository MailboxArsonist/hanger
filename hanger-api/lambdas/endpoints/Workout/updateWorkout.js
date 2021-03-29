const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');
const { v4: uuidv4 } = require('uuid');


const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.body) {
        // failed without aany data to persist
        return Responses._400({ message: 'missing the request body' });
    }
    
    const workout = JSON.parse(event.body);
    const {SK, ID} = workout;

    if(!ID || !SK) {
        return Responses._400({ message: 'You need to provide a valid user ID or WorkoutID' });
    }

    const user = await Dynamo.get({
        ID: workout.ID, 
        SK: 'profile'
    }, tableName)
    .catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if(!user) {
        return Responses._404({ message: 'Could not find a user' });
    }

    const params = {};

    params.name = workout.name;
    params.intervals = workout.intervals;

    const updatedWorkout = await Dynamo.update({ SK, ID }, tableName, params).catch(err => {
        console.log('Error updating the workout', err);
        return null;
    })

    if (!updatedWorkout) {
        return Responses._400({ message: 'Failed to update workout', updatedWorkout, SK, ID, params });
    }

    return Responses._200({ workout: updatedWorkout.Attributes });
};
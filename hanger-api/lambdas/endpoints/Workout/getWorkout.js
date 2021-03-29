const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    const ID = event.pathParameters.ID;
    const SK = event.pathParameters.SK;

    const user = await Dynamo.get({ID, SK}, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!user) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user });
};
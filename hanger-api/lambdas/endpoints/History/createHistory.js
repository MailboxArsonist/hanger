const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');
const { v4: uuidv4 } = require('uuid');
const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.body) {
        // failed without aany data to persist
        return Responses._400({ message: 'missing the request body' });
    }
    
    const { ID, name, totalTime } = JSON.parse(event.body);

    // should validate the above fields too 
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

    const SK = `history_${uuidv4()}`;
    const date = (new Date()).getTime();
    const params = {
        ID,
        SK,
        name,
        totalTime,
        date
    }

    const history = await Dynamo.write(params, tableName).catch(err => {
        console.log('Error creating the user', err);
        return null;
    })

    if (!history) {
        return Responses._400({ message: 'Failed to create new history' });
    }

    return Responses._200({ history });
};
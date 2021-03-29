const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');
const tableName = process.env.tableName;

exports.handler = async event => {
    
    const body = JSON.parse(event.body);

    if(!body.email) {
        return Responses._400({ message: 'You need to provide an email' });
    }

    const email = body.email;
    const SK = 'profile';

    const user = await Dynamo.getUserByEmail({email, SK}, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null;
    });

    if (!user[0]) {
        return Responses._400({ message: 'Failed to get user by ID' });
    }

    return Responses._200({ user: user[0] });
};
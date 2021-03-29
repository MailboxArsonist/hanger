const Responses = require('../../common/Response')
const Dynamo = require('../../common/Dynamo');
const { v4: uuidv4 } = require('uuid');
const tableName = process.env.tableName;

exports.handler = async event => {

    if (!event.body) {
        // failed without aany data to persist
        return Responses._400({ message: 'missing the request body' });
    }
    
    const { email } = JSON.parse(event.body);

    if(!email) {
        return Responses._400({ message: 'You need to provide a valid email' });
    }

    // add a duplicate email check here 
    const emailExists = await Dynamo.getUserByEmail({email, SK: 'profile'}, tableName).catch(err => {
        console.log('error getting user', err);
        return null;
    });

    if(emailExists.length) {
        return Responses._400({ message: 'Hmm looks like you already have an account with this email.', email: emailExists });
    }

    const data = {
        email,
        SK: 'profile',
        ID: uuidv4()
    }

    const newUser = await Dynamo.write(data, tableName).catch(err => {
        console.log('Error creating the user', err);
        return null;
    })

    if (!newUser) {
        return Responses._400({ message: 'Failed to create new user' });
    }

    return Responses._200({ user: newUser });
};
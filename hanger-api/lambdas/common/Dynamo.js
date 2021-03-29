const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {

    async get({ ID, SK }, TableName) {

        if(!ID || !SK) {
            throw Error(`No ID or SK provided when getting ${TableName}`);
        }

        const params = {
            TableName,
            Key: {
                ID,
                SK
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        }

        return data.Item;
    },
    
    async write(data, TableName) {
        if(!data.ID) {
            throw Error(`No ID provided when creating user ${TableName}`);
        }

        const params = {
            TableName,
            Item: data
        };

        const result = await documentClient.put(params).promise();

        if(!result) {
            throw Error(`Error created when inserting ID: ${data.id} into ${TableName}`);
        }

        return data;

    },

    async query({ ID, SK }, TableName) {
        const params = {
            TableName,
            KeyConditionExpression: 'ID = :id AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':id' : ID,
                ':sk' : SK,
            }
        };

        const { Items } = await documentClient.query(params).promise();

        return Items;
    },

    async getUserByEmail({ email, SK }, TableName) {
        const params = {
            TableName,
            FilterExpression: 'email = :email AND SK = :sk',
            ExpressionAttributeValues: {
                ':email' : email,
                ':sk' : SK,
            }
        };

        const { Items } = await documentClient.scan(params).promise();

        return Items;
    },

    async update({ ID, SK }, TableName, item) {

        let UpdateExpression = 'SET';
        const ExpressionAttributeNames = {};
        const ExpressionAttributeValues = {};

        // dynamically set props ot update
        for (const property in item) {
            UpdateExpression += ` #${property} = :test_${property},`;
            ExpressionAttributeNames['#' + property] = property ;
            ExpressionAttributeValues[':test_' + property] = item[property];
        }
        
        // slice the last comma off
        UpdateExpression= UpdateExpression.slice(0, -1);

        const params = {
            TableName,
            Key: {
                ID,
                SK
            },
            UpdateExpression,
            ExpressionAttributeValues,
            ExpressionAttributeNames,
            ReturnValues: "ALL_NEW"
        };

        const res = await documentClient.update(params).promise();
        return res;
    }
};
module.exports = Dynamo;
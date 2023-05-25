import { v4 as uuidv4 } from 'uuid';
import {dynamoDb} from './dynamodb';
import { GetItemInput, PutItemInput } from 'aws-sdk/clients/dynamodb';

export const write = async (event, context, callback) => {

  const data = JSON.parse(event.body);
  console.log("PROCESS: ");
  console.log(process.env);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuidv4(),
      text: data.text
    }
  }

  let response = {
    statusCode: 200,
    body: '',
  };

  try {
      await dynamoDb.put(params as PutItemInput).promise();
      console.log("SUCCESS");
      response.statusCode = 200;
      response.body = JSON.stringify(params.Item)
      return response;
  } catch(err) {
      console.log(err);
      response.statusCode = err.statusCode;
      response.body = JSON.stringify(err);
      return response;
  }
}

export const read = async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE as string,
  }

  let response = {
    statusCode: 200,
    body: '',
  };

  try {
      const result = await dynamoDb.scan(params as GetItemInput).promise();
      console.log("SUCCESS");
      response.statusCode = 200;
      response.body = JSON.stringify(result.Items);
      return response;
  } catch(err) {
      console.log(err);
      response.statusCode = err.statusCode;
      response.body = JSON.stringify(err);
      return response;
  }
}
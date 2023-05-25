'use strict'
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

let options = {}
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}
export const dynamoDb:DocumentClient = new AWS.DynamoDB.DocumentClient(options)

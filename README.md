# Todos Service Example

## Description
This is an example of a Serverless congifuration for PUT and GET AWS lambda functions, API Gateway DynamoDB which all deploys through CloudFormation in AWS. There is also local commands to run it all locally to test before deploying.

## Scripts / Commands

1. `npm install`

2. `serverless offline start --stage dev`. This will deploy the services locally (no cost or AWS used. Useful to test locally before deploying to AWS for real).

3. `npm run list-tables`. This should return a "dev" table in DynamoDB local.

4. `npm run deploy`. This will deploy the formation and all the services to AWS (you need to be logged into AWS CLI locally to do this).

5. `npm run delete`. This will remove all the deployed services that you deployed in step 4.

### Hitting the endpoints locally (For Linux or use Postman instead)

1. GET `curl http://localhost:3000/dev/todos`. Should return an empty array before any post.

2. POST `curl -X POST http://localhost:3000/dev/todos -H "Content-Type: application/json" -d '{"text": "Example text"}'`.

### Weird issue using DynamoDB locally

To get around this issue make the following changes:

1. Change `/todos-example/node_modules/dynamodb-localhost/dynamodb/config.json` `download_url` value to use `https`.

2. Change all references of `http` in here: `/home/harry/projects/aws-serverless-example/todos-example/node_modules/dynamodb-localhost/dynamodb/installer.js` to be `https`.

3. Then you should be able to install the DynamoDB local dependency.
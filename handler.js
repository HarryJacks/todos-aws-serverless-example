const uuid = require('uuid');
const dynamoDb = require('./dynamodb');

module.exports.write = (event, context, callback) => {
  const data = JSON.parse(event.body)
  console.log("PROCESS: ");
  console.log(process.env);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text
    }
  }
  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.'
      })
      return
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    }
    callback(null, response)
  })
}

module.exports.read = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  }
  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.'
      })
      return
    }

    let items;

    // Handle "text" quertystring parameter. Otherwise just return all results.
    if (event?.queryStringParameters?.text) {
      items = result.Items.filter((item) => item.text === event?.queryStringParameters?.text)
    } else {
      items = result.Items;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(items)
    }
    callback(null, response)
  })
}
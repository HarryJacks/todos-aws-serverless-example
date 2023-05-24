var AWS = require("aws-sdk");
const uuid = require('uuid');

AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

var client = new AWS.DynamoDB();
var documentClient = new AWS.DynamoDB.DocumentClient();

var tableName = "dev";

var params = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

client.createTable(params, function(tableErr, tableData) {
    if (tableErr) {
        console.error("Error JSON:", JSON.stringify(tableErr, null, 2));
    } else {
        console.log("Created table successfully!");
    }

    // Adding Batman movie to our collection
    var params = {
        TableName: tableName,
        Item: {
            "id": uuid.v1(),
            "text": "Batman Begins"
        }
    };

    console.log("Adding a new item...");
    documentClient.put(params, function(err, data) {
        if (err) {
            console.error("Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item successfully!");
        }
    });
});
import AWS from "aws-sdk";
import { Entity, Table } from "dynamodb-toolbox";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { dynamoSdkToToolbox } from "./helpers/data-table-definition-to-toolbox";
import { tableDefinition } from "./tableDefinition";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'


const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // if not false explicitly, we set it to true.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
}

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  // NOTE: this is required to be true in order to use the bigint data type.
  wrapNumbers: false, // false, by default.
}

const translateConfig = { marshallOptions, unmarshallOptions }
// Instantiate a DocumentClient
export const DocumentClient = DynamoDBDocumentClient.from(new DynamoDBClient({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
  credentials:{
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  }
}), translateConfig);

const MyTable = new Table({
  // Specify table name (used by DynamoDB)
  name: 'my-table',

  // Define partition and sort keys
  partitionKey: 'pk',
  sortKey: 'sk',

  // Add the DocumentClient
  DocumentClient
})

export const Customer = new Entity({
  // Specify entity name
  name: "Customer",

  // Define attributes
  attributes: {
    id: { partitionKey: true }, // flag as partitionKey
    sk: { hidden: true, sortKey: true }, // flag as sortKey and mark hidden
    age: { type: 'number' }, // set the attribute type
    name: { type: 'string', map: 'data' }, // map 'name' to table attribute 'data'
    emailVerified: { type: 'boolean', required: true }, // specify attribute as required
    company: { type: 'string' }, // alias table attribute 'co' to 'company'
    status: ['sk', 0], // composite key mapping
    date_added: ['sk', 1] // composite key mapping
  },

  // Assign it to our table
  table: MyTable

  // In Typescript, the "as const" statement is needed for type inference
} as const)
import AWS, {DynamoDB} from "aws-sdk";
import {Entity, Table} from "dynamodb-toolbox";
import {dynamoSdkToToolbox} from "./helpers/data-table-definition-to-toolbox";
import {tableDefinition} from "./tableDefinition";

AWS.config.update({
  region: 'us-west-2',
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  endpoint: 'http://localhost:8000',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey',
})

const DocumentClient = new DynamoDB.DocumentClient()

const MyTable = new Table({
  ...dynamoSdkToToolbox(tableDefinition),
  DocumentClient
})

export const Customer = new Entity({
  name: 'Customer',
  attributes: {
    id: {partitionKey: true}, // flag as partitionKey
    sk: {hidden: true, sortKey: true}, // flag as sortKey and mark hidden
    co: { alias: 'company' }, // alias table attribute 'co' to 'company'
    status: ['sk', 0], // composite key mapping
    date_added: ['sk', 1] // composite key mapping
  },
  table: MyTable
})


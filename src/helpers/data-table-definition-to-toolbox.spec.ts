import type { DynamoDB } from "aws-sdk";
import { dynamoSdkToToolbox } from "./data-table-definition-to-toolbox";

const sdkDefinition: DynamoDB.CreateTableInput = {
  TableName: "tableName",
  AttributeDefinitions: [
    {
      AttributeType: "S",
      AttributeName: "lambdaName",
    },
    {
      AttributeType: "N",
      AttributeName: "timestamp",
    },
  ],
  KeySchema: [
    {
      AttributeName: "lambdaName",
      KeyType: "HASH",
    },
    {
      AttributeName: "timestamp",
      KeyType: "RANGE",
    },
  ],
};

test("Gets the partitionKey", () => {
  expect(dynamoSdkToToolbox(sdkDefinition).partitionKey).toEqual("lambdaName");
});
test("Gets the sortKey", () => {
  expect(dynamoSdkToToolbox(sdkDefinition).sortKey).toEqual("timestamp");
});

test("Gets the string attributes", () => {
  expect(dynamoSdkToToolbox(sdkDefinition).attributes.lambdaName).toEqual(
    "string"
  );
});

test("Gets the number attributes", () => {
  expect(dynamoSdkToToolbox(sdkDefinition).attributes.timestamp).toEqual(
    "number"
  );
});

test("Gets the TableName", () => {
  expect(dynamoSdkToToolbox(sdkDefinition).name).toEqual("tableName");
});

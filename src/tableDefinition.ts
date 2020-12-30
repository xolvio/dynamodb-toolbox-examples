import type { DynamoDB } from "aws-sdk";

export const tableDefinition: DynamoDB.CreateTableInput = {
  TableName: "my-table",
  AttributeDefinitions: [
    {
      AttributeType: "S",
      AttributeName: "pk",
    },
    {
      AttributeType: "S",
      AttributeName: "sk",
    },
  ],
  KeySchema: [
    {
      AttributeName: "pk",
      KeyType: "HASH",
    },
    {
      AttributeName: "sk",
      KeyType: "RANGE",
    },
  ],
  BillingMode: "PAY_PER_REQUEST",
};

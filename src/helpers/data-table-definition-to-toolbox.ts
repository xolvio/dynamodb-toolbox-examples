import type { DynamoDB } from "aws-sdk";

type DynamoDBTypes = "string" | "number" | "binary";

type ToolboxData = {
  partitionKey: string;
  sortKey?: string;
  attributes: {
    [key: string]: DynamoDBTypes;
  };
  name: string;
};

function getAttributes(tableDefinition: DynamoDB.CreateTableInput) {
  const typesMap: { [key: string]: DynamoDBTypes } = {
    S: "string",
    N: "number",
    B: "binary",
  };

  return tableDefinition.AttributeDefinitions.reduce((previous, current) => {
    return {
      ...previous,
      [current.AttributeName]: typesMap[current.AttributeType],
    };
  }, {});
}

function getPartitionKey(tableDefinition: DynamoDB.CreateTableInput) {
  return tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === "HASH";
  }).AttributeName;
}

function getSortKey(tableDefinition: DynamoDB.CreateTableInput) {
  const rangeAttribute = tableDefinition.KeySchema.find((k) => {
    return k.KeyType.toUpperCase() === "RANGE";
  });
  return rangeAttribute ? rangeAttribute.AttributeName : undefined;
}

export const dynamoSdkToToolbox = (
  tableDefinition: DynamoDB.CreateTableInput
): ToolboxData => ({
  partitionKey: getPartitionKey(tableDefinition),
  attributes: getAttributes(tableDefinition),
  sortKey: getSortKey(tableDefinition),
  name: tableDefinition.TableName,
});

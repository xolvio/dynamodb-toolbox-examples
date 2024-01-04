import { DynamoDB } from "aws-sdk";
import { tableDefinition } from "./tableDefinition";
import { Customer } from "./Customer";

const createTable = async () => {
  const dynamoDB = new DynamoDB();
  // only create if the table does not exist yet
  try {
    await dynamoDB.createTable(tableDefinition).promise();
  } catch (e) {}
};

const run = async () => {
  await createTable();

  await Customer.put({
    id: 123,
    age: 35,
    name: 'Jane Smith',
    emailVerified: true,
    company: 'ACME',
    status: 'active',
    date_added: '2020-04-24'
  });

  const itemToGet = {
    id: 123,
    status: "active",
    date_added: "2020-04-24",
  };

  const response = await Customer.get(itemToGet);
  console.log(response);
};

run().then(() => {});

import { Entity } from "dynamodb-toolbox";
import { createTable, generateRandomName } from "dynamodb-testing-tool";
import { tableDefinition } from "./tableDefinition";
import { getToolboxTable, getCustomerEntity } from "./Customer";

let Customer: Entity<{}>;

beforeEach(async () => {
  const tableObject = await createTable({
    ...tableDefinition,
    TableName: generateRandomName(),
  });

  Customer = getCustomerEntity(
    getToolboxTable(tableObject.tableName, tableObject.documentClient)
  );
});

test("Putting and getting a Customer", async () => {
  const item = {
    id: 123,
    company: "COMPANY_1",
    status: "active",
    date_added: "2020-04-24",
  };

  await Customer.put(item);

  const itemToGet = {
    id: 123,
    status: "active",
    date_added: "2020-04-24",
  };

  const response = await Customer.get(itemToGet);
  expect(response.Item.status).toEqual("active");
  expect(response.Item.date_added).toEqual("2020-04-24");
  expect(response.Item.company).toEqual("COMPANY_1");
});

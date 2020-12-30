import {DynamoDB} from "aws-sdk";
import {tableDefinition} from "./tableDefinition";
import {Customer} from "./Customer";


const createTable = async () => {
  const dynamoDB = new DynamoDB()
  // only create if the table does not exist yet
  try {
    await dynamoDB.createTable(tableDefinition).promise()
  } catch(e) {
  }
}

const run = async () => {
  await createTable()
  const item = {
    id: 123,
    company: 'ACME',
    status: 'active',
    date_added: '2020-04-24'
  }

  await Customer.put(item)

  const itemToGet = {
    id: 123,
    status: 'active',
    date_added: '2020-04-24'
  }

  const response = await Customer.get(itemToGet)
  console.log(response)
}

run().then(() => {

})

const contactsOperations = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      contact && console.log(contact);
      break;

    case "add":
      const addContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      addContact && console.log(addContact);
      break;

    case "remove":
      const removedContact = await contactsOperations.removeContact(id);
      removedContact && console.log(removedContact);
      break;

    case "update":
      const updatedContact = await contactsOperations.updateContact(
        id,
        name,
        email,
        phone
      );
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

//===============================================

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

(async () => {
  await invokeAction(argv);
})();

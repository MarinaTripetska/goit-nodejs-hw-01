const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const resp = await fs.readFile(contactsPath);

    const contacts = JSON.parse(resp);

    return contacts;
  } catch (error) {
    console.log("error:", error.message);
  }
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const contact = await contacts.find((el) => el.id === contactId);

    if (!contact) {
      throw new Error(`\x1B[31m Contact with id=${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const indx = await contacts.findIndex((el) => el.id === contactId);

    if (indx === -1) {
      throw new Error(`\x1B[31m Contact with id=${contactId} not found`);
    }

    const [removedContact] = await contacts.splice(indx, 1);

    await updateContacts(contacts);

    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      throw new Error("`\x1B[31m Please, provide full information!");
    }

    const contacts = await listContacts();

    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };

    await updateContacts([...contacts, newContact]);

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContact(id, name, email, phone) {
  try {
    const contacts = await listContacts();
    const idx = await contacts.findIndex((el) => el.id === id);
    if (idx === -1) {
      throw new Error(`\x1B[31m Contact with id=${id} not found`);
    }

    contacts[idx] = {
      id,
      name: name || contacts[idx].name,
      email: email || contacts[idx].email,
      phone: phone || contacts[idx].phone,
    };

    await updateContacts(contacts);

    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

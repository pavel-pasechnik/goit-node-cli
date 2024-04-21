import crypto from 'node:crypto';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');

async function writeContact(contacts) {
  fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const data = contacts.find(contact => contact.id === contactId);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    const removedContact = contacts[index];

    contacts.splice(index, 1);

    await writeContact(contacts);

    return removedContact;
  } catch (error) {
    return error;
  }
}

export async function addContact(contact) {
  try {
    const contacts = await listContacts();
    const newContact = { ...contact, id: crypto.randomUUID() };

    contacts.push(newContact);
    await writeContact(contacts);

    return newContact;
  } catch (error) {
    return error;
  }
}

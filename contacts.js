import crypto from 'node:crypto';
import * as fs from 'node:fs/promises';
import path from 'node:path';

const contactsPath = path.resolve('db', 'contacts.json');

async function writeContact(contacts) {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');

  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();

  const data = contacts.find(contact => contact.id === contactId);

  if (typeof data === 'undefined') {
    return null;
  }

  return data;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const deletedContact = await getContactById(contactId);
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);

  if (updatedContacts === undefined) {
    return null;
  }

  await writeContact(updatedContacts);

  return deletedContact;
}

export async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);
  await writeContact(contacts);

  return getContactById(newContact.id);
}

import { program } from 'commander';

import { addContact, getContactById, listContacts, removeContact } from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list': {
      await listContacts()
        .then(contacts => {
          console.table(contacts);
        })
        .catch(error => {
          console.log(error);
        });
      break;
    }

    case 'get': {
      await getContactById(id)
        .then(contact => {
          console.log(contact);
        })
        .catch(error => {
          console.log(error);
        });
      break;
    }

    case 'add': {
      await addContact({ name, email, phone })
        .then(contact => {
          console.log(contact);
        })
        .catch(error => {
          console.log(error);
        });
      break;
    }

    case 'remove': {
      await removeContact(id)
        .then(contact => {
          console.log(contact);
        })
        .catch(error => {
          console.log(error);
        });
      break;
    }

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);

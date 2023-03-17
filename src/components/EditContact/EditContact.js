import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Label } from './EditContact.styled';
import { editContact } from 'reduxe/sliceContacts';
import { selectContacts } from 'reduxe/selectors';
import { changeContacts } from 'reduxe/operation';

const findContactByNameAndId = (contacts, userName, id) => {
  const textFilter = userName.toUpperCase();
  return contacts.find(
    element => element.name.toUpperCase() === textFilter && element.id !== id
  );
};

const EditContact = ({ contact }) => {
  const contacts = useSelector(selectContacts);
  const dispatcher = useDispatch();
  const [newName, setNewName] = useState(contact.name);
  const [newNumber, setNewNumber] = useState(contact.phone);

  const handlerSave = event => {
    event.preventDefault();

    if (findContactByNameAndId(contacts, newName, contact.id)) {
      alert(`${newName} is already in contacts`);
      return;
    }

    // dispatcher(editContact(contact.id));
    // TODO save to API
    dispatcher(
      changeContacts({
        id: contact.id,
        name: newName,
        phone: newNumber,
      })
    );
  };

  const onChangeName = event => {
    setNewName(event.target.value);
  };

  const onChangeNumber = event => {
    setNewNumber(event.target.value);
  };

  const handlerCancel = () => {
    dispatcher(editContact(contact.id));
  };

  return (
    <Form onSubmit={handlerSave}>
      <Label htmlFor="userName">
        New name:
        <input
          type="text"
          placeholder="Enter user name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          name="name"
          value={newName}
          onChange={onChangeName}
        />
      </Label>

      <Label htmlFor="numberPhone">
        New number:
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={newNumber}
          onChange={onChangeNumber}
        />
      </Label>
      <button type="submit">Save</button>
      <button type="button" onClick={handlerCancel}>
        Cancel
      </button>
    </Form>
  );
};

EditContact.propType = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    edit: PropTypes.bool,
  }).isRequired,
};

export default EditContact;

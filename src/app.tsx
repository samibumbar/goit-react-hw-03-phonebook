import React, { useState } from "react";
import { nanoid } from "nanoid";
import { ContactForm, Filter, ContactList } from "./components";
import styles from "./app.module.css";

interface Contact {
  id: string;
  name: string;
  number: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  const addContact = (name: string, number: string) => {
    if (contacts.some((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact: Contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={styles.h2}>Contacts</h2>
      <Filter filter={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;

import { type ContactsProps } from '../types'

import { ContactCard } from './ContactCard'

export function ContactsList ({ contacts, onUpdateContact, onDeleteContact, toggleFav, favs }: ContactsProps) {
  return (
    <div className="space-y-7">
    {
      contacts.map((c) => (
        <ContactCard
          contact={c}
          key={c.id}
          onUpdateContact={onUpdateContact}
          onDeleteContact={onDeleteContact}
          toggleFav={toggleFav}
          favs={favs}
        />
      ))
    }
  </div>
  )
}

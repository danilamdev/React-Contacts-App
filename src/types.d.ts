export interface Contact {
  id: number | string
  avatar: string
  first_name: string
  last_name: string
  email: string
  job: string
  phone_number: string
}

export type NewContact = Omit<Contact, 'id' | 'avatar'>

// export type InputNewContact = Record<keyof NewContact, FormDataEntryValue >

export enum SORT_BY {
  NAME = 'name',
  LASTNAME = 'lastname'
}

export type ContactList = Contact[]

export interface StateContacts {
  contacts: ContactList
  search: string
  sortBy: SORT_BY
  favs: Set<Contact['id']>
}

export type ContactAction =
  | { type: 'INIT_CONTACTS', payload: ContactList }
  | { type: 'SORT_CONTACTS', payload: SORT_BY }
  | { type: 'SET_SEARCH', payload: string }
  | { type: 'ADD_CONTACT', payload: NewContact }
  | { type: 'UPDATE_CONTACT', payload: Contact }
  | { type: 'REMOVE_CONTACT', payload: { id: Contact['id'] } }
  | { type: 'TOGGLE_FAV', payload: { fav: Contact['id'] } }

export interface SearchProps {
  search: string
  sortBy: SORT_BY
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSorted: (sortBy: SORT_BY) => void
}

export interface ContactsProps {
  contacts: ContactList
  onUpdateContact: (updateContact: Contact) => void
  onDeleteContact: (id: Contact['id']) => void
  toggleFav: (fav: Contact['id']) => void
  favs: Set<Contact['id']>
}

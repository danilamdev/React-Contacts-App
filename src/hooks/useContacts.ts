import { SORT_BY } from '../types.d'
import type { Contact, ContactList, NewContact } from '../types.d'

import { useReducer, useCallback, useMemo } from 'react'
import { contactReducer, initialContacts } from '../reducers/contactReducer.ts'

export function useContacts () {
  const [state, dispatch] = useReducer(contactReducer, initialContacts)
  const { contacts, sortBy, search, favs } = state

  const setInitContacts = (contacts: ContactList) => {
    dispatch({ type: 'INIT_CONTACTS', payload: contacts })
  }

  const onChangeSorted = (sortby: SORT_BY) => {
    dispatch({ type: 'SORT_CONTACTS', payload: sortby })
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH', payload: e.target.value })
  }

  const onAddContact = (contact: NewContact) => {
    dispatch({ type: 'ADD_CONTACT', payload: contact })
  }

  const onUpdateContact = (updatedContact: Contact) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact })
  }

  const onDeleteContact = (id: Contact['id']) => {
    dispatch({ type: 'REMOVE_CONTACT', payload: { id } })
  }

  const toggleFav = (fav: Contact['id']) => {
    dispatch({ type: 'TOGGLE_FAV', payload: { fav } })
  }

  const filterContacts = useMemo(() => {
    return contacts.filter(c => {
      return c.first_name.toLowerCase().includes(search.toLowerCase()) ||
        c.last_name.toLowerCase().includes(search.toLowerCase())
    })
  }, [contacts, search])

  const getSortedContacts = useCallback(({ contacts, sortBy }: { contacts: ContactList, sortBy: SORT_BY }) => {
    const sorting = {
      [SORT_BY.NAME]: (a: Contact, b: Contact) => a.first_name.localeCompare(b.first_name),
      [SORT_BY.LASTNAME]: (a: Contact, b: Contact) => a.last_name.localeCompare(b.last_name)
    }

    const sortFn = sorting[sortBy]

    return [...contacts].sort(sortFn)
  }, [])

  const sortedContacts = getSortedContacts({ contacts: filterContacts, sortBy })

  return {
    contacts: sortedContacts,
    favs,
    sortBy,
    onChangeSorted,
    search,
    onChangeSearch,
    onAddContact,
    onUpdateContact,
    onDeleteContact,
    setInitContacts,
    toggleFav
  }
}

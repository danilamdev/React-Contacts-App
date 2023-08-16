import { SORT_BY } from '../types.d'
import type { StateContacts, ContactAction } from '../types.d'

import { updateLocalStorage, getInitialContacts, getInitialFavs } from '../utils/localStorage'

export const initialContacts: StateContacts = {
  contacts: getInitialContacts(),
  search: '',
  sortBy: SORT_BY.NAME,
  favs: getInitialFavs()
}

export function contactReducer (state: StateContacts, action: ContactAction) {
  if (action.type === 'INIT_CONTACTS') {
    updateLocalStorage('contacts', action.payload)

    return {
      ...state,
      contacts: action.payload
    }
  }

  if (action.type === 'SORT_CONTACTS') {
    return {
      ...state,
      sortBy: action.payload
    }
  }

  if (action.type === 'SET_SEARCH') {
    return {
      ...state,
      search: action.payload
    }
  }

  if (action.type === 'ADD_CONTACT') {
    const id = window.crypto.randomUUID() as string
    const newContact = {
      ...action.payload,
      id,
      avatar: `https://i.pravatar.cc/${(state.contacts.length + 1) * 100}`
    }

    updateLocalStorage('contacts', state.contacts.concat(newContact))

    return {
      ...state,
      contacts: state.contacts.concat(newContact)
    }
  }

  if (action.type === 'UPDATE_CONTACT') {
    const updateContact = action.payload

    const newContacts = state.contacts.map(contact => {
      if (contact.id === updateContact.id) {
        return { ...contact, ...updateContact }
      }

      return contact
    })

    updateLocalStorage('contacts', newContacts)

    return {
      ...state,
      contacts: newContacts
    }
  }

  if (action.type === 'REMOVE_CONTACT') {
    const { id } = action.payload
    const newContacts = state.contacts.filter(contact => contact.id !== id)

    updateLocalStorage('contacts', newContacts)
    updateLocalStorage('favorites', id)
    return {
      ...state,
      contacts: newContacts
    }
  }

  if (action.type === 'TOGGLE_FAV') {
    const { fav } = action.payload
    const isFav = state.favs.has(fav)

    isFav
      ? state.favs.delete(fav)
      : state.favs.add(fav)

    updateLocalStorage('favorites', Array.from(state.favs))

    return {
      ...state
    }
  }

  return state
}

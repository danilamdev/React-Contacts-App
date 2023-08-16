import type { Contact, ContactList } from '../types.d'

export const updateLocalStorage = (id: string, state: any) => {
  window.localStorage.setItem(id, JSON.stringify(state))
}

export const getInitialContacts = (): ContactList => {
  const contacts = window.localStorage.getItem('contacts')

  if (typeof contacts === 'string') return JSON.parse(contacts)

  return []
}

export const getInitialFavs = (): Set<Contact['id']> => {
  const favs = window.localStorage.getItem('favorites')

  if (typeof favs === 'string') {
    const favArr = JSON.parse(favs)
    return new Set([...favArr])
  }

  return new Set<Contact['id']>()
}

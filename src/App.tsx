import { useContacts } from './hooks/useContacts.ts'

import { Search } from './components/Search.tsx'
import { ContactsList } from './components/ContactsList.tsx'
import { NoContacts } from './components/NoContacts.tsx'
import { FavIcon } from './components/icons/Icons.tsx'
import './App.css'

import { ContactForm } from './components/ContactForm.tsx'
import { useMemo, useState } from 'react'

function App () {
  const [showFavs, setShowFavs] = useState(false)
  const {
    contacts,
    search,
    sortBy,
    onChangeSearch,
    onChangeSorted,
    onAddContact,
    onUpdateContact,
    onDeleteContact,
    setInitContacts,
    toggleFav,
    favs
  } = useContacts()

  const filteredFavContacts = useMemo(() => {
    return showFavs
      ? contacts.filter(contact => favs.has(contact.id))
      : contacts
  }, [showFavs, contacts])

  const noFavs = favs.size === 0 && showFavs

  return (
    <>
      <main className='max-w-xl mx-auto'>
        <h1 className='text-6xl text-slate-700 text-center p-20 font-bold'>My Contacts</h1>
          <Search
            search={search}
            sortBy={sortBy}
            onChangeSearch={onChangeSearch}
            onChangeSorted={onChangeSorted}
          />

          <section className='py-5'>
            <ContactForm addContact={onAddContact} />
          </section>

          <div className="flex items-center justify-between mb-5">
            <small className='mt-5 inline-block text-slate-500 mb-2'>Total <strong>{contacts.length}</strong> contacts</small>
            <div className="flex items-center gap-x-2 text-sm accent-indigo-400 mt-5">
              <button onClick={() => { setShowFavs(!showFavs) }} className='px-4 py-2 hover:bg-slate-200 text-slate-600 tracking-tight inline-flex space-x-2'>
                <FavIcon className={`${showFavs ? 'fill-rose-300' : 'fill-none'} w-5 h-5 text-rose-600 fill-none `}/>
                <span>{ `${showFavs ? 'hide' : 'show'} favorites (${favs.size})`}</span>
              </button>
              </div>
          </div>

          <div>
            {noFavs && <p className='text-center my-20 text-slate-400 text-2xl w-52 mx-auto font-semibold'>Todavia no tienes favoritos...</p>}
          </div>

          <section className='pb-20'>
            {
              (contacts.length === 0)
                ? <NoContacts setInitContacts={setInitContacts} />
                : <ContactsList
                    contacts={filteredFavContacts}
                    onUpdateContact={onUpdateContact}
                    onDeleteContact={onDeleteContact}
                    toggleFav={toggleFav}
                    favs={favs}
                  />
            }
          </section>

      </main>
    </>
  )
}

export default App

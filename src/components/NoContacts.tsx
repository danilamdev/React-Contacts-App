import type { Contact, ContactList } from '../types.d'
import { SadIcon } from './icons/SadIcon'

interface Props {
  setInitContacts: (contacts: ContactList) => void
}

export function NoContacts ({ setInitContacts }: Props) {
  const handleClick = () => {
    fetch('src/db/data.json')
      .then(async data => await data.json())
      .then(response => {
        const contacts = response.map((u: Contact, i: number) => ({ ...u, avatar: `https://i.pravatar.cc/${i * 100}?img=${i}` }))

        setInitContacts(contacts)
      })
      .catch(err => { console.log(err) })
  }

  return (
    <div className="text-center p-10 my-10 text-slate-500 text-4xl border border-slate-300 font-semibold bg-slate-200 rounded-md">
      <SadIcon className='w-20 h-20 stroke-1 block mx-auto mb-5' />
      <h3>Todavía no tienes contactos</h3>
      <p>Agrega alguno</p>

      <div className='text-sm mt-7 font-normal'>
        <p>o puedes cargar contactos ficticios...</p>

        <button onClick={handleClick} className='px-6 py-4 bg-slate-300 rounded-full text-slate-600 mt-8 font-medium hover:bg-slate-400'>agregar</button>
      </div>
    </div>
  )
}

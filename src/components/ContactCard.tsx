import { useState } from 'react'
import { type Contact } from '../types'
import { UserFields } from './UserFields'

import { Modal } from './Modal'
import { HeartFav } from './HeartFav'

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'

interface Props {
  contact: Contact
  onUpdateContact: (updateContact: Contact) => void
  onDeleteContact: (id: Contact['id']) => void
  toggleFav: (fav: Contact['id']) => void
  favs: Set<Contact['id']>
}

export function ContactCard ({ contact, onUpdateContact, onDeleteContact, toggleFav, favs }: Props) {
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    onDeleteContact(contact.id)
    toggleFav(contact.id)
  }

  const isFav = favs.has(contact.id)
  const favStyle = isFav
    ? 'bg-rose-100/50 hover:bg-rose-200'
    : 'bg-none hover:bg-slate-200'

  return (
    <article key={contact.id} className='bg-white rounded-xl p-6 flex items-start gap-10 relative'>
      <aside>
        <img src={contact.avatar} alt={`image of ${contact.first_name} ${contact.last_name}`} className='w-20 h-20 rounded-full border-2 border-emerald-300' />
      </aside>
      <div className='flex-1'>
        <h2 className='font-bold text-2xl text-slate-600 tracking-tight'>{contact.first_name} {contact.last_name}</h2>
        <p className='text-emerald-400 my-1  text-sm'>{contact.email}</p>
        <p className='text-emerald-400 mb-5 text-sm '>tel: {contact.phone_number}</p>
        <p className='text-lg text-slate-500 font-semibold'>{contact.job}</p>
      </div>

      <button
        onClick={() => { toggleFav(contact.id) }}
        className={`${favStyle} p-2 rounded-full absolute bottom-3 right-3`}>
        <span>
          <HeartFav isFav={isFav} />
        </span>
      </button>

      <Modal open={open} onOpenChange={setOpen}>
        <div className='absolute top-2 right-3  flex items-center space-x-3'>
          <Modal.Button className=' rounded p-2 top-2 right-3 text-slate-600 hover:bg-gray-100'>
            <Pencil1Icon />
          </Modal.Button>

          <button onClick={handleDelete} className='p-2 text-rose-400  rounded hover:bg-rose-50'>
            <TrashIcon className='w-4 h-4' />
          </button>
        </div>

        <Modal.Content contactId={contact.id} title='editar contacto'>
          <UserFields
            contact={contact}
            onUpdate={onUpdateContact}
            afterSave={() => { setOpen(false) }}
          />
        </Modal.Content>
      </Modal>

    </article>
  )
}

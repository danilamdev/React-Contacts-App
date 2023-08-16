import { useState } from 'react'
import { type Contact } from '../types'
import { UserFields } from './UserFields'

import * as Dialog from '@radix-ui/react-dialog'
import { Pencil1Icon, Cross1Icon, TrashIcon, HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons'

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
        className={`${isFav ? 'bg-rose-100/50 hover:bg-rose-200' : 'bg-none hover:bg-slate-200'} p-2 rounded-full absolute bottom-3 right-3`}>
        <span>
          {
            isFav
              ? <HeartFilledIcon className='w-3 h-3 text-rose-400' />
              : <HeartIcon className='w-3 h-3'/>
          }
        </span>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className='absolute top-2 right-3  flex items-center space-x-3'>
          <Dialog.Trigger className=' rounded p-2 top-2 right-3 text-slate-600 hover:bg-gray-100'>
            <Pencil1Icon />
          </Dialog.Trigger>

          <button onClick={handleDelete} className='p-2 text-rose-400  rounded hover:bg-rose-50'>
            <TrashIcon className='w-4 h-4' />
          </button>
        </div>

        <Dialog.Portal>
          <Dialog.Overlay className='fixed inset-0 bg-black/50 data-[state=open]:animate-[fade-in_150ms] data-[state=closed]:animate-[fade-out_150ms]' />
          <Dialog.Content className='w-full max-w-xl fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 shadow-md rounded p-5 data-[state=open]:animate-[dialog-show_150ms] data-[state=closed]:animate-[dialog-hide_150ms]'>
            <div className="flex justify-between items-start mb-7">
              <div>
                <Dialog.Title className='text-2xl '>Edit Contact</Dialog.Title>
                <small className='text-gray-400 font-light'>contact id: {contact.id}</small>
              </div>
              <Dialog.Close className='rounded-full hover:bg-slate-200 p-2'>
                <Cross1Icon className='text-slate-600'/>
              </Dialog.Close>
            </div>

            <UserFields
              contact={contact}
              onUpdate={onUpdateContact}
              afterSave={() => { setOpen(false) }}
            />

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  )
}

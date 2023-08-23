import { useState } from 'react'
import { type Contact } from '../types'

import { wait } from '../utils/wait'

import { Close as ModalClose } from '@radix-ui/react-dialog'

import { Spinner } from './Spinner'

interface Props {
  onUpdate: (updateContact: Contact) => void
  contact: Contact
  afterSave: () => void
}

export function UserFields ({ contact, onUpdate, afterSave }: Props) {
  const [loading, setLoading] = useState(false)
  const { first_name, last_name, email, job, phone_number } = contact

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    const updateContact: Contact = {
      ...contact,
      first_name: data.name,
      last_name: data.lastname,
      email: data.email,
      phone_number: data.phone,
      job: data.job
    }

    setLoading(true)
    await wait(() => { onUpdate(updateContact) }, 1000)

    afterSave()
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading} className='group'>
        <div className="flex justify-between gap-x-4 mb-4 group-disabled:opacity-50">
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="name">name</label>
            <input defaultValue={first_name} type="text" id='name' name='name' className='border border-slate-300 rounded py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="lastname">lastname</label>
            <input defaultValue={last_name} type="text" id='lastname' name='lastname' className='border border-slate-300 rounded py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>
        </div>
        <div className="flex justify-between gap-x-4 group-disabled:opacity-50">
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="email">email</label>
            <input defaultValue={email} type="text" id='email' name='email' className='border border-slate-300 rounded py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="phone">phone</label>
            <input defaultValue={phone_number} type="text" id='phone' name='phone' className='border border-slate-300 rounded py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400'/>
          </div>
        </div>
        <div className='mt-4 mb-16 group-disabled:opacity-50'>
          <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="job">job</label>
          <input defaultValue={job} type="text" id='job' name='job' className='border border-slate-300 rounded py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
        </div>
        <div className='text-right space-x-8 mr-4'>
          <ModalClose className='hover:bg-slate-100 px-4 py-2 rounded text-sm'>Cancel</ModalClose>
          <button className='inline-flex items-center justify-center px-5 py-2 bg-emerald-200 text-sm rounded hover:bg-emerald-300 font-medium  text-emerald-800 relative group-disabled:pointer-events-none'>
            <Spinner className='h-4 absolute group-enabled:opacity-0' />
            <span className='group-disabled:opacity-0'>Save</span>
          </button>
        </div>
      </fieldset>
   </form>
  )
}

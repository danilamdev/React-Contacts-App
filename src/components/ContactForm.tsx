import { type NewContact } from '../types.d'

interface FormProps {
  addContact: (contact: NewContact) => void
}

export function ContactForm ({ addContact }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    const newContact: NewContact = {
      first_name: data.name,
      last_name: data.lastname,
      email: data.email,
      job: data.job,
      phone_number: data.phone
    }

    console.log('data?', newContact)

    addContact(newContact)

    e.currentTarget.reset()
  }
  return (
    <form onSubmit={handleSubmit} className=' px-5 py-8 rounded-xl bg-slate-200 '>
      <h3 className='mb-5 text-xl font-semibold text-slate-600 tracking-tight'>Add Contacts</h3>
        <div className="flex justify-between gap-x-4 mb-4">
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="name">name</label>
            <input type="text" id='name' name='name' className='bg-white rounded-full py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>

          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="lastname">lastname</label>
            <input type="text" id='lastname' name='lastname' className='bg-white rounded-full py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>
        </div>

        <div className="flex justify-between gap-x-4">
          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="email">email</label>
            <input type="text" id='email' name='email' className='bg-white rounded-full py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
          </div>

          <div className='flex-1 w-full'>
            <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="phone">phone</label>
            <input type="number" id='phone' name='phone' className='bg-white rounded-full py-1 pl-4 w-full focus:outline focus:outline-1 focus:outline-slate-400 appearance-none hover:appearance-none focus:appearance-none' />
          </div>

        </div>

        <div className='my-4 '>
          <label className='block text-sm px-2 mb-2 text-slate-600' htmlFor="job">job</label>
          <input type="text" id='job' name='job' className='bg-white rounded-full p-2 pl-3 w-full focus:outline focus:outline-1 focus:outline-slate-400' />
        </div>

        <button className='hover:bg-slate-800 bg-slate-700 mt-10 text-sm px-5 py-3 rounded-full font-semibold text-white ml-auto block w-max focus:outline focus:outline-2 focus:outline-sky-700'>Add new</button>
      </form>
  )
}

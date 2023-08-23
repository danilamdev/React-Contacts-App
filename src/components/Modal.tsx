import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'

interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface ContentProps {
  children: React.ReactNode
  title: string
  contactId: string | number
}

function ModalContent ({ children, title, contactId }: ContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/50 data-[state=open]:animate-[fade-in_150ms] data-[state=closed]:animate-[fade-out_150ms]' />
      <Dialog.Content className='w-full max-w-xl fixed top-1/2 left-1/2 bg-white -translate-x-1/2 -translate-y-1/2 shadow-md rounded p-5 data-[state=open]:animate-[dialog-show_150ms] data-[state=closed]:animate-[dialog-hide_150ms]'>
          <div className="flex justify-between items-start mb-7">
            <div>
              <Dialog.Title className='text-2xl '>{title}</Dialog.Title>
              <small className='text-gray-400 font-light'>contact id: {contactId}</small>
            </div>
            <Dialog.Close className='rounded-full hover:bg-slate-200 p-2'>
              <Cross1Icon className='text-slate-600'/>
            </Dialog.Close>
          </div>

          {children}

        </Dialog.Content>
      </Dialog.Portal>
  )
}

export function Modal ({ open, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

Modal.Button = Dialog.Trigger
Modal.Content = ModalContent

/*
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

      */

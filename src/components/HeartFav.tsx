import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'

export function HeartFav ({ isFav }: { isFav: boolean }) {
  return (
    <>
      {
        isFav
          ? <HeartFilledIcon className='w-3 h-3 text-rose-400' />
          : <HeartIcon className='w-3 h-3'/>
      }
    </>

  )
}

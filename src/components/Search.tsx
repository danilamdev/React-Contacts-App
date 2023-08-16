import { SORT_BY, type SearchProps } from '../types.d'

export function Search ({ search, sortBy, onChangeSearch, onChangeSorted }: SearchProps) {
  return (
    <form className='flex items-center gap-5 justify-between'>
      <input type="text" placeholder='search contact...' name='search' id='search' value={search} onChange={onChangeSearch} className='bg-white py-2 px-5 rounded-full w-full border-none focus:outline focus:outline-1 focus:outline-indigo-500 text-slate-600 font-semibold placeholder:font-normal placeholder:text-slate-300' />

      <div className='flex items-center gap-2 text-slate-700 text-sm'>
        <input type="radio" name="byName" id="byName" checked={sortBy === 'name'} className='accent-indigo-500' onChange={() => { onChangeSorted(SORT_BY.NAME) }} />
        <label className='w-max' htmlFor="byName">sort by name</label>

        <input type="radio" name="byLastName" id="byLastName" checked={sortBy === 'lastname'} className='accent-indigo-500' onChange={() => { onChangeSorted(SORT_BY.LASTNAME) }} />
        <label className='w-max' htmlFor="byLastName">sort by last name</label>
      </div>

    </form>
  )
}

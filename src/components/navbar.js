import { Disclosure} from '@headlessui/react'

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-blue-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
             <h1 className='text-white'>Wellness Retreats</h1>
            </div>
           
          </div>
        
        </div>
      </div>

     
    </Disclosure>
  )
}

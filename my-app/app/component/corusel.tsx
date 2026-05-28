'use client'
import React from 'react'
import { corusel } from '../config/constant'
import Image from 'next/image'



function Corusel() {
  return (
    <section className='container w-full mt-10 md:mt-16  md:px-8'>
      <div className=' mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 md:gap-6'>
        {corusel.map((item: any) => (
          <div key={item.name} className='relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden group shadow-lg'>
            <Image
              src={item.path}
              alt={item.name}
              className='object-cover group-hover:scale-110 transition-transform duration-500'
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end p-4 md:p-6 opacity-90 group-hover:opacity-100 transition-opacity'>
              <h2 className='text-lg md:text-xl font-bold text-white mb-1 md:mb-2 text-center'>{item.name}</h2>
              <p className='text-xs md:text-sm text-gray-300 text-center line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Corusel
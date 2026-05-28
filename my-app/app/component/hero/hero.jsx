'use client'
import React from 'react'
import { Box, Typography } from "@mui/material"
import Image from 'next/image'
import { Roboto } from "next/font/google";

import {homePageAbout} from "@/app/config/constant"

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


function Hero() {
  const handleClick = () => {
    window.location.href = "/contact";
  }
  return (
    <section className="w-full mt-4 md:mt-7 px-4 md:px-8">
      <Box className="container relative mx-auto flex flex-col items-center justify-center">
        <Box className="w-full relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/designer.jpg"
            alt="hero image"
            className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl"
            fill
            priority
          />
        </Box>
        <Box className="absolute lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-black/40 backdrop-blur-md p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/10 w-[90%]  max-w-[500px]">
          <Typography
            variant="h2"
            className="text-white font-bold mb-2 md:mb-4"
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}
          >
            <span className="text-blue-500">ION</span>
          </Typography>
          <p className="text-gray-200 text-sm md:text-lg mb-4 md:mb-0">
            Bu sizning interyer va exteryer dizayn saytingiz bo'ladi.
          </p>
          <button onClick={handleClick} className="mt-2 md:mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-md cursor-pointer text-sm md:text-base font-medium transition-colors">
            Arizani yuborish
          </button>
        </Box>

        {/* foydalanuvchilar 567  |  loihalar 30* */}
        <Box className="flex flex-col sm:flex-row items-center justify- w-full px-4 sm:px-10 py-2 mt-6 md:mt-8 gap-4 sm:gap-0">

          {/* Dizaynerlar Qism */}
          <Box className='border border-white/10 w-full flex flex-col items-center justify-center rounded-xl sm:rounded-none sm:rounded-l-xl py-6 md:py-8 hover:bg-white/5 transition-all duration-300 cursor-pointer group bg-white/5 sm:bg-transparent'>
            <Typography
              variant="h4"
              style={{ fontFamily: 'Roboto' }}
              className="text-gray-300 font-bold group-hover:text-white transition-colors text-center"
              sx={{ fontSize: { xs: '1.25rem', md: '1.75rem', lg: '2.125rem' } }}
            >
              Dizaynlar
            </Typography>
            <Box className="mt-1 md:mt-2">
              <Typography
                variant="h3"
                style={{ fontFamily: 'Roboto' }}
                className="text-blue-400 font-bold transition-colors group-hover:text-blue-300 text-center"
                sx={{ fontSize: { xs: '1.75rem', md: '2.5rem', lg: '3rem' } }}
              >
                567+
              </Typography>
            </Box>
          </Box>

          {/* Vertical/Horizontal Chiziq */}
          <Box className="h-[1px] w-full sm:h-20 sm:w-[1px] bg-white/20 sm:mx-4 self-center"></Box>

          {/* Loyihalar Qism */}
          <Box className='border border-white/10 w-full flex flex-col items-center justify-center rounded-xl sm:rounded-none sm:rounded-r-xl py-6 md:py-8 hover:bg-white/5 transition-all duration-300 cursor-pointer group bg-white/5 sm:bg-transparent'>
            <Typography
              variant="h4"
              style={{ fontFamily: 'Roboto' }}
              className="text-gray-300 font-bold group-hover:text-white transition-colors text-center"
              sx={{ fontSize: { xs: '1.25rem', md: '1.75rem', lg: '2.125rem' } }}
            >
              Loyihalar
            </Typography>
            <Box className="mt-1 md:mt-2">
              <Typography
                variant="h3"
                style={{ fontFamily: 'Roboto' }}
                className="text-blue-400 font-bold transition-colors group-hover:text-blue-300 text-center"
                sx={{ fontSize: { xs: '1.75rem', md: '2.5rem', lg: '3rem' } }}
              >
                30+
              </Typography>
            </Box>
          </Box>
          
        </Box>
        <Box className='border lg:mt-10 border-white/10  w-full flex flex-col items-center justify-center rounded-xl sm:rounded-none sm:rounded-l-xl py-6 md:py-8 hover:bg-white/5 transition-all duration-300 cursor-pointer group bg-white/5 sm:bg-transparent'>
            <Typography style={{fontFamily : 'Roboto'}} 
            className="text-gray-300 font-bold group-hover:text-white transition-colors text-center"
            variant='h4'
            >
           {homePageAbout.title}
              </Typography>
              <p className=" mt-3 text-gray-300 font-medium group-hover:text-white transition-colors text-center">{homePageAbout.description}</p>
          </Box>
      </Box>
    </section>
  )
}

export default Hero
import React from 'react'
import { AiOutlineBulb } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";
import { RiAlertLine } from "react-icons/ri";

const page = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center text-white h-screen px-2">
      <h1 className='text-5xl font-bold mb-20'>chatbot</h1>
      <div className='flex space-x-2 text-center'>
      <div>
        <div className='flex flex-col items-center justify-center mb-3'>
        <AiOutlineBulb className='h-8 w-8 text-white-500'/>
          <h2>Example</h2>
        </div>
        <div className='space-y-2'>
          <p className='text-info'>Lorem ipsum dolor sit</p>
          <p className='text-info'>Lorem ipsum dolor sit amet</p>
          <p className='text-info'>Lorem ipsum amet</p>
        </div>
      </div>
      <div>
        <div className='flex flex-col items-center justify-center mb-3'>
        <RiAlertLine className='h-8 w-8 text-white-500'/>
          <h2>Example</h2>
        </div>
        <div className='space-y-2'>
          <p className='text-info'>Lorem ipsum dolor sit</p>
          <p className='text-info'>Lorem ipsum dolor sit amet</p>
          <p className='text-info'>Lorem ipsum amet</p>
        </div>
      </div>
      <div>
        <div className='flex flex-col items-center justify-center mb-3'>
        <BsLightningCharge className='h-8 w-8 text-white-500'/>
          <h2>Example</h2>
        </div>
        <div className='space-y-2'>
          <p className='text-info'>Lorem ipsum dolor sit</p>
          <p className='text-info'>Lorem ipsum dolor sit amet</p>
          <p className='text-info'>Lorem ipsum amet</p>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default page

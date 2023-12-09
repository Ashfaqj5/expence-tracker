import React from 'react'

export default function Expence({data}) {
  return (
    <div className='w-full m-2 p-3 bg-slate-100'>
        
        <div className='flex justify-between'>
            <span className='text-3xl'>{data?.category_name}</span>
            <span>{data?.amount}/-</span>
            <span>{data?.date}</span>
        </div>
        <div>{data?.description}</div>

    </div>
  )
}

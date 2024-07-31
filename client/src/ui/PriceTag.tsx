import React from 'react'
import { Props } from 'react-loader-spinner'
import FormattedPrice from './FormattedPrice';
import { twMerge } from 'tailwind-merge';

interface Props{
    regularPrice?: number ;
    discountedPrice?: number;
    className?: string;
}
const PriceTag = ({regularPrice,discountedPrice,className}:Props) => {
  return (
    <div className={twMerge('flex items-center gap-2',className)}>
        <p className='line-through text-gray-500 font-medium'><FormattedPrice amount={regularPrice} /></p>
        <p className='font-bold text-skyText'><FormattedPrice amount={discountedPrice}/></p>
    </div>
  )
}

export default PriceTag
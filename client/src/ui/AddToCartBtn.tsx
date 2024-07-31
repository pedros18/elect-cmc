import React from 'react'
import { twMerge } from 'tailwind-merge';
import { ProductProps } from '../../type';
import { store } from '../lib/store';
interface Props{
    className?:string;
    title?:string;
    product?:ProductProps;
}
const AddToCartBtn = ({className,title,product}:Props) => {
    const newClassName = twMerge('bg-[f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer',className);
    const {addToCart,cartProduct}= store();
    const handleAddToCart=()=>{
      console.log(product);
    }
  return (
    <button onClick={handleAddToCart} className={newClassName}>
        {title ? title : 'Add To Cart'}
    </button>
  )
}

export default AddToCartBtn
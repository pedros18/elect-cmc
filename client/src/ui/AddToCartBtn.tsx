import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProductProps } from '../../type';
import { store } from '../lib/store';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus } from 'react-icons/fa';
import PriceTag from './PriceTag';

interface Props {
  className?: string;
  title?: string;
  product?: ProductProps;
  showPrice?: boolean;
}

const AddToCartBtn = ({ className, title, product, showPrice = true}: Props) => {
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(null);

  const { addToCart, cartProduct, decreaseQuantity } = store();

  useEffect(() => {
    const availableItem = cartProduct.find((item) => item?._id === product?._id);
    setExistingProduct(availableItem || null);
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product?.name.substring(0, 10)} added successfully`);
    } else {
      toast.error('Product is undefined');
    }
  };

  const handleDecreaseQuantity = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        decreaseQuantity(existingProduct?._id);
        toast.success(`${product?.name.substring(0, 10)} quantity decreased successfully`);
      } else {
        toast.error('Cannot decrease quantity less than 1');
      }
    }
  };

  const mergedClassName = twMerge(
    'bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer',
    className
  );

  const getRegularPrice = () => {
    if (existingProduct && product) {
      return product.regularPrice * existingProduct?.quantity;
    }
    return product?.regularPrice;
  };

  const getDiscountedPrice = () => {
    if (existingProduct && product) {
      return product.discountedPrice * existingProduct?.quantity;
    }
    return product?.discountedPrice;
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag regularPrice={getRegularPrice()} discountedPrice={getDiscountedPrice()} />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDecreaseQuantity}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-sky-500 rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-sky-500 rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className={mergedClassName}>
          {title || 'Add To Cart'}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;

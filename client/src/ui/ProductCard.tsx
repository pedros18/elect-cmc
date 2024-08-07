import React, { useState } from 'react';
import { ProductProps } from '../../type';
import { MdOutlineStarOutline } from 'react-icons/md';
import AddToCartBtn from './AddToCartBtn';
import { Button, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import FormattedPrice from './FormattedPrice';
import ProductCardSideNav from './ProductCardSideNav';
import { useNavigate } from 'react-router-dom';
import PriceTag from './PriceTag';

interface Props {
  product: ProductProps;
  setSearchText?: (text: string) => void;
}

const ProductCard = ({ product, setSearchText }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const percentage = ((product?.regularPrice - product?.discountedPrice) / product?.regularPrice) * 100;

  const handleProduct = () => {
    navigate(`/product/${product?._id}`);
    if (setSearchText) {
      setSearchText('');
    }
  };

  return (
    <div className='border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black duration-200 cursor-pointer'>
      <div className='w-full h-60 relative p-2 group'>
        <span onClick={openDialog} className='bg-black text-skyText absolute top-2 left-2 w-16 text-xs text-center py-1 rounded-md font-semibold z-10'>
          Save {percentage.toFixed(0)}%
        </span>
        <img
          onClick={handleProduct}
          src={product?.images[0]}
          alt='productItems'
          className='w-full h-full rounded-md object-cover group-hover:scale-110 duration-300'
        />
        <ProductCardSideNav product={product}/>
      </div>
      <div className='flex flex-col gap-2 px-2 pb-2'>
        <h3 className='text-xs uppercase font-semibold text-lightText'>{product?.overView}</h3>
        <h2 className='text-lg font-bold line-clamp-2'>{product?.name}</h2>
        <div className='text-base text-lightText flex items-center'>
          {Array.from({ length: 5 }).map((_, index) => (
            <MdOutlineStarOutline key={index} className="text-yellow-500" />
          ))}
        </div>
        <PriceTag regularPrice={product?.regularPrice} discountedPrice={product?.discountedPrice} className='text-xl' />
        <AddToCartBtn product={product} />
      </div>
      <Transition appear show={isOpen}>
        <Dialog className='relative z-10 focus:outline-none' onClose={closeDialog}>
          <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Transition.Child
                enter='ease-out duration-300'
                enterFrom='opacity-0 transform scale-95'
                enterTo='opacity-100 transform scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform scale-100'
                leaveTo='opacity-0 transform scale-90'
              >
                <DialogPanel className='w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6'>
                  <DialogTitle as='h3' className='text-white text-base font-medium'>
                    Hurry Up!
                  </DialogTitle>
                  <p className='mt-2 text-sm leading-6 text-white/50'>
                    You are going to save{" "}
                    <span className='text-skyText'>
                      <FormattedPrice amount={product?.regularPrice - product?.discountedPrice} />{" "}
                    </span>
                  </p>
                  <p className='text-sm leading-6 text-white/50'>
                    Enjoy our products with the best quality and prices!
                  </p>
                  <div className='mt-4'>
                    <Button
                      className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600'
                      onClick={closeDialog}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ProductCard;

import React from 'react';
import Container from '../ui/Container';
import { store } from '../lib/store';
import { Link } from 'react-router-dom';
import FavoriteProduct from '../ui/FavoriteProduct';

const Favorite = () => {
  const { favoriteProduct } = store();

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <div>
          <div className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Favorite Products Cart
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-[500px] tracking-wide">
              These are your favorite products! Go buy them now!
            </p>
            <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
              <div className="-my-6 divide-y divide-gray-200">
                {favoriteProduct.map((product) => (
                  <FavoriteProduct key={product?._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-96 flex flex-col items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6 mb-6">
            Nothing added to Favorites
          </p>
          <Link
            to="/product"
            className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
          >
            Go To Shopping
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Favorite;

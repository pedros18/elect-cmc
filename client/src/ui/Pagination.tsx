import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import { getData } from '../lib';
import { ProductProps } from '../../type';
import ReactPaginate from 'react-paginate';
import ProductCard from './ProductCard';

interface ItemsProps {
  currentItems: ProductProps[];
}

const Items = ({ currentItems }: ItemsProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
      {currentItems && currentItems.map((item: ProductProps) => (
        <ProductCard key={item?._id} product={item} />
      ))}
    </div>
  );
};

const Pagination = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/products`;
     

      try {
        const data = await getData(endpoint);
        
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage = 15;
  const endOffset = itemOffset + itemsPerPage;
  const itemStart = itemOffset + 1;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className='flex flex-col md:flex-row justify-center md:justify-between items-center'>
        <ReactPaginate
          nextLabel=''
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=''
          pageLinkClassName='w-9 h-9 border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center'
          pageClassName='mr-6'
          containerClassName='flex text-base font-semibold py-10'
          activeClassName='bg-black text-whiteText'
        />
      </div>
      <p>
        Products from {itemStart} to {Math.min(endOffset, products.length)}{" "}
        of {products.length}
      </p>
    </>
  );
};

export default Pagination;

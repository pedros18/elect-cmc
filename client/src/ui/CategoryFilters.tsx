import React, { useState, useEffect } from 'react';
import { config } from '../../config';
import { getData } from '../lib';
import { RotatingLines } from 'react-loader-spinner';
import { CategoryProps } from '../../type';
import { Link } from 'react-router-dom';

interface Props {
  id: string | undefined;
}

const CategoryFilters: React.FC<Props> = ({ id }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;

      try {
        setLoading(true);
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.log('error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='hidden md:inline-flex flex-col gap-6'>
      <p className='text-3xl font-bold'>Filters</p>
      <div>
        <p className='text-sm uppercase font-semibold underline underline-offset-2 decoration-[1px] mb-6'>
          Select Categories
        </p>
        <div className='flex flex-col gap-y-2 min-w-40'>
          {loading ? (
            <div className='flex items-center justify-center my-5'>
              <RotatingLines
                visible={true}
                strokeWidth='5'
                animationDuration='0.75'
                ariaLabel='rotating-lines-loading'
                width='50'
              />
            </div>
          ) : (
            categories.map((item) => (
              <Link
                to={`/category/${item._base}`}
                key={item._id}
                className={`text-base font-medium text-start underline underline-offset-2 decoration-[1px] decoration-transparent hover:decoration-gray-950 hover:text-black duration-200 ${
                  item._base === id ? 'text-greenText decoration-greenText' : 'text-lightText'
                }`}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;

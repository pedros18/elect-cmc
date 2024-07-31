//cette page pour les 3 photos avec scale 

import React, { useEffect, useState } from 'react';
import Container from './Container';
import { HighlightsType } from '../../type';
import { config } from '../../config';
import { getData } from '../lib';
import { Link } from 'react-router-dom';

const Highlights = () => {
  const [highlightsData, setHighlightsData] = useState<HighlightsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/highlights`;
      try {
        const data = await getData(endpoint);
        setHighlightsData(data);
      } catch (error) {
        console.log('error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {highlightsData.map((item: HighlightsType) => (
        <div key={item?._id} className='relative h-60 rounded-lg shadow-md cursor-pointer overflow-hidden group'>
          <div
            className='absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110'
            style={{
              backgroundImage: `url(${item?.image})`,
              color: item?.color,
            }}
          />
          <div className='relative z-10 p-6 flex
          flex-col justify-between h-full' style={{color:item?.color}}>
           <div >
            <h3 className='text-2xl font-bold max-w-44'>{item?.name}</h3>
            <p className='text-base font-bold mt-4'>{item?.title}</p>
           </div>
           <Link to={item?._base} className='text-base
           font-normal'>{item?.buttonTitle}</Link>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Highlights;

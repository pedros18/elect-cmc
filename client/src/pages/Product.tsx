import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { config } from '../../config';
import { ProductProps } from '../../type';
import { getData } from '../lib';
import Loading from '../ui/Loading';
import Container from '../ui/Container';
import _ from 'lodash';
import PriceTag from '../ui/PriceTag';
import { MdOutlineStarOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import FormattedPrice from '../ui/FormattedPrice';
import { IoClose } from 'react-icons/io5';
import AddToCartBtn from '../ui/AddToCartBtn';
import ProductCard from '../ui/ProductCard'; // Make sure to import your ProductCard component
import CategoryFilters from '../ui/CategoryFilters';

const Products = () => {
  const [productData, setProductData] = useState<ProductProps | null>(null);
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = id 
        ? `${config?.baseUrl}/products/${id}` 
        : `${config?.baseUrl}/products`;

      try {
        setLoading(true);
        const data = await getData(endpoint);
        if (id) {
          setProductData(data);
          setAllProducts([]);
        } else {
          setAllProducts(data);
          setProductData(null);
        }
      } catch (error) {
        console.log('error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (productData) {
      setImgUrl(productData?.images[0]);
      const savedColor = localStorage.getItem(`selectedColor-${id}`);
      if (savedColor) {
        setColor(savedColor);
      } else {
        setColor(productData?.colors[0]);
      }
    }
  }, [productData, id]);

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);
    localStorage.setItem(`selectedColor-${id}`, selectedColor);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          {!!id && productData && _.isEmpty(allProducts) ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className='flex flex-start'>
                <div>
                  {productData?.images?.map((item, index) => (
                    <img
                      src={item}
                      alt='img'
                      key={index}
                      className={`w-24 cursor-pointer opacity-80 hover:opacity-100 duration-300 ${
                        imgUrl === item && 'border border-gray-500 rounded-sm opacity-100'
                      }`}
                      onClick={() => setImgUrl(item)}
                    /> 
                  ))}
                </div>
              <div className=''>
                <img src={imgUrl} alt='main image' />
              </div>
            </div>
             <div className='flex flex-col gap-4'>
               <h2 className='text-3xl font-bold'>
                {productData?.name}
               </h2>
               <div className='flex items-center justify-between'>
                <PriceTag 
                regularPrice={productData?.regularPrice}
                discountedPrice={productData?.discountedPrice} 
                className='text-xl'  />
                <div className='flex items-center gap-1'>
                  <div className='text-base text-lightText flex
                  items-center'>
                   
                      {Array.from({ length: 5 }).map((_, index) => (
                        <MdOutlineStarOutline key={index} className="text-yellow-500" />
                      ))}
        
                  </div>
                  <p className='text-base font-semibold'>
                    {`(${productData?.reviews} reviews)`}
                  </p>
                </div>
               </div>
               <p className='flex items-center'>
                <FaRegEye className='mr-1' />{" "}
                <span className='font-semibold mr-1'>{productData?.reviews}</span> 
                people are viewing this right now
               </p>
               <p>
                you are saving {" "}
                <span className='text-base font-semibold text-green-500'>
                  <FormattedPrice
                  amount={
                    productData?.regularPrice! -
                    productData?.discountedPrice!
                  }
                 />
                </span>{" "}
                upon purchase
                  </p> 
                  <div >
                     {color && (
                      <p className='font-semibold mb-1'>
                        Color:{" "}
                        <span className='capitalize' style={{ color: color }}>
                          {color}
                        </span>
                      </p>
                     )}

                    <div className='flex flex-cols gap-3'>
                      {productData?.colors.map((item)=>(
                         <div key={item} className={`${item === color 
                          ? "border border-black p-1 rounded-full" 
                          : "border-transparent"
                        }`}
                      >
                        <div className='w-10 h-10 rounded-full
                        cursor-pointer' style={{backgroundColor: item}}
                        onClick={()=> handleColorChange(item) }/>
                      </div>
                      ))}
                      
                    </div>
                    {color && (
                      <button onClick={()=> handleColorChange(" ")} className='font-semibold mt-1 flex items-center gap-1 hover:text-red-600 duration-200'>
                       <IoClose /> Clear
                      </button>
                    )}
                    <p className='mt-4 mb-4'>
                      Brand:{" "}
                      <span className='font-medium'>{productData?.brand}</span>
                    </p>
                    <p>
                      Category:{" "}
                      <span className='font-medium'>{productData?.category}</span>
                    </p>
                    <PriceTag 
                      regularPrice={productData?.regularPrice}
                      discountedPrice={productData?.discountedPrice} 
                      className='text-x mt-4 mb-4'  />
                    <AddToCartBtn title='Buy Now' className='bg-black/80 py-3 px-20 
                     text-base text-gray-200 hover:scale-100 hover:text-white duration-200 mt-4'/>
                     
                  </div>
             </div>
            </div>
          ) : (
          <div className='flex items-start gap-10'>
            <CategoryFilters id={id}/>
           <div>
              <p className='text-4xl font-semibold mb-5 text-center'>Product Collection</p>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {allProducts?.map((item: ProductProps) => (
                  <ProductCard
                    product={item}
                    key={item?._id}
                    onClick={() => handleProductClick(item._id)}
                  />
                ))}
              </div>
            </div>
          </div>
          )}
        </Container>
      )}
    </div>
  );
}

export default Products;

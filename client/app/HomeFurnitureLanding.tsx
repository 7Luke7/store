import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Rating from './(Components)/Rating'
import { request_home_furniture_data_landing } from './(Components)/request'
import Cart from './(Components)/CartComponent'

const HomeFurnitureLanding = async () => {
  const HomeFurnitureData = await request_home_furniture_data_landing()
  return (
    <div className='mt-20'>
      <div className='flex pl-20 md:pl-10 sm:pl-10 xs:pl-10 items-end lg:pl-10 gap-2'>
          <h2 className='text-lg text-gray-300'>Home & Furniture</h2>
          <Link aria-label='See all products of Home & Furniture' href="/home-furniture?page=1" className='text-blue-400 underline'>
            See all
          </Link>
      </div>
    <div className='grid grid-cols-4 md:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 sm:pl-0 xs:grid-cols-none xl:pl-0 xs:grid-rows-4 justify-items-center xs:justify-center xs:pl-0 md:pl-0 pl-12 mt-2'>
      {HomeFurnitureData.map((product: any) => {
        return <div className='overflow-hidden mb-10 hover:border hover:border-gray-900 rounded-t-xl w-80 xl:w-72 sm:w-72 md:w-60 lg:w-72' key={product["_id"]}>
          <Link href={`product/${product._id}`}>
          <div className='relative h-52'>
            <Image alt={product.title} src={product["thumbnail"] } sizes='w-full' fill={true} priority={false}></Image>
          </div>
          </Link>
          <div className='p-2 flex flex-col justify-between'>
          <div className='flex  justify-around'>
            <div>
              <Link href={`product/${product.id}`}>
              <h2 className='text-white'>{product["title"]}</h2>
              </Link>
              <Link href={`product/${product.id}`}>
              <p className='text-sm text-gray-500 w-7/12 font-normal'>{product["description"].slice(0, 40)}...</p>
              </Link>
            </div>
            <div className='flex flex-col'>
              <p className='text-gray-600 line-through text-xs'>${
                Math.round((product["price"] / 100 )* product["discountPercentage"] + product["price"])
              }</p>
              <p className='text-slate-50 text-md pl-1'>${product["price"]}</p>
              <p className='text-gray-500 text-xs pl-1 pt-1'>{product["stock"]} in stock</p>
            </div>
          </div>
          <div className='flex justify-between items-center'>
          <div className='flex justify-center items-end space-x-1 md:items-center'>
            <Rating rating={product["rating"]}></Rating>
          </div>
          <div>
            <Cart>
              {product}
            </Cart>
          </div>
          </div>
          </div>
        </div>
      })}
    </div>
    </div>
  )
}

export default HomeFurnitureLanding
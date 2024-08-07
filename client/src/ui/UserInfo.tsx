import React from 'react'
import { UserTypes } from '../../type';
import Container from './Container';
import toast from 'react-hot-toast';
import { auth } from '../lib/firebase';


const UserInfo = ({currentUser}:UserTypes) => {
    console.log(currentUser);
    
  return (
    <Container className='py-5'>
        <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-24
        shadow-2xl sm:rounded-3xl sm:px-16'>
          <div className='flex flex-col sm:flex-row items-center gap-5
          sm:gap-10'>
            <img src={currentUser?.avatar ? currentUser?.avatar :
            'https://www.google.com/imgres?q=data%20scientist%20picture&imgurl=https%3A%2F%2Fwww.cio.com%2Fwp-content%2Fuploads%2F2023%2F08%2Fdata_science_classes-100682563-orig.jpg%3Fquality%3D50%26strip%3Dall&imgrefurl=https%3A%2F%2Fwww.cio.com%2Farticle%2F230532%2Fwhat-is-a-data-scientist-a-key-data-analytics-role-and-a-lucrative-career.html&docid=cP4-JBK4DHZRFM&tbnid=b25ftxRPx5DiBM&vet=12ahUKEwiM4dyez-CHAxXozQIHHZCIKS8QM3oECB0QAA..i&w=2123&h=1412&hcb=2&ved=2ahUKEwiM4dyez-CHAxXozQIHHZCIKS8QM3oECB0QAA'}
        alt='userImage'className='w-40 h-40 rounded-full
        border -gray-700 object-cover p-1'/>
        <div className='text-start flex-1 '>
            <h2 className='text-xl font-bold tracking-tight sm:text-4xl text-white'>Welcome back, dear{" "}
                <span className='underline underline-offset-2 decoration-[1px] font-medium'>{currentUser?.firstName } {} {currentUser?.lastName}</span>
            </h2>
            <p className='text-start *:mt-6 max-w-3xl text-base mt-3 leading-6
            text-gray-300'>welcome to this e-commerce website , where you can buy any electronic product online , this is your Profile where al your informations are saved. have a nice shopping!</p>
        </div>
          </div>
          <div className='mt-10 flex items-center gap-x-5 px-4'>
            <button className='rounded-md bg-white px-8 py-2.5 text-smfont-semibold text-gray-900 hover:bg-gray-100
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-skyText' onClick={()=>
                toast.error("edit profile option available to pro version!")
            }>Edit profile</button>
            <button className='rounded-md bg-white px-8 py-2.5 text-smfont-semibold text-gray-900 hover:bg-gray-100
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-skyText ' onClick={()=>
                toast.error("add adresse option available to pro version!")
            }>Add adresse</button>
            <button className='rounded-md bg-white px-8 py-2.5 text-smfont-semibold text-gray-900 hover:bg-gray-100
            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-red-600' onClick={()=> auth.signOut()}>Logout</button>
          </div>
          <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>

        </div>
    </Container>
  )
}

export default UserInfo
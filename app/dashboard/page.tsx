"use client";
import React from 'react'
import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Dashboard =() => {

    const {user}=useUser();
    const create= useMutation(api.documents.create);

    const onCreate=()=>{
      const promise = create({title: "New Note"})
      console.log("si");
    }
    
    return (
    <div className='h-full flex flex-col items-center justify-center'>  
      <h1 className='text-5xl font-extrabold text-justify text-[#F0EDCF]'>
        Hi there {user?.firstName}!
      </h1>
      <div className='mt-6'></div>
      <Image
        src="/blackKitten.png"
        height={400}
        width={400}
        alt="Empty workspace"

      />
      <Button  onClick={onCreate} className='mt-3 bg-[#F0EDCF] text-lg flex items-center'>
        select or create a new workspace
        <PlusCircleIcon className='h-5 w-5 ml-2 justify-center'/>
      </Button>
    </div>
  )
}

export default Dashboard;


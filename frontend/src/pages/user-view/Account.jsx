import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/user-view/Address'
import Orders from '@/components/user-view/Orders'


import React from 'react'

const Account = () => {
  return (
    <div className='text-black  w-full mt-20 flex flex-col '>
      <div className='w-full  '>
        <img src='/saleBanner/saleBanner4.jpg' className='w-full h-[300px] object-cover object-center '/>
      </div>

      <div className='w-full '>
<div className='flex flex-col rounded-sm border'>
<Tabs defaultValue="orders"  >
<TabsList>
<TabsTrigger value="orders">Orders</TabsTrigger>
<TabsTrigger value="address">Address</TabsTrigger>


</TabsList>

<TabsContent value='orders'><Orders/></TabsContent>
<TabsContent value='address'><Address/></TabsContent>

</Tabs>
</div>
      </div>
    </div>
  )
}

export default Account

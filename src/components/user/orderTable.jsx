"use client"

import React from 'react';
import {useGetOrdersQuery} from '../../store/services/CheckOutApi'
import Link from 'next/link';
import {
  Table,
  TableBody,

  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const OrderTable = ({user}) => {

const {data} = useGetOrdersQuery(user?.id)

const orders= data?.orders
const filteruser = orders?.filter((item)=> item.user === user.id)

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "";
  }
}
if (!filteruser) return <h2>Loading....</h2>
  return (
    <div >
    
    <h1 className="sm:text-3xl text-xl font-bold text-center mb-8">My Orders</h1>
    <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Status</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteruser.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium"><Link href={`/profile/order/${invoice._id}`}>{truncateText(invoice._id,5)}</Link></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.status}</TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
    </div>
 
  );
};

export default OrderTable;

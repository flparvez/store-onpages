"use client"
import React from 'react'
import Link from 'next/link';
import { useDeleteOrderMutation } from '@/store/services/CheckOutApi'; 

import {
  Table,
  TableBody,

  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
const OrderList = ({orderData,user}) => {
    
    const [deleteOrder] = useDeleteOrderMutation(); 
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + "";
        }
      }
      const userId =user?.id;
     
    
      if (userId) {
        const handleDelete = async (id) => {
          await deleteOrder({id, userId}).unwrap();
          };
  
          
 
  return (
    <div className="overflow-x-auto">
    <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Delete</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium"><Link href={`/admin/order/${invoice._id}`}>{truncateText(invoice._id,5)}</Link></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell><button onClick={() => handleDelete(invoice?._id)}>Delete</button></TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
    </div>
  )
}
}
export default OrderList;

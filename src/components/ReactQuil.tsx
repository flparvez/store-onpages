import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Quill styles
import { Button } from "@/components/ui/button"; // Example of using Shadcn UI component

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function RichTextEditor({ value, onChange }:any) {
  const modules = {
    toolbar: [
      [{ header: '1'}, { header: '2'}, { font: [] }],
      [{ list: 'ordered'}, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
      />
      <Button onClick={() => console.log('Save button from Shadcn clicked')}>Save</Button>
    </div>
  );
}

import React from 'react'
import { useSelector } from 'react-redux';

export default function DisplayScreen() {
    const { pro } = useSelector((state) => state.pro);
    console.log("pro", pro);
  return (
    <div>
      
    </div>
  )
}

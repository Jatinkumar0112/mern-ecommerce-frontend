import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export function Order() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div >
       
      
      </div>
    </div>
  );
}

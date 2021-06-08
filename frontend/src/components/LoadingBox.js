import React from 'react';
import {Spinner } from 'react-bootstrap';

export default function LoadingBox(){
  return(
    <div className='text-center py-4'>
      <Spinner
        className='spinner'
        animation='grow'
        role='status'
        variant='info'
      >
      </Spinner>
      <Spinner
        className='spinner'
        animation='grow'
        variant='info'
      >
      </Spinner>
      <Spinner
        className='spinner'
        animation='grow'
        variant='info'
      >
      </Spinner>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
import React from 'react';

export const blargh = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved')
    }, 5000);
  })
}

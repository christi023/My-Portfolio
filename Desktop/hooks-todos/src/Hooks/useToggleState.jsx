import { useState } from 'react';

export default function useToggle(initialVal = false) {
  // call useState, "reserve piece of state "
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };
  // return piece of state and a function to toggle it
  return [state, toggle];
}

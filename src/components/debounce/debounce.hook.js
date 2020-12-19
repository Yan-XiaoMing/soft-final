import {useRef} from "react";

export const useDebounce = (fn, delay = '500') => {
  const {current} = useRef({})
  function f(...args){
    if(current.timer){
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(fn.bind(undefined,...args),delay)
  }
  return f
}


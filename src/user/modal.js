import {useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { userContext } from "./userContext/userContext";
export default function Modal({children}) {
   const [isopen, setIsopen] = useState(false);
   const {state}=useContext(userContext);
   let el=document.createElement('div');
   useEffect(() => {
      el.id = 'modal';
      document.body.appendChild(el);
      setIsopen(true);
      return () => document.body.removeChild(el);
   },[]);
   return ((isopen && state.toggle))? ReactDOM.createPortal(
      <>
         {children}
      </>,
      document.getElementById('modal')
   ) : null;
}
import { useEffect, useState } from "react";
import style from "./widget.module.css";

export function Alert(props) {
    const fuel = props.fuel;
    const [state, setState] = useState(0);
  
    useEffect(() => {
      if (fuel > 1200) {
        setState(1);
      } 
    }, [fuel]);
  
    if (state) {
      return <div aria-live="polite" className={style.alert}>Alert</div>;
    } else {
      return <div aria-live="polite">All is fine</div>;
    }
  }
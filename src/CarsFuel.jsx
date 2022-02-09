import style from "./widget.module.css";

export function CarsFuel(props) {
    const fuel = props.fuel;
    return <div className={style.carsfuel}><span>Car's fuel consumed: </span><span>{fuel}</span></div>;
}

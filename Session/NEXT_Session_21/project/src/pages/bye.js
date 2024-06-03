import { useLocation } from 'react-router-dom';

export function Bye() {
    let location = useLocation();
    console.log(location);

    return <>Bye</>;
}

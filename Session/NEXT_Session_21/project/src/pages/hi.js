import { useLocation } from 'react-router-dom';

export function Hi() {
    let location = useLocation();
    console.log(location);

    return <>HI</>;
}

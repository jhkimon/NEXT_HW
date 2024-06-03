import { useLocation } from 'react-router-dom';

export function Home() {
    let location = useLocation();
    console.log(location);

    return <>Home</>;
}

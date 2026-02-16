import {Link} from 'react-router-dom';

export default function Navbar(){
    return(
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Products</Link>
            <Link to="/movements">Movements</Link>
        </nav>
    );
}
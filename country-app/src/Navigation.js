import { Link } from "react-router-dom";

export default function Navigation(){
    return <header>
        
        <nav>
            <ul>
                <li>
                    <Link to={`/`}>CURRENCY EXCHANGE</Link>
                </li>
                <li>
                    <Link to={`/airports`}>AIRPORTS</Link>
                </li>
            </ul>
        </nav>
    </header>
}
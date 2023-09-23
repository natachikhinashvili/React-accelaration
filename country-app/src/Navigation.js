import { Link } from "react-router-dom";

export default function Navigation(props){
    return <header>
        
        <nav>
            <ul>
                <li>
                    <Link to={`/${props.props.cca3}`}>CURRENCY EXCHANGE</Link>
                </li>
                <li>
                    <Link to={`/${props.props.cca3}/airports`}>AIRPORTS</Link>
                </li>
            </ul>
        </nav>
    </header>
}
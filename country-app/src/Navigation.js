import { Link, useLocation } from "react-router-dom";

export default function Navigation(props){
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const baseRoute = `${pathSegments[1]}`;
    let parameters = props.props;

    if(!props.props){
        parameters = baseRoute;
    }else{
        parameters = props.props.cca2
    }
    
    return <header>
        
        <nav id="navigation">
            <ul>
                <li>
                    <Link to={`/${parameters}`}>CURRENCY EXCHANGE</Link>
                </li>
                <li>
                    <Link to={`/${parameters}/airports`}>AIRPORTS</Link>
                </li>
            </ul>
        </nav>
    </header>
}
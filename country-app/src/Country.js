export default function Country(props){
    console.log(props)
    return (
        <div>   
            <div id="header">
            <h1>{props.country.name.common}</h1>
            <h2>{props.country.flag}</h2>
            </div>
            <div id="content">
                <div>
                    <p><b>Capital: </b>{props.country.capital[0]}</p>
                    <p><b>Continent: </b>{props.country.continents[0]}</p>
                </div>
                <div>
                    <p><b>Population: </b>{props.country.population}</p>
                    <p><b>Region: </b>{props.country.region}</p>
                    <div id="border-container">
                    <p><b>Borders: </b></p>
                    <div id="borders">
                        {props.country.borders &&
                            props.country.borders.map(element =>(
                                <p>{element}, </p>
                            ))
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
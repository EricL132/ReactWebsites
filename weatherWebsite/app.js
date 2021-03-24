import React from 'react'
import './app.css'


class app extends React.Component {
    constructor() {
        super()
        this.state = {weatherInfo:"",errorMessage:""}
        this.getWeatherInfo = this.getWeatherInfo.bind(this)
    }
    async getWeatherInfo(e) {
        e.preventDefault()
        this.setState({weatherInfo:""})
        const location = e.target[0].value
        e.target[0].value = ''
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=a7706814c0714ec3972231925211103&q=${location}&aqi=no`)
        const weather = await res.json()
        if(weather.current){
            this.state.errorMessage = ""
            this.setState({ weatherInfo: weather})
        }else{
            this.setState({errorMessage:'Location not found'})
        }

    }
    render() {
        return (
            <div className='weatehr-container'>
                <div className='container'>
                    <form className="weather-form"onSubmit={this.getWeatherInfo}>
                        <input placeholder="Search Location" className="searchInput"></input>
                        <button>Search</button>
                    </form>
                    {this.state.weatherInfo ?
                        <div className="weatherinfo-container">
                            <span>{this.state.weatherInfo['location']['name']}, {this.state.weatherInfo['location']['region']}</span>
                            <img src={this.state.weatherInfo['current']['condition']['icon']}></img>
                            <span className="temp">{this.state.weatherInfo['current']['condition']['text']}, {this.state.weatherInfo['current']['temp_f']}<sup>o</sup>F</span>
                        </div>
                        : <div style={{marginTop:'9rem',position:'absolute'}}>{this.state.errorMessage}</div>}
                </div>
                </div>
        )
    }
}


export default app
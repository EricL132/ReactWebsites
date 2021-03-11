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
        const location = e.target[0].value
        e.target[0].value = ''
        const res = await fetch(`http://api.weatherstack.com/current?access_key=1d573c8b8d81381babaec6c0ac49d617&query=${location}&units=f`)
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
                    <form onSubmit={this.getWeatherInfo}>
                        <input placeholder="Search Location" className="searchInput"></input>
                    </form>
                    {this.state.weatherInfo ?
                        <div className="weatherinfo-container">
                            <span>{this.state.weatherInfo['location']['name']}, {this.state.weatherInfo['location']['region']}</span>
                            <img src={this.state.weatherInfo['current']['weather_icons'][0]}></img>
                            <span className="temp">{this.state.weatherInfo['current']['weather_descriptions'][0]},    {this.state.weatherInfo['current']['temperature']}<sup>o</sup>F</span>
                        </div>
                        : <div style={{marginTop:'7rem',position:'absolute'}}>{this.state.errorMessage}</div>}
                </div>
                </div>
        )
    }
}


export default app
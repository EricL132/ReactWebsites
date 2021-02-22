import './App.css';
import React from 'react'
let interval
class App extends React.Component {
  constructor() {
    super()
    this.state = {finalsWeek:false}
    this.countDown = this.countDown.bind(this)
  }

  countDown() {
    this.setState({finalsWeek:true})
    const newYearsDate = new Date('May 1 2021')
    const currentDate = new Date()
    const seconds = (newYearsDate - currentDate) / 1000;
    const days = Math.floor(seconds / 3600 / 24)
    const hours = Math.floor(seconds / 3600 / 24) % 24;
    const minutes = Math.floor(seconds / 3600 / 24) % 60;
    const sec = Math.floor(seconds % 60);
    document.getElementById('Days').innerHTML = days
    document.getElementById('hours').innerHTML = hours
    document.getElementById('minutes').innerHTML = minutes
    document.getElementById('seconds').innerHTML = sec
    
  }
  componentDidMount() {
    interval = setInterval(() => {
      this.countDown();
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(interval)
  }
  render() {
    return (
      <>

    {this.state.finalsWeek?
      <div className="countdown-full">
      <h1>Finals Week</h1>
      <h2>May 1st</h2>
      <div className="countdown-container">
        <div className="count-dm days-c">
          <p className="big-text" id="Days"></p>
          <span>Days</span>
        </div>
        <div className="count-dm hours-c">
          <p className="big-text" id="hours"></p>
          <span>Hours</span>
        </div>
        <div className='count-dm minutes-c'>
          <p className='big-text' id='minutes'></p>
          <span>Minutes</span>
        </div>
        <div className='count-dm seconds-c'>
          <p className='big-text' id='seconds'></p>
          <span>Seconds</span>
        </div>
      </div>
      </div>
     : <div className="countdown-full"></div> }
     </>
    );
  }
}

export default App;

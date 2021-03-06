import React from 'react'
import './App.css'
class App extends React.Component {
  constructor() {
    super()
    this.pushNumToArray = this.pushNumToArray.bind(this)
    this.pushOperationToArray = this.pushOperationToArray.bind(this)
    this.removeOne = this.removeOne.bind(this)
    this.performOperation = this.performOperation.bind(this)
    this.performEqual = this.performEqual.bind(this)
    this.renderCurrentString = this.renderCurrentString.bind(this)
    this.handleNegateAnswer = this.handleNegateAnswer.bind(this)
    this.handleClearCurrent = this.handleClearCurrent.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.handleOneOver = this.handleOneOver.bind(this)
    this.handleSquareRoot = this.handleSquareRoot.bind(this)
    this.handleSquare = this.handleSquare.bind(this)
    this.handlePercent = this.handlePercent.bind(this)
    this.state = {
      operators: {
        '+': function (a, b) { return a + b },
        '-': function (a, b) { return a - b },
        '*': function (a, b) { return a * b },
        '/': function (a, b) { return a / b }
      },
      current: [], currentString: "", upperprint: [], previousString: "", equal: "", handleOneOver: ""
    }

  }

  performEqual() {
    if (this.state.upperprint.length != 0) {
      const uppernum = this.state.upperprint.toString().replaceAll(",", "").slice(0, -1)
      const newnum = this.state.currentString.toString()
      console.log(this.state.upperprint)
      const result = this.state.operators[this.state.upperprint[this.state.upperprint.length - 1]](parseFloat(uppernum), parseFloat(newnum)).toString()
      this.setState({ equal: uppernum.toString() + this.state.upperprint[this.state.upperprint.length - 1] + newnum.toString() + "=" })
      this.setState({ currentString: result })
      console.log(result)

    }
  }
  performOperation(oper) {
    if (!this.state.equal) {
      if (this.state.current.length === 0) {
        this.setState({
          upperprint: [this.state.upperprint[0], oper]
        }, () => {
          this.renderUpperString()
        })

      } else {
        const upperString = parseFloat(this.state.upperprint.toString().replaceAll(",", "").slice(0, -1))
        const operation = this.state.upperprint[this.state.upperprint.length - 1]
        const currentToAdd = parseFloat(this.state.current.toString().replaceAll(",", ""))
        const result = (this.state.operators[operation](upperString, currentToAdd)).toString()

        this.setState({ upperprint: [result, oper] }, () => {
          this.setState({ current: [] })
          this.setState({ currentString: result })
          this.renderUpperString()

        })

      }
    } else {
      console.log('cvx')
      console.log(this.state.currentString)
      this.setState({ upperprint: [this.state.currentString, oper] }, () => {
        console.log(this.state.upperprint)
        this.setState({ current: [] })
        this.setState({ equal: "" })
        this.renderUpperString()
      })


    }


  }


  pushOperationToArray(e) {
    if (this.state.current.length > 0) {
      const operator = e.target.innerText
      if (!this.state.upperprint.includes("*") && !this.state.upperprint.includes("+") && !this.state.upperprint.includes("/") && !this.state.upperprint.includes("-") && !this.state.equal) {
        this.setState({ upperprint: [...this.state.current, operator] }, () => {
          console.log(this.state.upperprint)
          this.renderUpperString()
          this.setState({ current: [] })
          this.setState({ currentString: "" })
        })

      } else {
        console.log("goes")
        this.performOperation(operator)
      }
    }
  }
  pushNumToArray(e) {
    const number = e.target.innerText
    this.setState({ current: [...this.state.current, number] }, () => {
      this.renderCurrentString()
      console.log(this.state.current)
    })

  }





  removeOne() {
    if (!this.state.equal) {
      this.setState({
        current: this.state.current.filter((item, i) => {
          return i !== this.state.current.length - 1;
        })
      }, () => {
        this.renderCurrentString()
        console.log(this.state.current)
      })

    } else {
      console.log(['vcx'])
      this.setState({ current: [this.state.currentString] })
      this.setState({ previousString: "" })
      this.setState({ upperprint: [] }, () => {
        this.setState({ equal: false })
        this.renderUpperString()
      })


    }

  }

  renderCurrentString() {
    const items = this.state.current.toString().replaceAll(",", "")
    if (items.length > 12) {
      this.setState({ currentString: items.substring(0, 13) })
    } else {
      this.setState({ currentString: items })
    }

  }



  renderUpperString() {

    const items = this.state.upperprint.toString().replaceAll(",", "")

    this.setState({ previousString: items })
  }

  handleNegateAnswer() {
    this.setState({ upperprint: [] }, () => {
      if (this.state.currentString.includes('-')) {
        console.log('vcx')
        this.setState({ current: [this.state.currentString.substring(1)] }, () => {
          this.setState({ previousString: "" })
          this.setState({ equal: false })
          this.renderCurrentString()
        })

      } else {
        this.setState({ current: ["-" + this.state.currentString] }, () => {
          this.setState({ previousString: "" })
          this.setState({ equal: false })
          this.renderCurrentString()
          console.log(this.state.current)
        })

      }
    })

  }


  clearAll() {
    this.setState({ equal: false })
    this.setState({ current: [] })
    this.setState({ currentString: "" })
    this.setState({ upperprint: [] })
    this.setState({ previousString: "" })
  }

  handleClearCurrent() {
    if (this.state.equal) {
      this.setState({ equal: false })
      this.setState({ current: [] })
      this.setState({ currentString: "" })
      this.setState({ upperprint: [] })
      this.setState({ previousString: "" })

    } else {
      this.setState({ current: [] })
      this.setState({ currentString: "" })
    }
  }

  handleOneOver() {
    if (this.state.currentString !== "") {
      const res = this.state.operators["/"](1, parseFloat(this.state.currentString)).toString()
      this.setState({ current: [res] })
      this.setState({ upperprint: [] })
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString()
      })
    }
  }

  handleSquareRoot() {
    if (this.state.currentString !== "") {
      const res = Math.sqrt(parseFloat(this.state.currentString)).toString()
      this.setState({ current: [res] })
      this.setState({ upperprint: [] })
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString()
      })
    }
  }

  handleSquare() {
    if (this.state.currentString !== "") {
      const res = this.state.operators["*"](parseFloat(this.state.currentString), parseFloat(this.state.currentString)).toString()
      this.setState({ current: [res] })
      this.setState({ upperprint: [] })
      this.setState({ previousString: "" }, () => {
        this.renderCurrentString()
      })
    }
  }

  handlePercent(){
    if(this.state.currentString!==""){
      if(this.state.previousString!==""){
        const res = ((parseFloat(this.state.previousString)/100)*parseInt(this.state.currentString)).toString()
        this.setState({current:[res]})
        this.setState({ upperprint: [] })
        this.setState({ previousString: "" }, () => {
          this.renderCurrentString()
        this.setState({equal:true})
        })
      }else{
        this.setState({current:[]})
        this.setState({currentString:["0"]})
        this.setState({previousString:""})

      }
    }
  }

  render() {
    return (
      <div className="calculator-whole-container">
        <div className="calculator-container">
          <div className="calculator-screen">
            {!this.state.equal ?
              <div className="previous-string">{this.state.previousString}</div>
              : <div className="previous-string">{this.state.equal}</div>}

            <div className="current-string">{this.state.currentString}</div>
          </div>
          <div className="keys-screen">
            <div className="calculator-key" onClick={this.handlePercent}><span>%</span></div>
            <div className="calculator-key" onClick={this.handleClearCurrent}><span>CE</span></div>
            <div className="calculator-key" onClick={this.clearAll}><span>C</span></div>
            <div className="calculator-key" onClick={this.removeOne}><span ><i className="fas fa-backspace"></i></span></div>
            <div className="calculator-key" onClick={this.handleOneOver}><span>1/x</span></div>
            <div className="calculator-key" onClick={this.handleSquare}><span>x^2</span></div>
            <div className="calculator-key" onClick={this.handleSquareRoot}><span>2<i className="fas fa-square-root-alt"></i></span></div>
            <div className="calculator-key" onClick={this.pushOperationToArray}><span>/</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>7</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>8</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>9</span></div>
            <div className="calculator-key" onClick={this.pushOperationToArray}><span>*</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>4</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>5</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>6</span></div>
            <div className="calculator-key" onClick={this.pushOperationToArray}><span>-</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>1</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>2</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>3</span></div>
            <div className="calculator-key" onClick={this.pushOperationToArray}><span>+</span></div>
            <div className="calculator-key" onClick={this.handleNegateAnswer}><span>+/-</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>0</span></div>
            <div className="calculator-key" onClick={this.pushNumToArray}><span>.</span></div>

            <div className="calculator-key" onClick={this.performEqual}><span>=</span></div>

          </div>
        </div>
      </div>
    )
  }
}


export default App;
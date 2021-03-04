import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            quizData: [{
                question: 'what is 5+2',
                a: '10',
                b: '123',
                c: '32',
                d: '7',
                correct: 'd'
            }, {
                question: 'what is 7+3',
                a: '10',
                b: '645',
                c: '23',
                d: '656',
                correct: 'a'
            }, {
                question: 'what is 656+22',
                a: '432',
                b: '777',
                c: '678',
                d: '656',
                correct: 'c'
            }
                , {
                question: 'what is 46+33',
                a: '79',
                b: '32',
                c: '77',
                d: '56',
                correct: 'a'
            }, {
                question: 'what is 486+321',
                a: '1222',
                b: '765',
                c: '754',
                d: '807',
                correct: 'd'
            }
            ],
            questionNumber: 0,
            score: 0
        }
        this.clickedSubmit = this.clickedSubmit.bind(this)
        this.loadQuiz = this.loadQuiz.bind(this)
    }
    componentDidMount() {
        this.loadQuiz()
    }
    loadQuiz() {
        const currentQuestin = this.state['questionNumber']
        const askQ = document.getElementById('askQ')
        const questionA = document.getElementById('quizA-question')
        const questionB = document.getElementById('quizB-question')
        const questionC = document.getElementById('quizC-question')
        const questionD = document.getElementById('quizD-question')
        askQ.innerHTML = this.state['quizData'][currentQuestin]['question']
        questionA.innerHTML = this.state['quizData'][currentQuestin]['a']
        questionB.innerHTML = this.state['quizData'][currentQuestin]['b']
        questionC.innerHTML = this.state['quizData'][currentQuestin]['c']
        questionD.innerHTML = this.state['quizData'][currentQuestin]['d']
    }
    clickedSubmit() {
        if (this.state['questionNumber'] < 4) {
            const answers = document.querySelectorAll('.answer')
            answers.forEach((answer) => {
                if (answer.checked) {
                    this.state['selectedAnswer'] = answer
                }
            })
            if (this.state['selectedanswer'] != '') {
                if (this.state['selectedAnswer'].id == this.state['quizData'][this.state['questionNumber']]['correct']) {
                    this.state['score']++

                }
                answers.forEach((answer) => {
                    answer.checked = false
                })
                this.state['questionNumber']++
                this.loadQuiz()
            } else {
            }
        } else {
            const quiz = document.getElementById('quiz')
            quiz.innerHTML = 'Quiz finised you scored ' + this.state['score'] + '/5'
            quiz.style.padding = '2rem'
        }

    }
    render() {
        return (
            <div className='quiz-con'>
                <div className='qiuz-container' id='quiz'>
                    <div className='quiz-header'>
                        <h2 id='askQ'>Question</h2>
                        <ul>
                            <li>
                                <input type='radio' id='a' name='answer' className='answer'></input>
                                <label id='quizA-question' htmlFor='a'>Question</label>
                            </li>
                            <li>
                                <input type='radio' id='b' name='answer' className='answer'></input>
                                <label id='quizB-question' htmlFor='b'>Question</label>
                            </li>
                            <li>
                                <input type='radio' id='c' name='answer' className='answer'></input>
                                <label id='quizC-question' htmlFor='c'>Question</label>
                            </li>
                            <li>
                                <input type='radio' id='d' name='answer' className='answer'></input>
                                <label id='quizD-question' htmlFor='d'>Question</label>
                            </li>
                        </ul>

                    </div>
                    <button onClick={this.clickedSubmit}>Submit</button>

                </div>
            </div>

        )
    }
}

export default App;
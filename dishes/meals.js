import React from 'react'
import './app.js'


class meals extends React.Component {
    constructor(props) {
        super(props)
        this.state = { randomMealImg: "" }
        this.getInfo = this.getInfo.bind(this)
    }
    getInfo(e) {
        console.log(e)
        this.props.loadMealInfo(e)
    }

    render() {
        return (
            this.props.searchResult['meals'].map((meal, i = 10) => {

                return <div key={i} mealid={meal['idMeal']} onClick={this.getInfo}>
                    <div className="meal-header">
                        <img src={meal['strMealThumb']}></img>
                    </div>
                    <div className="meal-body">
                        <h4>{meal['strMeal']}</h4>
                        <button mealid={meal['idMeal']} className={`fav-btn ${this.state.activeFavorite}`} onClick={this.props.doFavorite}><i className="fas fa-heart"></i></button>
                    </div>
                </div>

            })

        )
    }
}

export default meals;
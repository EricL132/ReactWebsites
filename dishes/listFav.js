import React from 'react'
import './app.css'

class favList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { meals: [], mealList: [] }
        this.removeFav = this.removeFav.bind(this)
        this.showInfo = this.showInfo.bind(this)
    }
    removeFav(a) {
        this.props.removeFav(a.currentTarget.getAttribute('name'))
    }
    showInfo(e) {
        this.props.loadMealInfo(e)
    }
    render() {
        return (
            this.props.mealList.map((meals, i) => {
                return <li mealid={meals['meals'][0]['idMeal']} onClick={this.showInfo} key={i}><img src={meals['meals'][0]['strMealThumb']} ></img><span>{meals['meals'][0]['strMeal']}</span><button name={meals['meals'][0]['idMeal']} onClick={this.removeFav} className="deleteFav"><i className="fas fa-window-close"></i></button></li>
            })
        )
    }
}

export default favList;
import React from 'react'
import './app.css'

class app extends React.Component {
    constructor() {
        super()
        this.state = { gitInfo: '', searchInput: 'EricL132', repos: [] }
        this.getGithubUser = this.getGithubUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        this.getGithubUser()
    }
    handleChange(e) {
        this.setState({ searchInput: e.currentTarget.value })
    }
    async getGithubUser(e) {
        if (e) {
            e.preventDefault()
        }
        this.setState({ repos: [] })
        const res = await fetch('https://api.github.com/users/' + this.state.searchInput)
        const gitInfo = await res.json();
        this.setState({ gitInfo: gitInfo })
        const repoRes = await fetch(`https://api.github.com/users/${this.state.searchInput}/repos`)
        const repoInfo = await repoRes.json()
        repoInfo.map((repos) => {
            this.setState({ repos: [...this.state.repos, { name: repos['name'], link: repos['html_url'] }] })
        })
        this.setState({ searchInput: '' })
    }
    render() {
        return (
     
            <div className='git-container'>
                <div className='search'>
                    <form onSubmit={this.getGithubUser}>
                        <input spellCheck="false" placeholder="Github username" onChange={this.handleChange} className="searchInput" value={this.state.searchInput}></input>
                    </form>
                </div>
                <div className='profile-container'>
                    <img src={this.state.gitInfo['avatar_url']}></img>
                    <div className='userInfo'>
                        <h3>{this.state.gitInfo['name']}</h3>
                        <span>{this.state.gitInfo['bio']}</span>
                        <ul className='infoList'>
                            <li><i className="fas fa-eye"></i>{this.state.gitInfo['followers']}</li>
                            <li><i className="fas fa-heart"></i>{this.state.gitInfo['following']}</li>
                            <li><i className="fas fa-folder-open"></i>{this.state.gitInfo['public_repos']}</li>
                        </ul>
                        <strong>Open Source Repos:</strong>
                        {this.state.repos ?
                            <ul className='repo-container'>
                                {this.state.repos.map((repos, i) => {
                                    return <a target="_blank" key={i} href={repos['link']}><li className='repo-list'>{repos['name']}</li></a>
                                })}

                            </ul> : null
                        }
                    </div>
                </div>
            </div>
         
        )
    }
}


export default app;

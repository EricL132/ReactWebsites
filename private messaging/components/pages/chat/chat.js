import React from 'react'
import './chat.css'
import io from 'socket.io-client'

let socket;
class chat extends React.Component {
    constructor(props) {
        super(props)
        this.handleSendMessage = this.handleSendMessage.bind(this)
        this.handleleaveRoom = this.handleleaveRoom.bind(this)
        this.handleKeypress = this.handleKeypress.bind(this)
        this.state = { messages: [],users:[] }
        
    }
    componentDidMount() {
        try{
        this.setState({name:this.props.location.state.name.charAt(0).toUpperCase() + this.props.location.state.name.slice(1)})
        this.setState({room:this.props.location.state.room.charAt(0).toUpperCase()+this.props.location.state.room.slice(1)})
        const name = this.props.location.state.name.charAt(0).toUpperCase() + this.props.location.state.name.slice(1)
        const room = this.props.location.state.room.charAt(0).toUpperCase()+this.props.location.state.room.slice(1)
        socket = io.connect('http://localhost:9000', { transports: ['websocket', 'polling', 'flashsocket'] })
        socket.emit('join', { name, room })
        socket.on('message', (msg) => {
            socket.emit('getUsers',{room})
            if(msg.time){
                 const onlytime = msg.time.split(" ")[0]
                this.setState({messages:[...this.state.messages,{message:msg.message,type:msg.type,user:msg.user,time:onlytime}]})
            }else{
                
                this.setState({messages:[...this.state.messages,{message:msg.message,type:msg.type}]})
            }
            document.getElementById('chat-box').scrollTop =document.getElementById('chat-box').scrollHeight;

        })
        socket.emit('getUsers',{room})
        socket.on('roomUsers',(users)=>{
            this.setState({users:users})
        })
    }catch(err){
        this.props.history.push('/')
    }

    }
    handleSendMessage() {
        const msg = document.getElementsByClassName('message-input')[0].value
        if(msg.length!==0){
        this.setState({messages:[...this.state.messages,{message:msg,type:"sender",user:this.state.name,time:new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).split(" ")[0]}]},()=>{
            document.getElementById('chat-box').scrollTop =document.getElementById('chat-box').scrollHeight;

        })
        socket.emit('chatMessage', {message:msg,type:"sender"})
        document.getElementsByClassName('message-input')[0].value = ''
    }
        
    }
    handleleaveRoom(){
        socket.disconnect()
        this.props.history.push('/')
    }
    handleKeypress(e){
        const pressedkey = e.code
        if(pressedkey==="Enter"){
            this.handleSendMessage();
        }
    }
    render() {
        return (
            <div className="chatwhole-container">
                <div className="chat-container">
                    <header>
                        <h1>Chat</h1>
                        <button onClick={this.handleleaveRoom} className="leave-chat">Leave Room</button>
                    </header>
                    <div className="room-info">
                        <h2>Room Name:</h2>
                        <span>{this.state.room}</span>
                        <div className="user-info-container">
                            <h2>Users:</h2>
                            <ul>
                                {
                                    this.state.users.map((user,i)=>{
                                        return <div key={i} className="list-element">
                                        <li>{user.name}</li>
                                    </div>
                                    })
                                }
                                
                            </ul>
                        </div>
                    </div>
                    <div id="chat-box" className="chat-box">

                        {this.state.messages.map((msg,i) => {
                            if (msg.type === 'sender') {
                               return <div key={i}className="message-cont">
                                   {msg.user?
                                    <span className="message-box">{msg.time}<br></br>{msg.message}</span>
                                   : <span className="message-box">{msg.message}</span>}
                                </div>
                            } else {
                                if (msg.type === 'reciever') {
                                  return  <div key={i} className="message-cont">
                                      {msg.user?
                                        <span className="message-box-recieve">{msg.user+" "+msg.time}<br></br>{msg.message}</span>
                                        : <span className="message-box-recieve">{msg.message}</span>}
                                    </div>

                                }
                            }
                        })
                        }




                    </div>
                    <div className="message-container">
                        <input onKeyPress={this.handleKeypress} className="message-input"></input>
                        <button className="send-message" onClick={this.handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default chat
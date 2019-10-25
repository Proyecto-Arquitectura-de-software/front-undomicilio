import React, { Component } from 'react';
import axios from 'axios';
import './chat.css';

export class Chat extends Component {
  constructor() {
    super()
    this.state = {
      showChat: false,
      conversacion: []
    }
    this.showChat = this.showChat.bind(this);
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://34.69.25.250:3200/conversacion/1/1"
    }).then((res) => {
      this.setState({
        conversacion: res.data,
      })
    });
  }

  showChat(event) {
    event.preventDefault();
    this.setState({
      showChat: !this.state.showChat,
    });
  }

  render() {
    return (
      <div className="chat">
        {
          this.state.showChat
            ? (
              <div>
                <div className="conversation">
                  {
                    this.state.conversacion.map(res => (
                      <div key={res.id} id="remitente">{res.mensaje}</div>
                    ))
                  }
                </div>
                <input className="input" type="text" placeholder="Mensaje"></input>
              </div>
            )
            : (
              null
            )
        }
        <div className="button" onClick={this.showChat}>Chat</div>
      </div>
    )
  }
}
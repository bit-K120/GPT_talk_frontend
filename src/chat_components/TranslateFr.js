import React, {useState} from "react";
import "./chat.css";
import RecordBtnFr from "./RecordBtnFr";


const TranslateFr = () => {
  const [messages , setMessages] = useState([])
  const Ai_image = "/ai_translte_robot_2.png"
  const User_image = "/only face (1).jpg"
  const welcomeMessage = "Bonjour, bienvenue sur Chat.AI ! Appuyez sur \"Enregistrer\" pour commencer le processus de traduction ! Ce que vous direz sera traduit dans la langue de votre choix !"


  const appendMessage = (newMessage, type) => {
    const messageObject = {
      text: newMessage,
      type: type,
      timestamp:new Date().toISOString()
    };
    setMessages(messages=> [...messages, messageObject]);
  };


  return(
  //  <!-- Main container -->
    <div className="container">
      {/* <!-- msg-header section starts --> */}
      <div className="msg-header">
        <div className="container1">
          <img src= {User_image} className="msgimg" />
          <div className="active">
            <p style={{ fontFamily: 'Arial', fontSize: '25px' }}>Traduction</p>
          </div>
        </div>
      </div>
      {/* <!-- msg-header section ends --> */}

      {/* <!-- Chat inbox  --> */}
      <div className="chat-page">
        <div className="msg-inbox">
          <div className="chats">
            {/* <!-- Message container --> */}
            <div className="msg-page">
            {/* initial message here */}
            <div className="received-chats">
                <div className="received-chats-img">
                  <img src= {Ai_image} />
                </div>
                <div className="received-msg">
                  <div className="received-msg-inbox">
                    <p>
                      {welcomeMessage}
                    </p>
                  </div>
                </div>
              </div>

               {messages.map((msg, index) => (
                    msg.type === 'received' ? (
                      // received-chatsのレンダリング
                  <div key={index} className="received-chats">  {/*ここは後で上のやつみたいに編集*/}
                  <div className="received-chats-img">
                    <img src= {Ai_image} alt="User"/>
                  </div>
                  <div className="received-msg">
                    <div className="received-msg-inbox">
                      <p>
                       {msg.text}
                      </p>
                      <span className="time">{msg.timestamp}</span>
                    </div>
                  </div>
                 </div> 
                    ) : (
                      // outgoing-chatsのレンダリング
                      <div key={index} className="outgoing-chats">
                    <div className="outgoing-chats-img">
                      <img src={User_image} alt="User" />
                    </div>
                    <div className="outgoing-msg">
                      <div className="outgoing-chats-msg">
                        <p className="multi-msg">{msg.text}</p>
                        <span className="time">{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                    )
                  ))}
            </div>
              {/* <!-- msg-bottom section --> */}

              <div className="msg-bottom">
                <div className="input-group">
                    <RecordBtnFr onAppendMessage={appendMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
  );
};

export default TranslateFr;
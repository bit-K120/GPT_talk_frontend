import React, {useEffect, useState} from "react";
import "./chat.css";
import RecordBtnFr from "./RecordBtnFr";
import io from "socket.io-client";


const ChatFr = () => {
  const [socket,setSocket] = useState(null);
  const [messages , setMessages] = useState([])
  const Ai_image = "/French_teacher.jpg"
  const User_image = "/only face (1).jpg"
  const flaskURL = "http://localhost:8000";
  const welcomeMessage = "Bonjour, bienvenue sur Chat.AI ! Essayez de poser une question ou de partager quelque chose d'intéressant ! Appuyez sur \"Enregistrer\" pour commencer la conversation."

  useEffect(() => {
  

  const newSocket = io(flaskURL)
  setSocket(newSocket)
  // socketに接続
  newSocket.emit("welcome_message", welcomeMessage)
  console.log("SENT welcomeMessage")

  return () => {
    newSocket.disconnect();
  };

},[]);

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
            <p>User</p>
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

export default ChatFr;
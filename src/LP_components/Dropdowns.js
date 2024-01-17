import React, {useState, useEffect} from "react";
import io from "socket.io-client"


const Dropdowns = ({onLanguageSelect}) => {   
    const [selectedAi, setselectedAi] = useState("-select-");
    const [selectedLanguage, setselectedLanguage] = useState("-select");
    const [selectedMode, setselectedMode] = useState("-select");
    const [selectedOutLanguage, setselectedOutLanguage] = useState("-select")
    const [socket,setSocket] = useState(null);
    const serverURL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";


    useEffect (() => {
        const newSocket = io(serverURL)
        setSocket(newSocket);

        return () => {
        if (newSocket.connected) {
            newSocket.disconnect();
            setSocket(null)
            }
        };

    },[]);

    const handleAiSelect = (ai) => {
         setselectedAi(ai);
    if (socket && socket.connected) {
        if (ai == "Perplexity Ai"){
        socket.emit("ai_select", "Mistral 7B");
        } else {
        socket.emit("ai_select", ai);
        console.log("SENT ai_selected");
        }
    } else {
        console.log("socket not connected");
    }
    };

    const handleLanguageSelect = (language) => {
        setselectedLanguage(language);
        if (socket){
            socket.emit("language_select", language);
            console.log("SENT language_selected")
        }
        if (selectedMode == "Voice Chat"){
            if(language == "English") {
                onLanguageSelect("/chat_eng")
            }else if(language == "French"){
                onLanguageSelect("/chat_fr")
                }else if(language == "Japanese"){
                    onLanguageSelect("/chat_jp")
                }
            }
        else if (selectedMode == "Translate"){
             if(language == "English") {
                onLanguageSelect("/translate_eng")
            }else if(language == "French"){
                onLanguageSelect("/translate_fr")
                }else if(language == "Japanese"){
                    onLanguageSelect("/translate_jp")
                }
            }    
    };

    const handleModeSelect = (mode) => {
        setselectedMode(mode);
        if (socket){
            socket.emit("mode_select", mode);
            console.log("SENT mode_selected")
        }
    };
     const handleOutLanguageSelect = (outLanguage) => {
        setselectedOutLanguage(outLanguage);
        if (socket){
            socket.emit("out_language_select", outLanguage);
            console.log("SENT out_language_select")
        }
    };
   return(
   
   <><div className="btn-group-1 d-inline-block">
           <p className="text-above-button-a custom-margin">AI 選択</p>
           <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
               {selectedAi}
           </button>
           <div className="dropdown-menu custom-dropdown-menu">
               <a className="dropdown-item" href="#" onClick={(e)=> {e.preventDefault(); handleAiSelect("chat GPT")}}>Chat GPT(Stable)</a>
               <a className="dropdown-item" href="#" onClick={(e)=> {e.preventDefault(); handleAiSelect("Perplexity Ai")}}>Perplexity Ai</a>
           </div>
       </div>
       <div className="btn-group-3 d-inline-block">
               <p className="text-above-button-c custom-margin">モード選択</p>
               <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
                   {selectedMode}
               </button>
               <div className="dropdown-menu">
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleModeSelect("Voice Chat")}}>Voice Chat</a>
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleModeSelect("Translate")}}>Translate</a>
               </div>
           </div>
       <div className="btn-group-2 d-inline-block">
               <p className="text-above-button-b custom-margin">言語選択</p>
               <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
                   {selectedLanguage}
               </button>
               <div className="dropdown-menu">
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("English")}}>English</a>
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("French")}}>Français</a>
                   {selectedAi !=="Perplexity Ai" && (
                   <a className="dropdown-item" href="#"  onClick={(e)=>{e.preventDefault(); handleLanguageSelect("Japanese")}}>日本語</a>
                   )}
               </div>
           </div>
           
            {selectedMode === "Translate" && (
                <div className="btn-group-4 d-inline-block">
                    <p className="text-above-button-d custom-margin">翻訳後の言語</p>
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'black' }}>
                        {selectedOutLanguage}
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#" onClick={(e)=>{e.preventDefault(); handleOutLanguageSelect("English")}}>English</a>
                        <a className="dropdown-item" href="#" onClick={(e)=>{e.preventDefault(); handleOutLanguageSelect("French")}}>French</a>
                        {selectedAi !=="Perplexity Ai" && (
                        <a className="dropdown-item" href="#" onClick={(e)=>{e.preventDefault(); handleOutLanguageSelect("Japanese")}}>Japanese</a>
                        )}
                    </div>
                </div>
            )}
            
    </>
   );
};

export default Dropdowns;
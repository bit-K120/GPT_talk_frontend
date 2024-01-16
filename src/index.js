import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatEng from './chat_components/ChatEng';
import ChatFr from './chat_components/ChatFr';
import ChatJp from './chat_components/ChatJp';
import TranslateEng from './chat_components/TranslateEng';
import TranslateFr from './chat_components/TranslateFr';
import TranslateJp from './chat_components/TranslateJp';
import LP from './LP_components/LP';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LP />} />
        <Route path="/chat_eng" element={<ChatEng />} />
        <Route path="/chat_fr" element={<ChatFr />} />
        <Route path="/chat_jp" element={<ChatJp />} />
        <Route path="/translate_eng" element={<TranslateEng />} />
        <Route path="/translate_fr" element={<TranslateFr />} />
        <Route path="/translate_jp" element={<TranslateJp />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </React.StrictMode>
);



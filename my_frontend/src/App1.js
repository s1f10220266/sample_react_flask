import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './App1Style.css';


function App1() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [input, setInput] = useState([]);
  const [conversation, setConversation] = useState([]);

  const handleNameSubmit = async (e) => {
    e.preventDefault(); //不必要なフォームの送信を防止
    const receive = await fetch('http://127.0.0.1:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name}),
    });
    const data = await receive.json();
    setResponse(data.message);
  }

  const handleChatSubmit = async (e) => {
    e.preventDefault(); // 不必要なフォームの送信を防止
    const receive = await fetch('http://127.0.0.1:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, input }),
    });
    const data = await receive.json();
    
    // 自分の送信メッセージとAIの返答を会話履歴に追加
    setConversation(prevConversation => [
      ...prevConversation, 
      { message: input, answer: data.ans }
    ]);
    
    setInput(''); // 入力をクリア
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row text-center align-items-center">
          <h1>ChatGPT-o4 miniとフリートークができるアプリ</h1>
        </div>

        <div className="row text-center align-items-center box29">
            <div className="box-title">Introduction</div>
            <p>
              OpenAI_APIとLangChainを用いてサッと開発した簡単なアプリです<br />
              ニックネームを設定し、話したいことをSendしてください<br />
            </p>
            <strong>注意: 実行にあたっていくつか必要なことがあります、READMEを参照してください</strong>
        </div>

        <div className="row text-center align-items-center box29">
            <div className="box-title">技術</div>
            <p>
              React(フロントエンド) + Flask(バックエンド)、LangChain
            </p> 
        </div>

        <hr />


        <div className="row text-center align-items-center">
          <p>会話で使用するあなたのニックネームを教えてください</p>
        </div>
      
        <form onSubmit={handleNameSubmit} className="row justify-content-center">
          <div className='col-auto'>
            <div className='input-group'>
              <input className='form-control form-control-sm text-center' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='ニックネーム'/>
              <button type="submit" className="btn btn-outline-primary">設定</button>
            </div>
          </div>
        </form>

        <div className="row text-center align-items-center">
          <p>{response}</p>
        </div>

        {conversation.map((conv, index) => (
          <div key={index}>
            <div className="row text-center align-items-center">
              <div className="offset-8 col ">
                <p>{conv.message}<strong>:あなた</strong></p>
              </div>
            </div>
            <div className="row">
              <div className="offset-1 col text-start">
                <p><strong>AI:</strong> {conv.answer}</p>
              </div>
            </div>
          </div>
        ))}
      
        <form onSubmit={handleChatSubmit} className='row justify-content-center'>
          <div className='col-8'>
            <div className='input-group'>
              <textarea className="form-control text-center" rows="2" placeholder='メッセージ' value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" className="btn btn-outline-primary">Send</button>
            </div>
          </div>
        </form>

        <div className="row justify-content-center">
          <div className='col-auto'>
            <Link to="/">トップページへ</Link>
          </div>
        </div>
        
        </div>
    </>
  );
}

export default App1;

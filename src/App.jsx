// App.js
import React, { useState } from 'react';
import translateText from './GoogleTranslate.jsx';
// import axios, { all } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Collapse from 'react-bootstrap/Collapse'
import emoji from './img/emoji.png';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faEnvelope, faRightLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css'

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const [fromLanguage, setFromLanguage] = useState('th');
  const [targetLanguage, setTargetLanguage] = useState('en'); 

  const [counterText, setCounter] = useState('0');
  const [allInput, setAllInput] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [isPalindrome, setPalindrome] = useState(false);
    

  const handleTranslate = async () => {
    if (inputText) {
        if(inputText.length <= 1000){
            const translatedText = await translateText(inputText, targetLanguage);
            setOutputText(translatedText)

            let f = '';
            let t = '';

            if(fromLanguage == 'th'){
              f = 'Thailand';
            }else if(fromLanguage == 'en'){
              f = 'English';
            }else{
              f = 'Spain';
            }

            if(targetLanguage == 'th'){
              t = 'Thailand' ;
            }else if(targetLanguage == 'en'){
              t = 'English';
            }else{
              t = 'Spain' ;
            }

            let newRec = {
              input: inputText,
              output: translatedText,
              from: f,
              target: t,
            }

            let updatedRec = [...allInput]
            updatedRec.push(newRec)
            setAllInput(updatedRec)
        }else{
            alert('Character must be 1000')
        }
      
    }
  };

  function counterChar(e){
    const counter = e.target.value;
    if(counter.length <= 1000 ){
        setCounter(counter.length)
        if(counter != '' && counter.length != 1){
          const text = counter.trim().toLowerCase(); 
          const cleanedText = text.split('').reverse().join(''); 
          const palindrome = text === cleanedText; 
          setPalindrome(palindrome)
        }else{
          setPalindrome(false)
        }
    }else{
        alert("Can't type character more than 1000.");
    }

  }

  function swapLang(){
    setTargetLanguage(fromLanguage)
    setFromLanguage(targetLanguage)
  }

  function clearRec(){
    setAllInput([]);
  }

  function deleteRec(index){
    let reducedRec = [...allInput]
    reducedRec.splice(index,1);
    setAllInput(reducedRec)
  }

  return (
    <>
    <div className="content">
      <div className='top-side'>
          <div className='col-12'>
          
              <div className="row option-bar">
               
                  <div className="col-5 col-lg-4 text-start">
                    
                      <b>From :</b>
                      <select className='form-control' value={fromLanguage}onChange={(e) => setFromLanguage(e.target.value)}>
                          <option value="th">Thai</option>        
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                      </select>
                      <br />
                
                  </div>
                  <div className="col-2 col-lg-1 text-center">
                      <br />
                      <button className='btn' onClick={swapLang}><FontAwesomeIcon icon={faRightLeft} /></button>
                  </div>
                  <div className="col-5 col-lg-4 text-start">
                      <b>To :</b>
                      <select className='form-control' value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                          <option value="en">English</option>
                          <option value="th">Thai</option>   
                          <option value="es">Spanish</option>
                      </select>
                      <br />
                  </div>
                  
                  <div className="col-12 col-lg-3 text-center btn-col">
                    
                  <img className='emoji-img' src={emoji} style={{display : isPalindrome ? '' : 'none'}}/> <span className='counter'>{counterText} / 1000</span> <button className='translate-btn' onClick={handleTranslate}>Translate </button>
               
                  </div>
              </div>

              </div>

              <div className="row translate-content p-5">
                <div className="col-12 col-md-6">
                <textarea className="form-control" maxLength="1000" value={inputText} onInput={(e) => counterChar(e)} onChange={(e) => setInputText(e.target.value)}/>
                </div>
                <div className="col-12 col-md-6">
                <textarea className="form-control" maxLength="1000" value={outputText} onChange={(e) => setInputText(e.target.value)}/>
                </div>
              
              
              {/* <div className='bottom-side my-3' > */}
          
                  <div className='text-start record-bar'>
                    <h5 className='record'>Translate Record <FontAwesomeIcon icon={faClockRotateLeft} /></h5> 
                    <span className='record-counter'>{allInput.length == 0 ? 'No translate record data.' : allInput.length + ' Data'}</span>
                    <span className='show' style={{display: allInput.length > 0 ? '' : 'none'}} onClick={() => setToggle(toggle => !toggle)}> {toggle ? 'Show less' : 'Show More'}</span> 
                  </div>

                  <Collapse in={toggle}> 
                  <div style={{display: allInput.length > 0 ? '' : 'none'}}>   
                  {allInput.map((data,index) => {
                          return (
                            <div key={index} className='record-row my-3'>
                            
                                <div className="row">
                                  <p>{data.from} to {data.target}  <FontAwesomeIcon className='text-danger delete-btn' onClick={ async() => { await deleteRec(index)}} icon={faTrashCan}/> </p>
                                  <hr />
                                  <div className='ps-5'>
                                    <p><span className='text-muted'>Searched text |</span> {data.input} </p>
                                    <p> {data.output}</p>
                                  </div> 
                                  
                                </div> 
                             
                            </div>
                          )
                  })}

                    <div className="row text-end">
                      <a className='text-danger clear-btn' onClick={clearRec}>Clear all history !</a>
                    </div>
                  </div>
                  </Collapse>
              {/* </div>  */}

              </div>
           
        </div>
  
        
    </div>
   
   
    </>
  );
}

export default App;
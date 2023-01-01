//selectors
const body = document.querySelector("body");
const speechBtn = document.querySelector("#speechBtn");
const resetBtn = document.querySelector("#resetBtn");
const container = document.querySelector(".container");
const result = document.querySelector("#result");

//random number generator
const randomNumber = Math.floor(Math.random()*100)+1

//speech library
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';




//events
speechBtn.addEventListener("click", ()=>{
  recognition.start();
  
  //waiting for speech results
  recognition.addEventListener('result', e => {

    //speech result saved in an object
    const transcript = e.results[0][0].transcript;    
    
    //isFinal has "." at the end of the value stored in results[0][0].transcript
    if(!e.results[0].isFinal) {
      let userSpeech = e.results[0][0].transcript;
      speechBtn.style.display = "none";
      if(parseInt(userSpeech) > randomNumber){
        result.innerText = `${userSpeech} is too high... try again!`
        
      }
      else if (parseInt(userSpeech) < randomNumber){
        result.innerText = `${userSpeech} is too low... try again!`
      }
      // check if the input matches randomNumber
      if(transcript.indexOf(randomNumber) == 0) {
        if(parseInt(e.results[0][0].transcript) === randomNumber){
          result.innerText = `You Guessed it!!!! ${randomNumber}!!`
          let resetBtn = document.createElement("button");
          resetBtn.innerText = "Reset";
          resetBtn.id = "woop";
          container.appendChild(resetBtn);
        }
      }
      recognition.addEventListener('end', recognition.start);
    }
  });
})


container.addEventListener("click", (e)=>{
  let t = e.target;
  if(t.id == "woop"){
    window.location.reload();
  }
})

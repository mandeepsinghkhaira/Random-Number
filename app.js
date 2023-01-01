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
      result.innerText = transcript
      speechBtn.style.display = "none";
      if(parseInt(e.results[0][0].transcript) > randomNumber){
        result.innerText = "Too High... Try Again!"
      }
      else if (parseInt(e.results[0][0].transcript) < randomNumber){
        result.innerText = "Too Low... Try Again!"
      }

      // check if the input matches randomNumber
      if(transcript.indexOf(randomNumber) == 0) {
        if(parseInt(e.results[0][0].transcript) === randomNumber){
          console.log(randomNumber);
          console.log('you guessed it!.');
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
    console.log("boooom!");
    window.location.reload();
  }
})

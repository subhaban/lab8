import {info} from './personal.js';


const body = document.querySelector('body');
//const h2= document.createElement('h2');
//body.appendChild(h2);
//h2.textContent ='Random Word Generator and its Definition';
const btn = document.querySelector("#btn");
const typeBtn = document.querySelector("#typebtn");
//const word = document.createElement('h3');
//const definition = document.createElement('p');


btn.addEventListener('click',(e)=>{
    randomWord();
    wordDefinition();
    console.log(html);
})

typeBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    typeWord();
})


let html="";

let defList= `<dl class="defiList">`;
let dt =``;
let dd = `<dd class="def">`;

const randomWord = () =>{
    fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then(response =>{
             return response.json();
    })
     .then (response => {
         //console.log(response);
       //let word =  'response.json';
       let word = response[0]; 
       //console.log(text);
      // console.log(word);
       //let objInfo="";
       dt = `<dt class="genword">${word}</dt>`;
       //console.log("this is the randon ", word);

      
     //console.log(word);
     //console.log(html);
     //console.log(`${word}`);
      
       
      //word.textContent = response;
      // word.textContent = response;
       //container.appendChild(word);
       wordDefinition(word);

     })
      .catch(err =>{
          console.log("Error", err);
          
      }) 
     // defList += dt;
    
      //console.log(html);
     
     defList += dt;
 }

 
// console.log(word);
const wordDefinition = (word) =>{
     //console.log(word);
     fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${info.key}`)
     .then( response => {
         return response.json();
          
     })
    
     .then (response =>{
        //console.log(word);
         //console.log(response[0].shortdef);
         //let text = 'response.json';
           let dd =`<dd class="wordmeans">${response[0].shortdef}</dd>`;
         if(response[0].shortdef !== undefined){
            
            //definition.textContent =  `Definition: ${response[0].shortdef}`;
         }else{
            html += `Sorry ! No Definition Available`;
         }
        
         //container.appendChild(definition);
         
         //console.log(html);
         dt += dd;
         
     })
     .catch( err=>{
         console.log("Error", err);
     })
}  

      //----Function to get the typed word ---
const typeWord =() =>{
    let text = document.querySelector('input').value;
      word.textContent = text;
    console.log(text);
    wordDefinition(word);
  
  }
     //html += `</dl>`;

     //defList += dt;
     //console.log(defList);
     //console.log(dt);
     //console.log(html);
 
 html += defList;
 const container= document.querySelector('#container');
 container.innerHTML += html;
 
 console.log(html);


 
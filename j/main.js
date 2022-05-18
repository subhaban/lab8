import {
    info
} from './personal.js';

//greetings for the page//

const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');
const h1 = document.querySelector('h1');

//--Shortcut variables for the buttons and the body.
//const container = document.querySelector('#container');
const btn = document.querySelector("#btn");
const typeBtn = document.querySelector("#typebtn");
const para = document.createElement('p');

// global variables for toggle mode//
const toggleBtn = document.getElementById("toggle-btn");
const theme = document.getElementById("theme");

form.addEventListener('submit', e => e.preventDefault());
submitBtn.addEventListener('click', () => {
    // store the entered name in web storage
    localStorage.setItem('name', nameInput.value);
    // run nameDisplayCheck() to sort out displaying the personalized greetings and updating the form display
    nameDisplayCheck();
});
// define the nameDisplayCheck() function

  nameDisplayCheck();

    forgetBtn.addEventListener('click', () => {
        // Remove the stored name from web storage
        localStorage.removeItem('name');
        // run nameDisplayCheck() to sort out displaying the generic greeting again and updating the form display
        nameDisplayCheck();
    });
// Adding Events to the butons----//
// --- Event for Random Button ---//
btn.addEventListener('click', (e) => {
    e.preventDefault();
    randomWord();
});

// --- Event for Input Button --//
typeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    typeWord();
});

///--- toggle to dark mode---////

let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  theme.classList.add("dark-mode-theme");
  toggleBtn.classList.remove("dark-mode-toggle");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  theme.classList.remove("dark-mode-theme");
  toggleBtn.classList.add("dark-mode-toggle");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

toggleBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

/// create database////

(async function () {
 
    let title = document.querySelector("#title");
    let Definition = document.querySelector("#def");
  
    // create new indexDB database
    var db = new Dexie("Randomwordlist");
  
    // Define the database schema, which includes tables and their key indices
    db.version(20).stores({
      word: `++,&word`,
      meanings: `++,&word,definition`
    });

    // get random words
    const randomword_data = await fetch('https://random-word-api.herokuapp.com/word?number=5');
    const wordlist = await randomword_data.json();
    const word_array = await wordlist;
    console.log(wordlist);
    console.log(word_array);
  
    //  get the word meanings
    
   console.log(wordlist.length);

for (let i = 0; i < wordlist.length; i++){

      const def_data = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordlist[i]}?key=${info.key}`);

     const worddef = await def_data.json();
     const worddef_array = await worddef;
     
     console.log(worddef_array);
     console.log(worddef);
      // populate the tables
     db.word.bulkPut(wordlist);
     db.meanings.bulkPut(worddef);
    
    }
    
    // make a queries of the database
    const fetchwords =  await db.word.toArray();
    const wordmeanings = await db.meanings.toArray();
   console.log(fetchwords);
   console.log(wordmeanings);
   console.log(wordmeanings[0].shortdef);

   

    /*wordlist.forEach((element) => {
          const li = document.createElement("LI");
          li.textContent = word.name;
          word.append(li);
        });
  
        wordmeanings.forEach((shortdef) => {
          const li = document.createElement("LI");
          li.textContent = shortdef.word;
          wordmeaning_list.append(li);
        });*/
  
  
   } ()); // end IIFE 
 
//------Functions --------//
//---Fuction for random words.--//
//Using the fetch method from random word API--//

const randomWord = () => {

  fetch("https://random-word-api.herokuapp.com/word?number=1")
    
        .then(response => {
           return response.json();
        })
        .then(response => {

            
            let wordlist = response;
            let h3 = document.createElement('H3');
//console.log(wordlist);

            h3.textContent = wordlist[0];
            let title = document.querySelector("#title");
            title.innerHTML = "";
            title.append(h3);
            
            wordDefinition(wordlist);

        })
        .catch(err => {
           console.log("Error", err);

       })
        
}

//--- Function for getting the word definition---//
//---Using the Fetch command  to get the dictionary API ----//
const wordDefinition = (wordlist) => {

   
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${wordlist}?key=${info.key}`)
        .then(response => {
            return response.json();

        })
        .then(response => {
           console.log(response);
            if (response[0].shortdef !== undefined) {
                para.textContent = `Definition: ${response[0].shortdef}`;
            } else {
                para.textContent = `Sorry ! No Definition Available`;
            }
            let def = document.getElementById("def");
            def.innerHTML = "";
            def.appendChild(para);

        })
        .catch(err => {
            console.log("Error", err);
        })
      
}

//----Function to get the typed word ---
const typeWord = () => {
    let text = document.querySelector('#wordtype').value;
    let h3 = document.createElement('H3');
    h3.textContent = text;

    let title = document.querySelector("#title");
    title.innerHTML = "";
    title.append(h3);
    
    wordDefinition(text);

}

function nameDisplayCheck() {
    // check whether the 'name' data item is stored in web Storage
    if(localStorage.getItem('name')) {
      // If it is, display personalized greeting
      const name = localStorage.getItem('name');
      h1.textContent = `Welcome  ${name}`;
      //personalGreeting.textContent = `Welcome to our website, ${name}! We hope you have fun while you are here.`;
      // hide the 'remember' part of the form and show the 'forget' part
      forgetDiv.style.display = 'block';
      rememberDiv.style.display = 'none';
    } else {
      // if not, display generic greeting
      h1.textContent = 'Welcome There';
     // personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
      // hide the 'forget' part of the form and show the 'remember' part
      forgetDiv.style.display = 'none';
      rememberDiv.style.display = 'block';
    }
  }



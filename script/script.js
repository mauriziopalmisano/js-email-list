'use strict';

const emailAPI = 'https://flynn.boolean.careers/exercises/api/random/mail';
const richieste = [];
let elementList = undefined;
const emailListSelector = document.querySelector('#email-list');


function emailsCall(nEmails) {
    
    for (let i = 0; i < nEmails; i++) {
      const promessa = fetch(emailAPI)
        .then(risposta => risposta.json());
        
      richieste.push(promessa);
    }
    
    Promise.all(richieste)
      .then(risultati => {
        console.log(risultati);
        const emails = risultati.map(risultato => risultato.response);
        console.log("Tutte le mail:", emails);
        listGenerator(emails);
      })
}


function listGenerator(array) {
    let list = '';
    array.forEach(element => {
        list += `<li>${element}</li>`;
    });
    emailListSelector.innerHTML = list;
}


emailsCall(15);
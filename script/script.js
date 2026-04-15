'use strict';

const emailAPI = 'https://flynn.boolean.careers/exercises/api/random/mail';
const richieste = [];
let elementList = undefined;
const emailListSelector = document.querySelector('#email-list');
const emailForm = document.querySelector('#email-form');
const emailCount = document.querySelector('#email-count');


function emailsCall(nEmails) {
  const richieste = [];
    for (let i = 0; i < nEmails; i++) {
      const promessa = fetch(emailAPI)
        .then(risposta => risposta.json());
      richieste.push(promessa);
    }
    
    Promise.all(richieste)
      .then(risultati => {
        const emails = risultati.map(risultato => risultato.response);
        listGenerator(emails);
      })
}


function listGenerator(array) {
    let list = '';
    array.forEach(element => {
        list += `<li class="list-group-item border border-success text-success col-6 list-item-custom">${element}</li>`;
    });
    emailListSelector.innerHTML = list;
}


emailsCall(10);
emailForm.addEventListener('submit',(event) => {
    event.preventDefault();
    emailsCall(parseInt(emailCount.value));
})

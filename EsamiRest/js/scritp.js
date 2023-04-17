var studentiRes = "http://localhost:3000/studenti";

//fetch per poter leggere gli studenti
fetch(studentiRes)
.then(data =>{return data.json()})
.then(res=>{
    console.log(res);
})

function Studente(nome,cognome,matricola,materia){
    this.nome = nome;
    this.cognome = cognome;
    this.matricola = matricola;
    this.materia = materia;
}

var btn = document.querySelector("#btnStud")

//aggiungo un nuovo studente
function aggiungiStudente(){
    let nome = document.querySelector("#nome").value;
    let cognome = document.querySelector("#cognome").value;
    let matricola = document.querySelector("#matricola").value;
    let materia = document.querySelector('#sceltaMateria').value;

    let nuovoStudente = new Studente(nome,cognome,matricola, materia);

    //fetch per poter "registrare" (POST) il nuovo studente nel DB
    fetch(studentiRes,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(nuovoStudente),
    })
    .then(data=>{data.json})
    .then(res=>{
        console.log("Inserimento avvenuto ", res);
    })
}

btn.addEventListener("click",aggiungiStudente);

//****** FUNZIONALITA DOCENTE ******/

var docentiRes = "http://localhost:3000/docenti";

var optDocente = document.querySelector('#sceltaDocente');

//fetch per poter leggere i docenti
fetch(docentiRes)
.then(data =>{return data.json()})
.then(res=>{
    res.forEach(docente => {// creazione dei campi option per la select sceltaDocente --- nomeDocente - materia
        let option = document.createElement("option");
        option.innerHTML = `${docente.nome}-${docente.materia}`;
        option.value = docente.materia;

        optDocente.appendChild(option);
    });
})

optDocente.addEventListener("change",function(){
    stampaRelativiStudenti(this.value)
});

var stampaStudenti = document.querySelector('#stampa');

//al click su un docente stampo i relativi studenti collegati con quella materia
function stampaRelativiStudenti(materia){
    stampaStudenti.innerHTML = "";

    console.log("Studenti materia :" + materia);

    var studentiResMateria = "http://localhost:3000/studenti?materia=" + materia;

    stampaStudenti.innerHTML += `<h3>Studenti iscritti all'esame di ${materia} </h3>`;

    fetch(studentiResMateria)
    .then(data => {
        return data.json()
    })
    .then(res => {
        res.forEach(studente =>{
            stampaStudenti.innerHTML += `<li> ${studente.nome} ${studente.cognome} Matr: ${studente.matricola} </li>`;
        })
    })



}



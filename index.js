const info = document.querySelector(".cast");
const baseUrl = "https://swapi.dev/api/";
const searchBtn = document.querySelector("#btnBuscar");
const filmsInput = document.querySelector("#film");


/* TO DO
1) Guardar los datos en la memoria local y posteriormente cargarlos desde ese almacenamiento 
    Razon: Demora mucho la carga luego de un tiempo, quizás es por la hora
    Podria hacer que el codigo busque en primera instancia en la memoria local y en caso de que no exista, realizar el fetch
    Lo que hay que guardar sería:
        1. Array de objetos de las peliculas que tengan los sgtes elementos ["title","characters"] -> Para la página inicio
        2. Array de objetos de los personajes que tengan los sgtes elementos ["name","films"] -> Para la página personaje

2) Manipular el fetch en una función con parametros
    Razón: DRY + función avanzada de la clase que lo piden

3) Incorporar alguna libreria
    Razón: lo pide en el enunciado
    
*/


function search(url){
    return fetch(url)
    .then(response =>{return response.json()})
    .then(data => {return data})
}



//Filling the dropdown with movies
search(baseUrl+"/films").then(res => {
    res.results.forEach(function(film,index) {
        let option = document.createElement('option');
        option.setAttribute('value',index+1);
        option.innerHTML = film.title;

        filmsInput.appendChild(option);
    })
})


searchBtn.addEventListener("click",(event)=>{
    info.innerHTML = "";

    
    const film = document.querySelector("#film").value;
    search(`${baseUrl}/films/${film}`).then(filmData => {
        filmData.characters.forEach(characterURL =>{
            search(characterURL).then(character=>{
                let li = document.createElement("li");
                let img = document.createElement("img");

                search("pictures.json")
                .then(imgJSON =>{
                    let characterIMG = imgJSON.find(c => c.name === character.name);

                    img.setAttribute("src",characterIMG.image);
                    img.setAttribute("alt",characterIMG.name)
                }).catch(err =>{
                    console.log(err)
                    img.setAttribute("alt",character.name)

                    
                })
                li.appendChild(img);
                info.appendChild(li)
            })
        })
    })
})



   
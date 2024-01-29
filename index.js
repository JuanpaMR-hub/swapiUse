const info = $(".cast");
const baseUrl = "https://swapi.dev/api/";
const searchBtn = $("#btnBuscar");
const filmsInput = $("#film");

/*

To do:

1) Use local storage for saving the fetched data
2) Use Sweet Alert to display character info if clicked
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

        filmsInput.append(option);
    })
})


searchBtn.on("click",(event)=>{
    info.empty();
    
    const film = $("#film").val();
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
                li.append(img);
                info.append(li)
            })
        })
    })
})



   
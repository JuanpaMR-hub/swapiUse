


const info = $(".cast");
const baseUrl = "https://swapi.dev/api/";
const searchBtn = $("#btnBuscar");
const filmsInput = $("#film");
const characterIMG = $(".characterIMG");

function search(url){
    return fetch(url)
    .then(response =>{return response.json()})
    .then(data => {return data})
}

function showCharacter(element){
    
    Swal.fire({
        title: element.alt,
        imageUrl: element.src,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
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
                let a = document.createElement("a")
                a.setAttribute('href','#')
                
                let li = document.createElement("li");
                let img = document.createElement("img");

                search("pictures.json")
                .then(imgJSON =>{
                    let characterIMG = imgJSON.find(c => c.name === character.name);

                    img.setAttribute("src",characterIMG.image);
                    img.setAttribute("alt",characterIMG.name)
                }).catch(err =>{
                    // console.log(err)
                    img.setAttribute("alt",character.name)

                    
                })
                a.setAttribute("onclick","showCharacter(this.children[0])")
                a.append(img)
                li.append(a);
                info.append(li)
            })
        })
    })
})





   
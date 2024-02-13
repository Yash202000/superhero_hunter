let charactersContainer = document.getElementById("characters-container");
let currentPage = 1;
let limit = 20;
let offset = 0;


const md5Hash = localStorage.getItem("md5Hash");
const timestamp = localStorage.getItem("timestamp");
const apiKey = localStorage.getItem("apiKey");


document.getElementById("hashContainer").innerText = "MD5 Hash: " + md5Hash;
document.getElementById("timestampContainer").innerText =
  "Timestamp: " + timestamp;

console.log("MD5 Hash:", md5Hash);
console.log("Timestamp:", timestamp);

async function fetchData() {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${md5Hash}&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    console.log(data);
  
    let arr = data.data.results;
    charactersContainer.innerHTML = "";
  
    let rowContainer;
    for (let i = 0; i < arr.length; i++) {
      if (i % 5 === 0) {
        rowContainer = document.createElement("div");
        rowContainer.classList.add("card-row");
        charactersContainer.appendChild(rowContainer);
      }
  
      let favorite = "favorite";
  
      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
      let path = `./characterinfo.html#${id}`;
  
      div.innerHTML = `
        <div class="card-body">
          <img class="poster" src=${thumbnail.path}.jpg alt="">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
        </div>
      `;
  
      rowContainer.appendChild(div);
    }
    return data;
  }
  

fetchData();

async function handleNext() {
  currentPage++;
  offset = (currentPage - 1) * 20;

  await fetchData();
}


async function handlePrevious(){
    if(currentPage>1){
        currentPage--;
        offset = (currentPage - 1) * 20;
        await fetchData();
    }
}

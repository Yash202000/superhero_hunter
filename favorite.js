function getStorage() {
  let data = JSON.parse(localStorage.getItem("favorite")) || [];
  return data;
}

function setStorage(data) {
  let dataString = JSON.stringify(data);
  localStorage.setItem("favorite", dataString);
}

function updateFavorite(e) {
  let data = JSON.parse(e.getAttribute("data-character"));
  let favoriteList = getStorage();

  for (let character = 0; character < favoriteList.length; character++) {
    if (favoriteList[character].id == data.id) {
      favoriteList.splice(character, 1);
      e.setAttribute("value", "Favorite");
      setStorage(favoriteList);
      return;
    }
  }

  favoriteList.push(data);
  setStorage(favoriteList);
  e.setAttribute("value", "UnFavorite");
}

function renderFavorite(favoriteContainer) {
  let myFavoriteList = getStorage();

  if (myFavoriteList.length > 0) {
    favoriteContainer.innerHTML = "";
  }
  for (let character = 0; character < myFavoriteList.length; character++) {
    const { id, name, path } = myFavoriteList[character];

    let div = document.createElement("div");
    div.classList.add("character-card");
    div.setAttribute("id", id);

    let detailsPath = `../pages/characterdetails.html#${id}`;
    div.innerHTML = `
          <img class="poster" src=${path}.jpg alt="">
          <div class="card-body">
          <a href=${detailsPath}>${name}</a>
          <input type="button" value="UnFavorite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavorite(this)"/>
          </div>
      `;
    favoriteContainer.appendChild(div);
  }
}

let favoriteContainer = document.getElementById("favorite-characters");
if (favoriteContainer != null) {
  renderFavorite(favoriteContainer);
}

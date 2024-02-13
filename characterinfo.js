window.onload = function () {
  let wrapper = document.getElementById("characterWrapper");

  let winurl = window.location.href;
  let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;

  let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data.results);
      let character = data.data.results[0];
      const { name, description, thumbnail } = character;
      let div = document.createElement("div");
      div.classList.add("character-info-container");

      div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${name}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
      wrapper.innerHTML = "";
      wrapper.appendChild(div);
    })
    .catch((error) => {
      console.log(error);
    });

  let comicsWrapper = document.getElementById("comics");
  comicsWrapper.innerHTML = "";
  url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      let comics = res.data.results;

      for (let comic of comics) {
        const { title, thumbnail, description } = comic;
        let div = document.createElement("div");
        div.classList.add("character-info-container");

        div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info">
            <h3>${title}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
        comicsWrapper.appendChild(div);
      }
    })

    .catch((error) => {
      console.error(error);
    });
};

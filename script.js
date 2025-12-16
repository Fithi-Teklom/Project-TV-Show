//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    
    const episodeCard = document.createElement("section");

    const title = document.createElement("h2");
    title.textContent = episode.name;

    const info = document.createElement("p");
    info.textContent = `Season ${episode.season} Episode ${episode.number}`;

    const image = document.createElement("img");
    image.src = episode.image.medium;
    image.alt = episode.name;

    const summary = document.createElement("div");
    summary.innerHTML = episode.summary;

    episodeCard.appendChild(title);
    episodeCard.appendChild(info);
    episodeCard.appendChild(image);
    episodeCard.appendChild(summary);

    rootElem.appendChild(episodeCard);
  });
}


window.onload = setup;

//You can edit ALL of the code her

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    // 1. Episode card container
    const episodeCard = document.createElement("section");

    
    const seasonNumber = String(episode.season).padStart(2, "0");
    const episodeNumber = String(episode.number).padStart(2, "0");
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;

    
    const title = document.createElement("h2");
    title.textContent = `${episodeCode} — ${episode.name}`;
    episodeCard.appendChild(title);

   
    const image = document.createElement("img");
    image.src = episode.image.medium;
    image.alt = episode.name;
    episodeCard.appendChild(image);

  
    const summary = document.createElement("div");
    summary.innerHTML = episode.summary;
    episodeCard.appendChild(summary);

    
    rootElem.appendChild(episodeCard);
  });


//  const credit = document.createElement("p");
//   credit.innerHTML = `Data originally from <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer">TVMaze.com</a>`;
//   credit.style.marginTop = "20px"; 
//   rootElem.appendChild(credit);
}



// In script.js removed credit variable and took the functionality to index.html

window.onload = setup;

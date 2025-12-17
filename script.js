//You can edit ALL of the code her

import { getAllEpisodes } from './episodes.js';

let allEpisodes = []; // store all episodes globally

function setup() {
  allEpisodes = getAllEpisodes();
  displayEpisodes(allEpisodes);
  episodeSearch();
}

function episodeSearch() {
  const searchInput = document.getElementById("search-input");
  const countDisplay = document.getElementById("episode-count");

  const totalEpisodes = allEpisodes.length; // store total episodes

  // Initial count
  countDisplay.textContent = `Displaying  ${totalEpisodes} out of ${totalEpisodes} episodes`;

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredEpisodes = allEpisodes.filter((episode) => {
      const nameMatch = episode.name.toLowerCase().includes(searchTerm);
      const summaryMatch = episode.summary
        .toLowerCase()
        .includes(searchTerm);

      return nameMatch || summaryMatch;
    });

    displayEpisodes(filteredEpisodes);
    countDisplay.textContent = `Displaying  ${filteredEpisodes.length} out of ${totalEpisodes} episodes`;
  });
}


function displayEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
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
}

window.onload = setup;



//  const credit = document.createElement("p");
//   credit.innerHTML = `Data originally from <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer">TVMaze.com</a>`;
//   credit.style.marginTop = "20px"; 
//   rootElem.appendChild(credit);




// In script.js removed credit variable and took the functionality to index.html
// In script.js filter episode search function added 

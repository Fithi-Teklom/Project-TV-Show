//You can edit ALL of the code here

let allEpisodes = []; // store all episodes globally

function setup() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Loading episodes, please wait...</p>"; // Show loading

  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json();
    })
    .then(data => {
      allEpisodes = data; // store episodes globally
      episodeSearch();     // activate search bar
      episodeSelector();   // activate dropdown
      displayEpisodes(allEpisodes); // display all episodes
    })
    .catch(error => {
      root.innerHTML = "<p>Sorry, we could not load the episodes. Please try again later.</p>";
    });
} 


function episodeSearch() {
  const searchInput = document.getElementById("search-input");
  const countDisplay = document.getElementById("episode-count");

  const totalEpisodes = allEpisodes.length;

  // Initial count
  countDisplay.textContent = `Displaying  ${totalEpisodes} out of ${totalEpisodes} episodes`;

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredEpisodes = allEpisodes.filter((episode) => {
      const nameMatch = episode.name.toLowerCase().includes(searchTerm);
      const summaryMatch = episode.summary.toLowerCase().includes(searchTerm);
      return nameMatch || summaryMatch;
    });

    displayEpisodes(filteredEpisodes);
    countDisplay.textContent = `Displaying  ${filteredEpisodes.length} out of ${totalEpisodes} episodes`;
  });
}

// Episode- selector
function episodeSelector() {
  const select = document.getElementById("episode-select");

  // Populate dropdown
  allEpisodes.forEach((episode) => {
    const seasonNumber = String(episode.season).padStart(2, "0");
    const episodeNumber = String(episode.number).padStart(2, "0");
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;

    const option = document.createElement("option");
    option.value = episodeCode;
    option.textContent = `${episodeCode} — ${episode.name}`;

    select.appendChild(option);
  });

  // When selection changes
  select.addEventListener("change", () => {
    const selectedId = select.value;

    if (!selectedId) {
      // Show all episodes
      displayEpisodes(allEpisodes);
      // Reset search box
      const searchInput = document.getElementById("search-input");
      searchInput.value = "";
      // Reset count
      const countDisplay = document.getElementById("episode-count");
      countDisplay.textContent = `Displaying ${allEpisodes.length} out of ${allEpisodes.length} episodes`;
      return;
    }

    // Filter to the selected episode only
    const filteredEpisode = allEpisodes.filter(
      (episode) => {
        const seasonNumber = String(episode.season).padStart(2, "0");
        const episodeNumber = String(episode.number).padStart(2, "0");
        const episodeCode = `S${seasonNumber}E${episodeNumber}`;
        return episodeCode === selectedId;
      }
    );

    displayEpisodes(filteredEpisode);

    // Update count
    const countDisplay = document.getElementById("episode-count");
    countDisplay.textContent = `Displaying ${filteredEpisode.length} out of ${allEpisodes.length} episodes`;
  });
}

// display episodes

function displayEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  episodeList.forEach((episode) => {
    const seasonNumber = String(episode.season).padStart(2, "0");
    const episodeNumber = String(episode.number).padStart(2, "0");
    const episodeCode = `S${seasonNumber}E${episodeNumber}`;

    const episodeCard = document.createElement("section");
    episodeCard.id = episodeCode; 

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

// document.addEventListener("DOMContentLoaded", setup);

//  const credit = document.createElement("p");
//   credit.innerHTML = `Data originally from <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer">TVMaze.com</a>`;
//   credit.style.marginTop = "20px";
//   rootElem.appendChild(credit);

// In script.js removed credit variable and took the functionality to index.html
// In script.js filter episode search function added

// Level 200,in script.js episodeSelector function added. 

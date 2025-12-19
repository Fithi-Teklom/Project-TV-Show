//You can edit ALL of the code here

// Global variables
let allShows = [];       
let allEpisodes = [];    
const episodesCache = {}; // to prevent fetching again and again

// API for shows 
const SHOWS_API = "https://api.tvmaze.com/shows";

// Setup
function setup() {
  showLoading("Loading shows, please wait...");
  fetchShows();
}

// Helper functions 
function zeroPad(num) {
  return num.toString().padStart(2, "0");
}

function getEpisodeCode(season, episode) {
  return `S${zeroPad(season)}E${zeroPad(episode)}`;
}

// Show loading message
function showLoading(message) {
  const root = document.getElementById("root");
  root.innerHTML = `<p>${message}</p>`;
}

// Show error message
function showError(message) {
  const root = document.getElementById("root");
  root.innerHTML = `<p style="color:red; font-weight:bold;">${message}</p>`;
}

// Fetch Shows 
async function fetchShows() {
  try {
    const response = await fetch(SHOWS_API);
    if (!response.ok) throw new Error("Failed to load shows");

    const data = await response.json();
    allShows = data;

    // Sort shows alphabetically by name, case-insensitive
    allShows.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    populateShowSelect(allShows);
    // Optionally, auto-select the first show
    if (allShows.length > 0) {
      selectShow(allShows[0].id);
    }

  } catch (err) {
    showError("Could not load TV shows. Try again later.");
  }
}

// Selecting shows

function populateShowSelect(shows) {
  const showSelect = document.getElementById("show-select");
  showSelect.innerHTML = "";

  shows.forEach(show => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelect.appendChild(option);
  });

  showSelect.addEventListener("change", (e) => {
    const showId = e.target.value;
    selectShow(showId);
  });
}

// Select Show 
function selectShow(showId) {
  if (!showId) return;

  // Check cache first (already stored)
  if (episodesCache[showId]) {
    allEpisodes = episodesCache[showId];
    updateUI();
    return;
  }

  // Fetch episodes for the specific show
  showLoading("Loading episodes, please wait...");
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to load episodes");
      return res.json();
    })
    .then(data => {
      allEpisodes = data;
      episodesCache[showId] = data; // Cache episodes
      updateUI();
    })
    .catch(err => showError("Could not load episodes. Try again later."));
}

// Updating the display 
function updateUI() {
  setupSearch();
  populateEpisodeSelect(allEpisodes);
  displayEpisodes(allEpisodes);
}

// Search
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const countDisplay = document.getElementById("episode-count");

  searchInput.value = ""; // resetting search

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allEpisodes.filter(ep =>
      ep.name.toLowerCase().includes(term) ||
      ep.summary.toLowerCase().includes(term)
    );

    displayEpisodes(filtered);
    countDisplay.textContent = `Displaying ${filtered.length} out of ${allEpisodes.length} episodes`;
  });
}

// Episode Selector 
function populateEpisodeSelect(episodeList) {
  const select = document.getElementById("episode-select");
  select.innerHTML = '<option value="">All episodes</option>';

  episodeList.forEach(ep => {
    const code = getEpisodeCode(ep.season, ep.number);
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} — ${ep.name}`;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const selectedCode = e.target.value;
    if (!selectedCode) {
      displayEpisodes(allEpisodes);
      document.getElementById("search-input").value = "";
      document.getElementById("episode-count").textContent = `Displaying ${allEpisodes.length} out of ${allEpisodes.length} episodes`;
      return;
    }

    const filtered = allEpisodes.filter(ep => {
      const code = getEpisodeCode(ep.season, ep.number);
      return code === selectedCode;
    });

    displayEpisodes(filtered);
    document.getElementById("episode-count").textContent = `Displaying ${filtered.length} out of ${allEpisodes.length} episodes`;
  });
}

// Display Episodes
function displayEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // clear previous episodes

  // Create container for episode cards
  const episodesContainer = document.createElement("div");
  episodesContainer.id = "episodes-container";
  episodesContainer.style.display = "grid";
  episodesContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
  episodesContainer.style.gap = "20px";

episodeList.forEach((episode) => {
  const seasonNumber = String(episode.season).padStart(2, "0");
  const episodeNumber = String(episode.number).padStart(2, "0");
  const code = `S${seasonNumber}E${episodeNumber}`;

  const episodeCard = document.createElement("section");
  episodeCard.className = "episode-card";
  episodeCard.id = code;

  const title = document.createElement("h2");
  title.textContent = `${code} — ${episode.name}`;
  // Apply blue color to all titles
  title.style.color = "blue";
  episodeCard.appendChild(title);

  if (episode.image?.medium) {
    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.alt = episode.name;
    episodeCard.appendChild(img);
  }

  const summary = document.createElement("div");
  summary.innerHTML = episode.summary || "No summary available.";
  // Make summary slightly bigger for all episodes
  summary.style.fontSize = "1rem";

  episodeCard.appendChild(summary);
  episodesContainer.appendChild(episodeCard);
});


  rootElem.appendChild(episodesContainer);
}

// window.onload = setup;

document.addEventListener("DOMContentLoaded", setup);

//  const credit = document.createElement("p");
//   credit.innerHTML = `Data originally from <a href="https://www.tvmaze.com" target="_blank" rel="noopener noreferrer">TVMaze.com</a>`;
//   credit.style.marginTop = "20px";
//   rootElem.appendChild(credit);

// In script.js removed credit variable and took the functionality to index.html
// In script.js filter episode search function added

// Level 200,in script.js episodeSelector function added. 
// Level 400,in script.js show selection functionality added. 


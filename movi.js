
const API_KEY = '51f5ba3c'; // Replace with your OMDb API key

async function searchMovie() {
  const query = document.getElementById("searchInput").value;
  const movieContainer = document.getElementById("movieContainer");
  movieContainer.innerHTML = "";

  if (!query) {
    movieContainer.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "True") {
      data.Search.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}" />
          <div>
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
          </div>
        `;
        movieContainer.appendChild(movieCard);
      });
    } else {
      movieContainer.innerHTML = `<p>No results found for "${query}"</p>`;
    }
  } catch (error) {
    movieContainer.innerHTML = "<p>Error fetching data.</p>";
    console.error("Fetch error:", error);
  }
}


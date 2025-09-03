const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
});

const movieInput = document.getElementById("movie-input");
const suggestionsList = document.getElementById("suggestions");
const movieGrid = document.getElementById("movie-grid");
const recommendTitle = document.getElementById("recommend-title");

let movies = [];

fetch("backend/movies.json") // For local testing, backend will serve JSON
    .then(res => res.json())
    .then(data => { movies = data; displayMovies(movies); });

function displayMovies(movieArray) {
    movieGrid.innerHTML = "";
    movieArray.forEach(movie => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">⭐ ${movie.rating}</div>
            <div class="movie-genre">${movie.genre}</div>
        `;
        movieGrid.appendChild(li);
    });
}

movieInput.addEventListener("input", () => {
    const query = movieInput.value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
    suggestionsList.innerHTML = "";
    filtered.forEach(m => {
        const li = document.createElement("li");
        li.textContent = m.title;
        li.addEventListener("click", () => {
            movieInput.value = m.title;
            suggestionsList.innerHTML = "";
            recommendMovies(m.title);
        });
        suggestionsList.appendChild(li);
    });
});

function recommendMovies(title) {
    const movie = movies.find(m => m.title === title);
    if (!movie) return;
    recommendTitle.textContent = `Because you liked "${title}", you might also like:`;
    const recommended = movies.filter(m => m.genre === movie.genre && m.title !== movie.title);
    displayMovies(recommended);
}

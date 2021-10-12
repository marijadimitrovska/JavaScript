let loginForm = document.querySelector("#loginForm"),
  username = document.querySelector("#email"),
  password = document.querySelector("#password"),
  homePage = document.querySelector("#homePage"),
  loginPage = document.querySelector("#loginPage"),
  movieDetails = document.querySelector("#movieDetails"),
  logoutBtn = document.querySelector(".logout-btn"),
  searchForm = document.querySelector(".search-form"),
  searchInput = document.querySelector("#search"),
  logo = document.querySelector(".logo");

// step 1
function onLogin(e) {
  e.preventDefault();

  if (username.value !== "" && password.value !== "") {
    localStorage.setItem("user-login", "true");
    location.hash = "";
  }
}

loginForm.addEventListener("submit", onLogin);
// !!
// ____________________________________________________________

// step 2
function handleRoute() {
  let _hash = location.hash;

  if (localStorage.getItem("user-login") === null && _hash !== "#login") {
    location.hash = "#login";
  }

  if (_hash.includes("moviedetails")) {
    _hash = "moviedetails";
  }

  switch (_hash) {
    case "":
      // we are currently on the home page
      // show the homepage
      homePage.style.display = "block";
      logoutBtn.style.display = "block";
      searchForm.style.display = "block";
      // hide the other pages
      loginPage.style.display = "none";
      movieDetails.style.display = "none";
      break;

    case "#login":
      // we are currently on the login page
      if (localStorage.getItem("user-login")) {
        location.hash = "";
        break;
      }

      // show the login page
      loginPage.style.display = "block";

      // hide the other pages
      homePage.style.display = "none";
      movieDetails.style.display = "none";
      logoutBtn.style.display = "none";
      searchForm.style.display = "none";
      break;

    // step 5
    case "moviedetails":
      // we are currently on the movie details page
      // show the movie details page
      movieDetails.style.display = "block";
      logoutBtn.style.display = "block";

      // hide the other pages
      loginPage.style.display = "none";
      homePage.style.display = "none";
      searchForm.style.display = "none";

      // console.log(location.hash);
      // console.log(location.hash.split('/'));
      // console.log(location.hash.split('/')[1]);
      const movieId = location.hash.split("/")[1];
      const movie = movieList.find((el) => el.id == movieId);
      // console.log(movie);

      movieDetails.innerHTML = "";
      movieDetails.appendChild(drawMovie(movie));

      break;
    // !!

    default:
      location.hash = "";
      break;
  }
}

window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);
// !!

// step 3
function onLogout() {
  localStorage.removeItem("user-login");
  location.hash = "#login";
}

logoutBtn.addEventListener("click", onLogout);
// !!

// step4
function drawMovie(movie) {
  const movieHolder = document.createElement("div");
  movieHolder.classList.add("movie");

  const image = document.createElement("img");
  image.setAttribute("src", movie.image);

  const h2 = document.createElement("h2");
  h2.innerText = movie.title;

  const genres = document.createElement("p");
  genres.innerText = movie.genre.join(", ");

  const year = document.createElement("p");
  year.innerText = movie.year;

  movieHolder.appendChild(image);
  movieHolder.appendChild(h2);
  movieHolder.appendChild(genres);
  movieHolder.appendChild(year);

  // step 5
  movieHolder.addEventListener("click", function () {
    // console.log("clicked");
    location.hash = `#moviedetails/${movie.id}`;
  });
  // !!

  return movieHolder;
}

movieList.forEach((el) => homePage.appendChild(drawMovie(el)));
// !!

// step 6
function search() {
  // console.log(searchInput.value);
  let query = searchInput.value.toLowerCase();

  const filteredMovies = movieList.filter(
    (el) =>
      el.title.toLowerCase().includes(query) ||
      el.year.toString().includes(query) ||
      el.genre.join(", ").toLowerCase().includes(query)
  );
  // console.log(filteredMovies);

  homePage.innerHTML = "";
  filteredMovies.forEach((el) => homePage.appendChild(drawMovie(el)));
}
searchInput.addEventListener("keyup", search);
// !!

//step 7
function goHome() {
  location.hash = "";

  // if you want to keep this, if not comment it out
  if (searchInput.value !== "") {
    searchInput.value = "";

    homePage.innerHTML = "";
    movieList.forEach((el) => homePage.appendChild(drawMovie(el)));
  }
}

logo.addEventListener("click", goHome);
// !!

// movie skeleton
{
  /* <div class="movie">
  <img src="img" />
  <h2>Frozen</h2>
  <p>drama, fantasy</p>
  <p>2019</p>
</div> */
}

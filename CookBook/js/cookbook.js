let cardContainer = document.querySelector('#card-container');
let fullRecipeContainer = document.querySelector('#full-recipe-container');
let searchContainer = document.querySelector('#search-container');
let tagContainer = document.querySelector('#tag-container');
let header = document.querySelector('header');
let filters = document.querySelector('#filters');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCard(cardData) {
  let card = document.createElement('div');
  let cimage = document.createElement('div');
  let title = document.createElement('h5');
  let contents = document.createElement('div');
  let actions = document.createElement('div');

  card.classList.add('card');

  cimage.classList.add('card-image');
  let img = document.createElement('img');
  img.src = './images/' + getRandomInt(1, 29) + '.jpg';
  cimage.appendChild(img);

  title.innerText = cardData.name;

  contents.classList.add('card-content');
  contents.appendChild(title);

  cardData.tags.forEach((tag) => {
    let tagLink = document.createElement('a');
    tagLink.innerText = '#' + tag;
    contents.appendChild(tagLink);

    tagLink.addEventListener('click', function () {
      console.log(tag);

      // Exercise X
      location.hash = `tag/${tag}`;


      // // Exercise VIII
      // tagContainer.innerHTML = '';
      // const filteredRecipeData = recipeData.filter(function (recipe) {
      //   return recipe.tags.includes(tag);
      // })
      // console.log(filteredRecipeData);

      // filteredRecipeData.forEach(function (recipe) {
      //   tagContainer.appendChild(createCard(recipe))
      // })


    })
  });

  actions.classList.add('card-action');
  let link = document.createElement('a');
  link.innerText = "Open Recipe";
  link.classList.add('waves-effect', 'waves-light', 'btn', 'orange');
  link.href = '#' + cardData.id;
  actions.appendChild(link);

  card.appendChild(cimage);
  card.appendChild(contents);
  card.appendChild(actions);

  return card;
};

function renderRecipe() {
  let id = location.hash.replace('#', '');
  let recipe = recipeData.find(r => r.id === id);
  // let recipe = recipeData.find(function (r) {
  //   return r.id === id
  // });
  fullRecipeContainer.innerHTML = '';

  let wrapper = document.createElement('div');
  let card = document.createElement('div');
  let cimage = document.createElement('div');
  let title = document.createElement('h3');
  let contents = document.createElement('div');

  wrapper.classList.add('full-recipe-wrapper');

  title.innerText = recipe.name;

  cimage.classList.add('card-image');
  let img = document.createElement('img');
  img.src = './images/' + getRandomInt(1, 29) + '.jpg';
  cimage.appendChild(img);

  contents.classList.add('card-content');
  // Exercise 6 here - add ingredient list
  // !!
  let h4Ingredients = document.createElement('h4');
  h4Ingredients.innerText = 'Ingredients';

  let ulIngredients = document.createElement('ul');
  recipe.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.innerText = ing;
    ulIngredients.appendChild(li);
  })

  let p = document.createElement('p');
  p.innerText = recipe.instructions;
  let h4Instructions = document.createElement('h4');
  h4Instructions.innerText = 'Instructions';

  // Exercise 6 - append the new elements here
  // !!
  contents.appendChild(h4Ingredients);
  contents.appendChild(ulIngredients);
  contents.appendChild(h4Instructions);
  contents.appendChild(p);

  card.classList.add('card');
  card.appendChild(cimage);
  card.appendChild(contents);

  // Exercise 5 here - add a back "button"
  // !!
  const backBtn = document.createElement('a');
  backBtn.href = '#';
  // backBtn.setAttribute('href','#');
  backBtn.classList.add('waves-effect', 'waves-light', 'btn', 'orange');
  backBtn.innerText = 'Back';

  wrapper.appendChild(backBtn)
  wrapper.appendChild(title);
  wrapper.appendChild(card);

  fullRecipeContainer.appendChild(wrapper);
}

// Exercise 1 - draw cards on screen using the
// createCard function.
recipeData.length = 20;

recipeData.forEach(recipe => {
  const cardHtml = createCard(recipe)
  cardContainer.appendChild(cardHtml)
})

// Exercise 2 - create a basic router

function handleRoute(e) {
  e.preventDefault();

  const hash = location.hash; //#value
  console.log(hash);

  if (hash === '') {
    // home page
    cardContainer.style.display = 'flex';
    fullRecipeContainer.style.display = 'none';
    tagContainer.style.display = 'none';
    searchContainer.style.display = 'none';
  } else {
    const isTag = hash.includes('tag');
    const isSearch = hash.includes('search');
    if (isTag) {
      // tag page

      // Exercise XII
      // "tag/value"
      // ['tag', 'value']
      const tag = hash.split('/')[1]

      // Exercise XIII
      tagContainer.innerHTML = '';
      const filteredRecipeData = recipeData.filter(function (recipe) {
        return recipe.tags.includes(tag);
      })
      // Exercise XIV
      filteredRecipeData.forEach(function (recipe) {
        tagContainer.appendChild(createCard(recipe))
      })

      cardContainer.style.display = 'none';
      fullRecipeContainer.style.display = 'none';
      tagContainer.style.display = 'flex';
      searchContainer.style.display = 'none';

    } else if (isSearch) {
      // search page
      cardContainer.style.display = 'none';
      fullRecipeContainer.style.display = 'none';
      tagContainer.style.display = 'none';
      searchContainer.style.display = 'flex';
    } else {
      // full recipe page
      cardContainer.style.display = 'none';
      fullRecipeContainer.style.display = 'flex';
      tagContainer.style.display = 'none';
      searchContainer.style.display = 'none';
      renderRecipe();
    }

  }
}


function renderSearchForm() {
  //Exercise XV
  const searchInput = document.createElement('input');

  const searchBtn = document.createElement('button');
  searchBtn.innerText = 'Search';
  searchBtn.classList.add('waves-effect', 'waves-light', 'btn', 'green');
  searchBtn.style.width = '100%';

  filters.append(searchInput, searchBtn)

  // Exercise XVI
  searchBtn.addEventListener('click', function () {
    location.hash = `search/${searchInput.value}`
    // ["seafood", "shrimp", "main"].toString() // "seafood,shrimp,main"
    // ["seafood", "shrimp", "main"].join() // "seafood,shrimp,main"
    // ["seafood", "shrimp", "main"].join(' ') // "seafood shrimp main"
    const filteredRecipeData = recipeData
      .filter((recipe) => {
        return recipe.tags.join(' ').includes(searchInput.value) || recipe.name.includes(searchInput.value)
      })

    console.log(filteredRecipeData);
    searchContainer.innerHTML = '';
    filteredRecipeData.forEach(recipe => searchContainer.appendChild(createCard(recipe)))
  })

}

renderSearchForm();





window.addEventListener('hashchange', handleRoute)
window.addEventListener('load', handleRoute)

// Exercise XI
header.addEventListener('click', function () {
  location.hash = '';
})


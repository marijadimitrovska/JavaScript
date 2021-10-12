//Exercise I:
// - There аrе starter files with a setup created for you.
// - All the cards info can be found in the products.js file and you have to work in the main.js file.
// - The card skeleton is shown in the html starter file (be sure to comment or remove it when you start with the javascript logic).
// - The steps you need to follow are:

// - Loop over the products array and for each iteration show a card in the div with an id='list'.
// console.log(products);
const list = document.querySelector("#list");

products.forEach((obj) => {
  // list.innerHTML += `
  //   <div class="col-4 mb-5" id="${obj.id}">
  //     <a href="https://www.google.com" class="link d-flex flex-column">
  //       <img
  //         src="${obj.img}"
  //         class="img-fluid"
  //       />
  //       <div class="item-content p-3 d-flex flex-column flex-grow-1">
  //         <h2 class="title">${obj.title}</h2>
  //         <p class="paragraph">${obj.desc}</p>
  //         <button class="btn btn-danger del-btn mt-auto align-self-end">
  //           Delete
  //         </button>
  //       </div>
  //     </a>
  //   </div>
  // `;
  renderCard(obj);
});

// - Clicking on the '+' button opens the bootstrap modal which will be used for adding a new card to the list. Make sure all the inputs are filled with text, and only then clicking on the 'add-btn' you should add a new card to the div with an id='list' in html. For the new card ids, use the products array length.
// - Clear the input values after adding a new card.
// - Now that you’ve added a new card in html, create an object similar to the ones in the products.js file and add it (push it) to the products array as well.

const addBtn = document.querySelector("#add-product"),
  imgInput = document.querySelector("#img"),
  titleInput = document.querySelector("#title"),
  descInput = document.querySelector("#desc");

addBtn.addEventListener("click", () => {
  if (imgInput.value && titleInput.value && descInput.value) {
    // inputs are filled
    let newProductObj = {
      id: products.length,
      img: imgInput.value,
      title: titleInput.value,
      desc: descInput.value,
    };

    renderCard(newProductObj);
    // list.innerHTML += `
    //   <div class="col-4 mb-5" id="${newProductObj.id}">
    //     <a href="https://www.google.com" class="link d-flex flex-column">
    //       <img
    //         src="${newProductObj.img}"
    //         class="img-fluid"
    //       />
    //       <div class="item-content p-3 d-flex flex-column flex-grow-1">
    //         <h2 class="title">${newProductObj.title}</h2>
    //         <p class="paragraph">${newProductObj.desc}</p>
    //         <button class="btn btn-danger del-btn mt-auto align-self-end">
    //           Delete
    //         </button>
    //       </div>
    //     </a>
    //   </div>
    // `;

    products.push(newProductObj);
    console.log(products);

    imgInput.value = "";
    titleInput.value = "";
    descInput.value = "";
  }
});

// - Clicking on the 'del-btn' in html, remove the correspondent card from the html file and from the products array also.
// - Now that you’ve removed the card, the id’s of the elements are shuffled, meaning: when you attempt to add a new card, two or more cards can have the same ids. In order to fix that, loop over the cards again and update their ids after clicking on the 'del-btn'.
document.addEventListener("click", function (e) {
  // console.log('target', e.target);
  if (e.target.classList.contains("del-btn")) {
    e.preventDefault(); // disable the link
    // console.log('clicked on the del-btn');

    // let currentCardCont = e.target.parentElement.parentElement.parentElement;
    let currentCardCont = e.target.closest(".col-4");
    // console.log(currentCardCont);

    // remove from html
    currentCardCont.remove();

    // console.log(currentCardCont.id);

    //remove from the products array
    // example 1
    // products.splice(currentCardCont.id, 1);

    // example 2
    products = products.filter((el) => el.id != currentCardCont.id);
    // console.log(products);

    // update the ids in the products array
    products.forEach((el, i) => (el.id = i));

    // update the ids in the html
    Array.from(list.children).forEach((el, i) => (el.id = i));
  }
});

// - Clicking on the 'search-btn' you should filter/search through all the cards based on their titles.
const searchBtn = document.querySelector(".search-btn"),
  searchInput = document.querySelector(".search-input");

searchBtn.addEventListener("click", () => {
  let searchQuery = searchInput.value.toLowerCase(); // bub

  let filteredProducts = products.filter(
    (el) =>
      // bez prva bukva
      el.title.toLowerCase().includes(searchQuery) || el.desc.toLowerCase().includes(searchQuery)

    // so prva bukva
    // bubblesort
    // substring(0, searchQuery.length) // bub
    // bub === bub
    // el.title.substring(0, searchQuery.length).toLowerCase() === searchQuery ||
    // el.desc.substring(0, searchQuery.length).toLowerCase() === searchQuery
  );

  // console.log(filteredProducts);
  list.innerHTML = "";

  filteredProducts.forEach((el) => {
    renderCard(el);
    // list.innerHTML += `
    //   <div class="col-4 mb-5" id="${el.id}">
    //     <a href="https://www.google.com" class="link d-flex flex-column">
    //       <img
    //         src="${el.img}"
    //         class="img-fluid"
    //       />
    //       <div class="item-content p-3 d-flex flex-column flex-grow-1">
    //         <h2 class="title">${el.title}</h2>
    //         <p class="paragraph">${el.desc}</p>
    //         <button class="btn btn-danger del-btn mt-auto align-self-end">
    //           Delete
    //         </button>
    //       </div>
    //     </a>
    //   </div>
    // `;
  });
});

// - Optimize your code: use one function called renderCard to render the same html you are rendering in 3 places.
function renderCard(obj) {
  list.innerHTML += `
    <div class="col-4 mb-5" id="${obj.id}">
      <a href="https://www.google.com" class="link d-flex flex-column">
        <img
          src="${obj.img}"
          class="img-fluid"
        />
        <div class="item-content p-3 d-flex flex-column flex-grow-1">
          <h2 class="title">${obj.title}</h2>
          <p class="paragraph">${obj.desc}</p>
          <button class="btn btn-danger del-btn mt-auto align-self-end">
            Delete
          </button>
        </div>
      </a>
    </div>
  `;
}

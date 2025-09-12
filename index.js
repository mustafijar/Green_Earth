
// // ================= Spinner =================
// const manageSpinner = (status) => {
//   if (status) {
//     document.getElementById("spinner").classList.remove("hidden");
//     document.getElementById("allCards").classList.add("hidden");
//   } else {
//     document.getElementById("spinner").classList.add("hidden");
//     document.getElementById("allCards").classList.remove("hidden");
//   }
// };

// // ================= Remove Active Category =================
// const removeActive = () => {
//   const categoriesBtns = document.querySelectorAll(".categoriesBtn");
//   categoriesBtns.forEach((btn) => {
//     btn.classList.remove("bg-green-700", "text-white", "rounded-md");
//   });
//   document.getElementById("categoriesBtn").classList.remove("bg-green-700", "text-white", "rounded-md");
// };

// // ================= Display Categories =================
// const displayAllTrees = (trees) => {
//   const treesCard = document.getElementById("categotis");
//   treesCard.innerHTML = "";
//   trees.forEach((tree) => {
//     const btn = document.createElement("button");
//     btn.id = `category-btn-${tree.id}`;
//     btn.className = "text-left p-2 font-semibold w-full rounded-sm hover:bg-green-800 categoriesBtn";
//     btn.innerText = tree.category_name;
//     btn.addEventListener("click", () => clickBtn(tree.id));
//     treesCard.appendChild(btn);
//   });
// };

// // ================= Fetch Categories =================
// const allTrees = () => {
//   fetch("https://openapi.programming-hero.com/api/categories")
//     .then(res => res.json())
//     .then(json => displayAllTrees(json.categories));
// };

// // ================= Fetch All Plants (Random 6) =================
// const allCards = () => {
//   manageSpinner(true);
//   fetch("https://openapi.programming-hero.com/api/plants")
//     .then(res => res.json())
//     .then(json => {
//       const plants = json.plants;
//       const shuffled = plants.sort(() => 0.5 - Math.random()).slice(0, 6);
//       displayPlants(shuffled);
//     });
// };

// // ================= Click Category =================
// const clickBtn = (id) => {
//   manageSpinner(true);
//   fetch(`https://openapi.programming-hero.com/api/category/${id}`)
//     .then(res => res.json())
//     .then(json => {
//       removeActive();
//       const clickBtn = document.getElementById(`category-btn-${id}`);
//       clickBtn.classList.add("bg-green-700", "text-white", "rounded-md");
//       displayPlants(json.plants);
//     });
// };

// // ================= Display Plants in Cards =================
// const displayPlants = (plants) => {
//   const allCardsDiv = document.getElementById("allCards");
//   allCardsDiv.innerHTML = "";

//   plants.forEach(plant => {
//     const div = document.createElement("div");
//     div.className = "bg-white p-4 rounded-lg hover:shadow-lg transition";

//     div.innerHTML = `
//       <div>
//         <img src="${plant.image}" class="rounded-lg h-[180px] w-full object-cover mx-auto" alt="${plant.name}">
//       </div>
//       <div class="space-y-2 mt-2">
//         <button class="text-xl font-bold text-left hover:text-green-700 modal-btn">${plant.name}</button>
//         <p class="opacity-70 line-clamp-2">${plant.description}</p>
//       </div>
//       <div class="flex justify-between items-center py-2">
//         <button class="btn border-none bg-[#DCFCE7] text-[#15803D] font-semibold rounded-3xl">${plant.category}</button>
//         <p class="font-bold">৳ <span>${plant.price}</span></p>
//       </div>
//       <button class="btn bg-[#15803D] text-white rounded-3xl w-full add-cart">Add to Cart</button>
//     `;

//     allCardsDiv.appendChild(div);

//     // ================= Modal =================
//     div.querySelector(".modal-btn").addEventListener("click", () => {
//       document.getElementById("modal-img").src = plant.image;
//       document.getElementById("modal-name").textContent = plant.name;
//       document.getElementById("modal-category").textContent = "Category: " + plant.category;
//       document.getElementById("modal-desc").textContent = plant.description;
//       document.getElementById("modal-price").textContent = "৳ " + plant.price;
//       document.getElementById("my_modal_5").classList.remove("hidden");
//     });

//     // ================= Add to Cart =================
//     div.querySelector(".add-cart").addEventListener("click", () => showAlert(plant.name, plant.price));
//   });
//   manageSpinner(false);
// };

// // ================= All Trees Button =================
// const allTreesBtn = () => {
//   removeActive();
//   allCards();
//   const allBtn = document.getElementById("categoriesBtn");
//   allBtn.classList.add("bg-green-700", "text-white", "rounded-md");
// };

// // ================= Modal Close =================
// document.getElementById("close-modal").addEventListener("click", () => {
//   document.getElementById("my_modal_5").classList.add("hidden");
// });

// // ================= Cart Logic =================
// let total = 0;

// const showAlert = (name, price) => {
//   const alertBox = document.getElementById("global-alert");
//   document.getElementById("alert-message").innerText = `Add ${name} to cart?`;
//   alertBox.classList.remove("hidden");

//   const okBtn = document.getElementById("alert-ok");
//   const cancelBtn = document.getElementById("alert-cancel");

//   // Remove old event listeners
//   okBtn.replaceWith(okBtn.cloneNode(true));
//   cancelBtn.replaceWith(cancelBtn.cloneNode(true));

//   document.getElementById("alert-ok").addEventListener("click", () => {
//     addToCart(name, price);
//     alertBox.classList.add("hidden");
//   });

//   document.getElementById("alert-cancel").addEventListener("click", () => {
//     alertBox.classList.add("hidden");
//   });
// };

// const addToCart = (name, price) => {
//   const yourCard = document.getElementById("yourCard");
//   const spanTotal = document.getElementById("spnTotal");
//   const div = document.createElement("div");

//   div.innerHTML = `
//     <div class="flex justify-between items-center bg-[#DCFCE7] p-2 rounded-lg">
//       <div class="space-y-1">
//         <h2 class="font-bold">${name}</h2>
//         <p class="opacity-70">৳ <span>${price}</span> × 1</p>
//       </div>
//       <div class="opacity-70 text-red-500 cursor-pointer">
//         <i class="fa-solid fa-xmark"></i>
//       </div>
//     </div>
//   `;

//   total += price;
//   spanTotal.innerText = total;

//   div.querySelector("i").addEventListener("click", function () {
//     div.remove();
//     total -= price;
//     spanTotal.innerText = total;
//   });

//   yourCard.appendChild(div);
// };

// // ================= Initialize =================
// allTrees();
// allCards();

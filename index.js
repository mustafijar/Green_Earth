// ======================================================
// GREEN EARTH - INDEX.JS
// Supabase Authentication + Plants + Categories + Cart
// ======================================================


// ======================================================
// AUTHENTICATION
// ======================================================

const authButtons = document.getElementById("authButtons");


// Check logged-in user
const checkUser = async () => {

  // If authButtons doesn't exist, stop
  if (!authButtons) return;

  try {

    // Get current Supabase user
    const {
      data: { user },
      error: userError
    } = await supabaseClient.auth.getUser();


    // If there is an error
    if (userError) {
      console.error("User error:", userError);
      return;
    }


    // ==============================================
    // USER NOT LOGGED IN
    // ==============================================

    if (!user) {

      authButtons.innerHTML = `

        <a
          href="login.html"
          class="btn bg-green-700 text-white rounded-full"
        >
          Login
        </a>

        <a
          href="register.html"
          class="btn border border-green-700 text-green-700 rounded-full"
        >
          Register
        </a>

      `;

      return;
    }


    // ==============================================
    // USER IS LOGGED IN
    // ==============================================

    let userName = user.user_metadata?.name || "User";


    // Try to get profile from database
    const {
      data: profile,
      error: profileError
    } = await supabaseClient
      .from("profiles")
      .select("name, email")
      .eq("id", user.id)
      .single();


    // If profile exists, use database name
    if (!profileError && profile?.name) {
      userName = profile.name;
    }


    // Show logged-in UI
    authButtons.innerHTML = `

      <span class="font-semibold text-green-700">
        Hi, ${userName}
      </span>

      <button
        id="logoutBtn"
        class="btn bg-red-500 text-white rounded-full"
      >
        Logout
      </button>

    `;


    // Logout button
    const logoutBtn =
      document.getElementById("logoutBtn");


    if (logoutBtn) {

      logoutBtn.addEventListener(
        "click",
        logout
      );

    }

  } catch (error) {

    console.error(
      "Authentication error:",
      error
    );

  }

};


// ======================================================
// LOGOUT
// ======================================================

const logout = async () => {

  try {

    const { error } =
      await supabaseClient.auth.signOut();


    if (error) {

      console.error(
        "Logout error:",
        error
      );

      return;
    }


    // Go to home page
    window.location.href = "index.html";

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

  }

};


// ======================================================
// SPINNER
// ======================================================

const manageSpinner = (status) => {

  const spinner =
    document.getElementById("spinner");

  const allCardsElement =
    document.getElementById("allCards");


  if (!spinner || !allCardsElement) return;


  if (status) {

    spinner.classList.remove("hidden");

    allCardsElement.classList.add("hidden");

  } else {

    spinner.classList.add("hidden");

    allCardsElement.classList.remove("hidden");

  }

};


// ======================================================
// REMOVE ACTIVE CATEGORY
// ======================================================

const removeActive = () => {

  const categoriesBtns =
    document.querySelectorAll(
      ".categoriesBtn"
    );


  categoriesBtns.forEach((btn) => {

    btn.classList.remove(
      "bg-green-700",
      "text-white",
      "rounded-md"
    );

  });


  const allButton =
    document.getElementById(
      "categoriesBtn"
    );


  if (allButton) {

    allButton.classList.remove(
      "bg-green-700",
      "text-white",
      "rounded-md"
    );

  }

};


// ======================================================
// DISPLAY CATEGORIES
// ======================================================

const displayAllTrees = (trees) => {

  const treesCard =
    document.getElementById(
      "categotis"
    );


  if (!treesCard) return;


  treesCard.innerHTML = "";


  trees.forEach((tree) => {

    const btn =
      document.createElement("button");


    btn.id =
      `category-btn-${tree.id}`;


    btn.className =
      "text-left p-2 font-semibold w-full rounded-sm hover:bg-green-800 categoriesBtn";


    btn.innerText =
      tree.category_name;


    btn.addEventListener(
      "click",
      () => clickBtn(tree.id)
    );


    treesCard.appendChild(btn);

  });

};


// ======================================================
// FETCH CATEGORIES
// ======================================================

const allTrees = () => {

  fetch(
    "https://openapi.programming-hero.com/api/categories"
  )

    .then((res) => res.json())

    .then((json) => {

      displayAllTrees(
        json.categories
      );

    })

    .catch((error) => {

      console.error(
        "Category fetch error:",
        error
      );

    });

};


// ======================================================
// FETCH ALL PLANTS - RANDOM 6
// ======================================================

const allCards = () => {

  manageSpinner(true);


  fetch(
    "https://openapi.programming-hero.com/api/plants"
  )

    .then((res) => res.json())

    .then((json) => {

      const plants =
        json.plants || [];


      // Random 6 plants
      const shuffled =
        [...plants]
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);


      displayPlants(shuffled);

    })

    .catch((error) => {

      console.error(
        "Plants fetch error:",
        error
      );

      manageSpinner(false);

    });

};


// ======================================================
// CLICK CATEGORY
// ======================================================

const clickBtn = (id) => {

  manageSpinner(true);


  fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  )

    .then((res) => res.json())

    .then((json) => {

      removeActive();


      const clickedButton =
        document.getElementById(
          `category-btn-${id}`
        );


      if (clickedButton) {

        clickedButton.classList.add(
          "bg-green-700",
          "text-white",
          "rounded-md"
        );

      }


      displayPlants(
        json.plants || []
      );

    })

    .catch((error) => {

      console.error(
        "Category plants error:",
        error
      );

      manageSpinner(false);

    });

};


// ======================================================
// DISPLAY PLANTS
// ======================================================

const displayPlants = (plants) => {

  const allCardsDiv =
    document.getElementById(
      "allCards"
    );


  if (!allCardsDiv) return;


  allCardsDiv.innerHTML = "";


  plants.forEach((plant) => {

    const div =
      document.createElement("div");


    div.className =
      "bg-white p-4 rounded-lg hover:shadow-lg transition";


    div.innerHTML = `

      <div>

        <img
          src="${plant.image}"
          class="rounded-lg h-[180px] w-full object-cover mx-auto"
          alt="${plant.name}"
        >

      </div>


      <div class="space-y-2 mt-2">

        <button
          class="text-xl font-bold text-left hover:text-green-700 modal-btn"
        >
          ${plant.name}
        </button>

        <p class="opacity-70 line-clamp-2">
          ${plant.description}
        </p>

      </div>


      <div class="flex justify-between items-center py-2">

        <button
          class="btn border-none bg-[#DCFCE7] text-[#15803D] font-semibold rounded-3xl"
        >
          ${plant.category}
        </button>

        <p class="font-bold">
          ৳ <span>${plant.price}</span>
        </p>

      </div>


      <button
        class="btn bg-[#15803D] text-white rounded-3xl w-full add-cart"
      >
        Add to Cart
      </button>

    `;


    allCardsDiv.appendChild(div);


    // ==================================================
    // MODAL
    // ==================================================

    const modalButton =
      div.querySelector(
        ".modal-btn"
      );


    if (modalButton) {

      modalButton.addEventListener(
        "click",
        () => {

          const modalImg =
            document.getElementById(
              "modal-img"
            );

          const modalName =
            document.getElementById(
              "modal-name"
            );

          const modalCategory =
            document.getElementById(
              "modal-category"
            );

          const modalDesc =
            document.getElementById(
              "modal-desc"
            );

          const modalPrice =
            document.getElementById(
              "modal-price"
            );

          const modal =
            document.getElementById(
              "my_modal_5"
            );


          if (modalImg)
            modalImg.src =
              plant.image;


          if (modalName)
            modalName.textContent =
              plant.name;


          if (modalCategory)
            modalCategory.textContent =
              "Category: " +
              plant.category;


          if (modalDesc)
            modalDesc.textContent =
              plant.description;


          if (modalPrice)
            modalPrice.textContent =
              "৳ " +
              plant.price;


          if (modal)
            modal.classList.remove(
              "hidden"
            );

        }
      );

    }


    // ==================================================
    // ADD TO CART
    // ==================================================

    const addCartButton =
      div.querySelector(
        ".add-cart"
      );


    if (addCartButton) {

      addCartButton.addEventListener(
        "click",
        () => {

          showAlert(
            plant.name,
            plant.price
          );

        }
      );

    }

  });


  manageSpinner(false);

};


// ======================================================
// ALL TREES BUTTON
// ======================================================

const allTreesBtn = () => {

  removeActive();


  allCards();


  const allBtn =
    document.getElementById(
      "categoriesBtn"
    );


  if (allBtn) {

    allBtn.classList.add(
      "bg-green-700",
      "text-white",
      "rounded-md"
    );

  }

};


// ======================================================
// MODAL CLOSE
// ======================================================

const closeModal =
  document.getElementById(
    "close-modal"
  );


if (closeModal) {

  closeModal.addEventListener(
    "click",
    () => {

      const modal =
        document.getElementById(
          "my_modal_5"
        );


      if (modal) {

        modal.classList.add(
          "hidden"
        );

      }

    }
  );

}


// ======================================================
// CART
// ======================================================

let total = 0;


// ======================================================
// CART CONFIRMATION ALERT
// ======================================================

const showAlert = (name, price) => {

  const alertBox =
    document.getElementById(
      "global-alert"
    );

  const alertMessage =
    document.getElementById(
      "alert-message"
    );

  const okButton =
    document.getElementById(
      "alert-ok"
    );

  const cancelButton =
    document.getElementById(
      "alert-cancel"
    );


  if (
    !alertBox ||
    !alertMessage ||
    !okButton ||
    !cancelButton
  ) {

    // If custom alert doesn't exist,
    // directly add to cart
    addToCart(name, price);

    return;

  }


  alertMessage.innerText =
    `Add ${name} to cart?`;


  alertBox.classList.remove(
    "hidden"
  );


  // Remove old event listeners
  const newOkButton =
    okButton.cloneNode(true);

  const newCancelButton =
    cancelButton.cloneNode(true);


  okButton.replaceWith(
    newOkButton
  );

  cancelButton.replaceWith(
    newCancelButton
  );


  document
    .getElementById("alert-ok")
    .addEventListener(
      "click",
      () => {

        addToCart(
          name,
          price
        );

        alertBox.classList.add(
          "hidden"
        );

      }
    );


  document
    .getElementById("alert-cancel")
    .addEventListener(
      "click",
      () => {

        alertBox.classList.add(
          "hidden"
        );

      }
    );

};


// ======================================================
// ADD TO CART
// ======================================================

const addToCart = (name, price) => {

  const yourCard =
    document.getElementById(
      "yourCard"
    );

  const spanTotal =
    document.getElementById(
      "spnTotal"
    );


  if (!yourCard || !spanTotal) {
    return;
  }


  const div =
    document.createElement("div");


  div.innerHTML = `

    <div
      class="flex justify-between items-center bg-[#DCFCE7] p-2 rounded-lg"
    >

      <div class="space-y-1">

        <h2 class="font-bold">
          ${name}
        </h2>

        <p class="opacity-70">
          ৳ <span>${price}</span> × 1
        </p>

      </div>


      <div
        class="opacity-70 text-red-500 cursor-pointer"
      >

        <i class="fa-solid fa-xmark"></i>

      </div>

    </div>

  `;


  // Make sure price is a number
  const numericPrice =
    Number(price) || 0;


  total += numericPrice;


  spanTotal.innerText =
    total;


  const removeButton =
    div.querySelector("i");


  if (removeButton) {

    removeButton.addEventListener(
      "click",
      () => {

        div.remove();


        total -= numericPrice;


        spanTotal.innerText =
          total;

      }
    );

  }


  yourCard.appendChild(div);

};


// ======================================================
// INITIALIZE
// ======================================================


// Check Supabase login
checkUser();


// Load categories
allTrees();


// Load random 6 plants
allCards();
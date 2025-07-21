document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
  const ageModal = document.getElementById("ageModal");
  const ageInput = document.getElementById("ageInput");
  const ageConfirmBtn = document.getElementById("ageConfirmBtn");
  const ageCancelBtn = document.getElementById("ageCancelBtn");

  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterAppBtn = document.getElementById("enterAppBtn");
  const mainApp = document.getElementById("mainApp");

  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettings = document.getElementById("closeSettings");

  const addModal = document.getElementById("addModal");
  const closeAdd = document.getElementById("closeAdd");
  const addForm = document.getElementById("addForm");

  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const cartItemsContainer = document.getElementById("cartItems");

  const profileModal = document.getElementById("profileModal");
  const closeProfile = document.getElementById("closeProfile");
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const profilePhotoPreview = document.getElementById("profilePhotoPreview");
  const usernameInput = document.getElementById("usernameInput");
  const emailInput = document.getElementById("emailInput");
  const messagesContainer = document.getElementById("messagesContainer");

  const navButtons = document.querySelectorAll(".nav-btn");
  const categoryButtons = document.querySelectorAll(".cat-btn");
  const catalog = document.getElementById("catalog");

  const countrySelect = document.getElementById("countrySelect");
  const regionSelect = document.getElementById("regionSelect");
  const languageSelect = document.getElementById("languageSelect");
  const notificationsSelect = document.getElementById("notificationsSelect");

  const termsModal = document.getElementById("termsModal");
  const termsBtn = document.getElementById("termsBtn");
  const closeTermsBtn = document.getElementById("closeTerms");

  const aboutBtn = document.getElementById("aboutBtn");
  const shareBtn = document.getElementById("shareBtn");
  const changeAccountBtn = document.getElementById("changeAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Productos con imágenes locales (nombres en minúsculas)
  let items = [
    { name: "Camisa azul", category: "Ropa", image: "camisa azul.png" },
    { name: "Libro: El Quijote", category: "Libros", image: "libro el quijote.png" },
    { name: "Muñeca de trapo", category: "Juguetes", image: "muñeca de trapo.png" },
    { name: "Auriculares inalámbricos", category: "Electrónica", image: "auriculares inalámbricos.png" },
    { name: "Bolso de cuero", category: "Accesorios", image: "bolso de cuero.png" },
    { name: "Reloj de pulsera", category: "Accesorios", image: "reloj de pulsera.png" },
    { name: "Mesa de comedor", category: "Muebles", image: "mesa de comedor.png" },
    { name: "Taza de cerámica", category: "Cocina", image: "taza de cerámica.png" },
    { name: "Zapatos deportivos", category: "Zapatos", image: "zapatos deportivos.png" }
  ];

  let cart = [];

  function renderCatalog(filter = "") {
    catalog.innerHTML = "";
    const filtered = items.filter(item => !filter || item.category === filter);
    if (filtered.length === 0) {
      catalog.innerHTML = '<p style="padding:1rem;">No hay artículos en esta categoría.</p>';
      return;
    }
    filtered.forEach(item => {
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy"/>
        <h4>${item.name}</h4>
        <p>${item.category}</p>
      `;
      el.addEventListener("click", () => {
        addToCart(item);
      });
      catalog.appendChild(el);
    });
  }

  function addToCart(item) {
    cart.push(item);
    alert(`"${item.name}" agregado al carrito.`);
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="50" height="40">
        <div>
          <h4>${item.name}</h4>
          <p>${item.category}</p>
        </div>
        <button data-index="${index}" class="btn-danger remove-from-cart">Eliminar</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function showModal(modal) {
    modal.style.display = "flex";
  }

  function hideModal(modal) {
    modal.style.display = "none";
  }

  function populateRegions(country) {
    const regionsByCountry = {
      "Guatemala": [
        "Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Petén",
        "El Progreso", "Escuintla", "Guatemala", "Huehuetenango", "Izabal",
        "Jalapa", "Jutiapa", "Quetzaltenango", "Quiché", "Retalhuleu", "Sacatepéquez",
        "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán",
        "Zacapa"
      ],
      "México": [
        "Aguascalientes","Baja California","Baja California Sur","Campeche",
        "Chiapas","Chihuahua","Ciudad de México","Coahuila", "Colima",
        "Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","México",
        "Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
        "Querétaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora",
        "Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatán","Zacatecas"
      ],
      "El Salvador": [
        "Ahuachapán", "Cuscatlán", "Chalatenango", "La Libertad",
        "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador",
        "San Vicente", "Santa Ana", "Sonsonate", "Usulután"
      ],
      "Honduras": [
        "Atlántida", "Choluteca", "Colón", "Comayagua", "Copán", "Cortés",
        "El Paraíso", "Francisco Morazán", "Gracias a Dios", "Intibucá",
        "Islas de la Bahía", "La Paz", "Lempira", "Ocotepeque", "Olancho",
        "Santa Bárbara", "Valle", "Yoro"
      ]
    };

    regionSelect.innerHTML = "";
    if (!country || !regionsByCountry[country]) {
      regionSelect.disabled = true;
      regionSelect.innerHTML = "<option>No hay regiones disponibles</option>";
      return;
    }
    regionSelect.disabled = false;
    regionsByCountry[country].forEach(r => {
      const option = document.createElement("option");
      option.value = r;
      option.textContent = r;
      regionSelect.appendChild(option);
    });
  }

  function updateLanguage(lang) {
    const translations = {
      es: {
        welcomePhrase: "Cambia lo que no usas, consigue lo que necesitas.",
        enterButton: "Entrar",
        appTitle: "Mano a Mano",
        appSubtitle: "Intercambia sin dinero",
        categories: [
          "Todas", "Ropa", "Libros", "Juguetes", "Electrónica", "Accesorios",
          "Decoración", "Muebles", "Zapatos", "Electrodomésticos", "Cocina", "Otros"
        ],
        termsAndPolicies: "Términos y Políticas de Mano a Mano",
        profile: "Perfil",
        publish: "Publicar",
        cart: "Carrito",
        home: "Inicio",
        categoriesNav: "Categorías",
      },
      en: {
        welcomePhrase: "Trade what you don't use, get what you need.",
        enterButton: "Enter",
        appTitle: "Hand to Hand",
        appSubtitle: "Trade without money",
        categories: [
          "All", "Clothes", "Books", "Toys", "Electronics", "Accessories",
          "Decoration", "Furniture", "Shoes", "Appliances", "Kitchen", "Others"
        ],
        termsAndPolicies: "Hand to Hand Terms and Policies",
        profile: "Profile",
        publish: "Post",
        cart: "Cart",
        home: "Home",
        categoriesNav: "Categories",
      }
    };

    const t = translations[lang];

    document.querySelector(".welcome-phrase").textContent = t.welcomePhrase;
    enterAppBtn.textContent = t.enterButton;
    document.querySelector(".app-title").textContent = t.appTitle;
    document.querySelector(".app-subtitle").textContent = t.appSubtitle;

    const categoryBtns = document.querySelectorAll(".cat-btn");
    categoryBtns.forEach((btn, i) => {
      btn.textContent = t.categories[i];
    });

    document.querySelector("[data-section='home'] span").textContent = t.home;
    document.querySelector("[data-section='add'] span").textContent = t.publish;
    document.querySelector("[data-section='cart'] span").textContent = t.cart;
    document.querySelector("[data-section='categories'] span").textContent = t.categoriesNav;
    document.querySelector("#profileBtn span").textContent = t.profile;

    document.querySelector("#termsModal h2").textContent = t.termsAndPolicies;
  }

  // EVENTOS

  ageConfirmBtn.addEventListener("click", () => {
    const age = parseInt(ageInput.value, 10);
    if (!isNaN(age) && age >= 15) {
      hideModal(ageModal);
      welcomeScreen.style.display = "flex";
    } else {
      alert("Debes tener al menos 15 años para usar la aplicación.");
    }
  });

  ageCancelBtn.addEventListener("click", () => {
    alert("No puedes usar la app si no cumples la edad mínima.");
    window.location.reload();
  });

  enterAppBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    mainApp.style.display = "flex";
    renderCatalog();
  });

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const section = btn.dataset.section;
      [settingsModal, addModal, cartModal, profileModal, termsModal].forEach(m => hideModal(m));
      if (section === "home") renderCatalog();
      if (section === "categories") document.querySelector(".categories").scrollIntoView({behavior:"smooth"});
      if (section === "add") showModal(addModal);
      if (section === "cart") {
        showModal(cartModal);
        renderCart();
      }
      if (section === "profile") showModal(profileModal);
    });
  });

  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if(modal) hideModal(modal);
    });
  });

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.cat);
    });
  });

  addForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value;
    const fileInput = document.getElementById("itemImage");
    if (!name || !category || fileInput.files.length === 0) {
      alert("Completa todos los campos para publicar un objeto.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      items.push({ name, category, image: reader.result });
      renderCatalog(category);
      hideModal(addModal);
      addForm.reset();
      alert("Objeto publicado correctamente.");
    };
    reader.readAsDataURL(fileInput.files[0]);
  });

  profilePhotoInput.addEventListener("change", () => {
    const file = profilePhotoInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      profilePhotoPreview.src = e.target.result;
      profilePhotoPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  cartItemsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("remove-from-cart")) {
      const index = parseInt(e.target.dataset.index, 10);
      if (!isNaN(index)) {
        cart.splice(index, 1);
        renderCart();
      }
    }
  });

  countrySelect.addEventListener("change", () => {
    populateRegions(countrySelect.value);
  });

  ["es", "en"].forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = code === "es" ? "Español" : "English";
    languageSelect.appendChild(opt);
  });

  languageSelect.value = "es";
  updateLanguage(languageSelect.value);
  languageSelect.addEventListener("change", () => {
    updateLanguage(languageSelect.value);
  });

  settingsBtn.addEventListener("click", () => {
    showModal(settingsModal);
  });

  closeSettings.addEventListener("click", () => {
    hideModal(settingsModal);
  });

  termsBtn.addEventListener("click", () => {
    showModal(termsModal);
  });

  closeTermsBtn.addEventListener("click", () => {
    hideModal(termsModal);
  });

  aboutBtn.addEventListener("click", () => {
    alert("Mano a Mano v1.0 - App de intercambio sin dinero.");
  });

  shareBtn.addEventListener("click", () => {
    alert("¡Comparte Mano a Mano con tus amigos!");
  });

  changeAccountBtn.addEventListener("click", () => {
    const confirmed = confirm("¿Seguro que quieres cambiar de cuenta? Se cerrará la sesión actual.");
    if(confirmed) {
      mainApp.style.display = "none";
      welcomeScreen.style.display = "flex";
      alert("Has cerrado sesión. Por favor, ingresa con otra cuenta.");
    }
  });

  logoutBtn.addEventListener("click", () => {
    const confirmed = confirm("¿Seguro que quieres cerrar sesión?");
    if(confirmed) {
      mainApp.style.display = "none";
      welcomeScreen.style.display = "flex";
      alert("Sesión cerrada.");
    }
  });

});

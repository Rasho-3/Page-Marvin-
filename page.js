document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterAppBtn = document.getElementById("enterAppBtn");
  const mainApp = document.getElementById("mainApp");

  // Modal de edad
  const ageModal = document.getElementById("ageModal");
  const ageInput = document.getElementById("ageInput");
  const ageConfirmBtn = document.getElementById("ageConfirmBtn");
  const ageCancelBtn = document.getElementById("ageCancelBtn");

  // Configuración
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettings = document.getElementById("closeSettings");

  const addModal = document.getElementById("addModal");
  const closeAdd = document.getElementById("closeAdd");

  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");

  const profileModal = document.getElementById("profileModal");
  const closeProfile = document.getElementById("closeProfile");

  const navButtons = document.querySelectorAll(".nav-btn");
  const categoryButtons = document.querySelectorAll(".cat-btn");

  const catalog = document.getElementById("catalog");

  // Perfil
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const profilePhotoPreview = document.getElementById("profilePhotoPreview");

  // Configuración
  const countrySelect = document.getElementById("countrySelect");
  const regionSelect = document.getElementById("regionSelect");
  const languageSelect = document.getElementById("languageSelect");
  const notificationsSelect = document.getElementById("notificationsSelect");

  // Botones acción
  const termsBtn = document.getElementById("termsBtn");
  const aboutBtn = document.getElementById("aboutBtn");
  const shareBtn = document.getElementById("shareBtn");
  const changeAccountBtn = document.getElementById("changeAccountBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Traducciones
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

  function updateLanguage(lang) {
    const t = translations[lang];

    document.querySelector(".welcome-phrase").textContent = t.welcomePhrase;
    enterAppBtn.textContent = t.enterButton;
    document.querySelector(".app-title").textContent = t.appTitle;
    document.querySelector(".app-subtitle").textContent = t.appSubtitle;

    // categorías
    const categoryBtns = document.querySelectorAll(".cat-btn");
    categoryBtns.forEach((btn, i) => {
      btn.textContent = t.categories[i];
    });

    // navegación inferior
    document.querySelector("[data-section='home'] span").textContent = t.home;
    document.querySelector("[data-section='add'] span").textContent = t.publish;
    document.querySelector("[data-section='cart'] span").textContent = t.cart;
    document.querySelector("[data-section='categories'] span").textContent = t.categoriesNav;
    document.querySelector("#profileBtn span").textContent = t.profile;

    // términos
    document.querySelector("#termsModal h2").textContent = t.termsAndPolicies;
  }

  // añadir opciones al select de idioma
  ["es", "en"].forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = code === "es" ? "Español" : "English";
    languageSelect.appendChild(opt);
  });

  // cambiar idioma al seleccionar
  languageSelect.addEventListener("change", () => {
    updateLanguage(languageSelect.value);
  });

  // Actualizar idioma al cargar por defecto (español, si no seleccionado)
  languageSelect.value = "es";
  updateLanguage(languageSelect.value);

  // ----------- VERIFICACIÓN DE EDAD -------------
  ageConfirmBtn.addEventListener("click", () => {
    const edad = parseInt(ageInput.value, 10);
    if (!isNaN(edad) && edad >= 15) {
      ageModal.style.display = "none";
      welcomeScreen.style.display = "flex";
    } else {
      alert("Debes tener al menos 15 años para usar la aplicación.");
    }
  });

  ageCancelBtn.addEventListener("click", () => {
    alert("No puedes usar la app si no cumples la edad mínima.");
    window.location.reload();
  });

  // ----------- CATÁLOGO -------------

  // Ejemplo de items para mostrar en catálogo
  const items = [
    { name: "Camisa azul", category: "Ropa", image: "https://via.placeholder.com/150?text=Camisa+azul" },
    { name: "Libro: El Quijote", category: "Libros", image: "https://via.placeholder.com/150?text=El+Quijote" },
    { name: "Muñeca", category: "Juguetes", image: "https://via.placeholder.com/150?text=Muñeca" },
    { name: "Auriculares", category: "Electrónica", image: "https://via.placeholder.com/150?text=Auriculares" },
  ];

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
        <img src="${item.image}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.category}</p>
      `;
      catalog.appendChild(el);
    });
  }

  // ----------- PANTALLA PRINCIPAL -------------

  enterAppBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    mainApp.style.display = "flex";
    renderCatalog();
  });

  // ----------- MODALES -------------

  settingsBtn.addEventListener("click", () => {
    settingsModal.style.display = "flex";
  });
  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
  });

  document.querySelector("[data-section='add']").addEventListener("click", () => {
    addModal.style.display = "flex";
  });
  closeAdd.addEventListener("click", () => {
    addModal.style.display = "none";
  });

  document.querySelector("[data-section='cart']").addEventListener("click", () => {
    cartModal.style.display = "flex";
  });
  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  document.getElementById("profileBtn").addEventListener("click", () => {
    profileModal.style.display = "flex";
  });
  closeProfile.addEventListener("click", () => {
    profileModal.style.display = "none";
  });

  // Navegación inferior
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const section = btn.dataset.section;

      // Ocultar todos los modales
      [settingsModal, addModal, cartModal, profileModal].forEach(m => m.style.display = "none");

      if (section === "home") {
        renderCatalog();
      }
      if (section === "categories") {
        document.querySelector(".categories").scrollIntoView({ behavior: "smooth" });
      }
      if (section === "profile") {
        profileModal.style.display = "flex";
      }
      if (section === "add") {
        addModal.style.display = "flex";
      }
      if (section === "cart") {
        cartModal.style.display = "flex";
      }
    });
  });

  // Filtro categorías
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.cat);
    });
  });

  // Preview foto perfil
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

  // Regiones según país
  const regionsByCountry = {
    "Guatemala": [
      "Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Petén",
      "El Progreso", "Escuintla", "Guatemala", "Huehuetenango", "Izabal",
      "Jalapa", "Jutiapa", "Quetzaltenango", "Quiché", "Retalhuleu", "Sacatepéquez",
      "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán",
      "Zacapa"
    ],
    "México": [],
    "El Salvador": [],
    "Honduras": []
  };

  function populateRegions(country) {
    regionSelect.innerHTML = "";
    if (!country || !regionsByCountry[country] || regionsByCountry[country].length === 0) {
      regionSelect.disabled = true;
      regionSelect.innerHTML = '<option>No hay regiones disponibles</option>';
      return;
    }
    regionSelect.disabled = false;
    regionsByCountry[country].forEach(r => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      regionSelect.appendChild(opt);
    });
  }

  countrySelect.addEventListener("change", () => {
    populateRegions(countrySelect.value);
  });

  // Botones acción
  termsBtn.addEventListener("click", () => {
    alert("Aquí irían los términos y políticas.");
  });
  aboutBtn.addEventListener("click", () => {
    alert("Mano a Mano v1.0 - App de intercambio sin dinero.");
  });
  shareBtn.addEventListener("click", () => {
    alert("¡Comparte Mano a Mano con tus amigos!");
  });
  changeAccountBtn.addEventListener("click", () => {
    const confirmed = confirm('¿Seguro que quieres cambiar de cuenta? Se cerrará la sesión actual.');
    if (confirmed) {
      mainApp.style.display = "none";
      welcomeScreen.style.display = "flex";
      alert('Has cerrado sesión. Por favor ingresa con otra cuenta.');
    }
  });
  logoutBtn.addEventListener("click", () => {
    const confirmed = confirm('¿Seguro que quieres cerrar sesión?');
    if (confirmed) {
      mainApp.style.display = "none";
      welcomeScreen.style.display = "flex";
      alert('Sesión cerrada.');
    }
  });
});

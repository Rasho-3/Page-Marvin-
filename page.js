document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const welcomeScreen = document.getElementById("welcomeScreen");
  const enterAppBtn = document.getElementById("enterAppBtn");
  const mainApp = document.getElementById("mainApp");

  const ageModal = document.getElementById("ageModal");
  const ageInput = document.getElementById("ageInput");
  const ageConfirmBtn = document.getElementById("ageConfirmBtn");
  const ageCancelBtn = document.getElementById("ageCancelBtn");

  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettings = document.getElementById("closeSettings");

  const navButtons = document.querySelectorAll(".nav-btn");
  const categoryButtons = document.querySelectorAll(".cat-btn");

  const catalog = document.getElementById("catalog");

  // Traducciones (simplificado aquí)
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
      home: "Inicio",
      publish: "Publicar",
      cart: "Carrito",
      categoriesNav: "Categorías",
      profile: "Perfil"
    }
  };

  // Arreglo productos con imágenes PNG reales y específicas
  const items = [
    {
      name: "Camisa azul",
      category: "Ropa",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Flat_blue_t-shirt.png"
    },
    {
      name: "Libro: El Quijote",
      category: "Libros",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Don_Quixote_cover_1912.png"
    },
    {
      name: "Muñeca de trapo",
      category: "Juguetes",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Doll_clipart.png"
    },
    {
      name: "Auriculares inalámbricos",
      category: "Electrónica",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Headphones_icon_vector.svg" // SVG con fondo blanco, pero URL PNG no existe; puede usar SVG o convertir a PNG si quieres
    },
    {
      name: "Bolso de cuero",
      category: "Accesorios",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Bag_icon.png"
    },
    {
      name: "Reloj de pulsera",
      category: "Accesorios",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Watch_icon.png"
    },
    {
      name: "Mesa de comedor",
      category: "Muebles",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/13/Table_icon.png"
    },
    {
      name: "Taza de cerámica",
      category: "Cocina",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Cup_icon.png"
    },
    {
      name: "Zapatos deportivos",
      category: "Zapatos",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Shoe_icon.png"
    }
  ];

  function renderCatalog(filter = "") {
    catalog.innerHTML = "";
    const filtered = items.filter(item => !filter || item.category === filter);
    if (filtered.length === 0) {
      catalog.innerHTML = `<p style="padding:1rem;">No hay artículos en esta categoría.</p>`;
      return;
    }
    filtered.forEach(item => {
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <h4>${item.name}</h4>
        <p>${item.category}</p>
      `;
      catalog.appendChild(el);
    });
  }

  enterAppBtn.addEventListener("click", () => {
    ageModal.style.display = "none";
    welcomeScreen.style.display = "none";
    mainApp.style.display = "flex";
    renderCatalog();
  });

  ageConfirmBtn.addEventListener("click", () => {
    const age = parseInt(ageInput.value, 10);
    if (!isNaN(age) && age >= 15) {
      ageModal.style.display = "none";
      welcomeScreen.style.display = "flex";
    } else {
      alert("Debes tener al menos 15 años para usar la aplicación.");
    }
  });

  ageCancelBtn.addEventListener("click", () => {
    alert("No puedes usar la app sin la edad mínima.");
    window.location.reload();
  });

  // Filtrar por categoría
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.cat);
    });
  });

  // Navegación inferior (funciones mínimas)
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      // Simplificado para demo, implementar según necesidad
      if (btn.dataset.section === "home") renderCatalog();
    });
  });

});

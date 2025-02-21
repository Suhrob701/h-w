const productContainer = document.getElementById("container-cards");
const formInput = document.getElementById("search");
const btn = document.getElementById("daynight");
const regionSelect = document.getElementById("regionSelect");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

let post = [];

async function fetchAPI() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        post = await res.json();
        generator(post);
    } catch (error) {
        console.log("Xatolik", error);
    }
}

function generator(product) {
    productContainer.innerHTML = '';

    product.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        card.addEventListener("click", () => showDetails(country));

        productContainer.appendChild(card);
    });
}

function showDetails(country) {
    modalContent.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Poytaxt:</strong> ${country.capital ? country.capital[0] : "Noma'lum"}</p>
        <p><strong>Hudud:</strong> ${country.region}</p>
        <p><strong>Aholisi:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Tillari:</strong> ${country.languages ? Object.values(country.languages) : "Noma'lum"}</p> 
    `;
    modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", fetchAPI);

formInput.addEventListener("input", search);

function search() {
    const searchValue = formInput.value.trim().toLowerCase();

    if (searchValue === '') {
        generator(post);
        return;
    }

    const filtered = post.filter(country => 
        country.name.common.toLowerCase().includes(searchValue)
    );

    if (filtered.length > 0) {
        generator(filtered);
    } else {
        productContainer.innerHTML = '<p style="color: red;">Hech narsa topilmadi</p>';
    }
}

btn.addEventListener("click", () => {
    if (document.body.classList.toggle("dark-mode")) {
        btn.textContent = '☀️';
    } else {
        btn.textContent = '🌙';
    }
});

regionSelect.addEventListener('change', () => {
    const selectedRegion = regionSelect.value;
    if (selectedRegion === 'all') {
        generator(post);
    } else {
        const filteredCountries = post.filter(country => country.region === selectedRegion);
        generator(filteredCountries);
    }
});

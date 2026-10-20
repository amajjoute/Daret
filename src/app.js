// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

// US-01
const form = document.querySelector("#daret-form");

const nomCercle = document.querySelector("#nom-cercle");
const msgErrNomCercle = document.querySelector("#nom-cercle-erreur");

const cotisation = document.querySelector("#cotisation");
const msgErrCotisation = document.querySelector("#cotisation-erreur");

const periodicite = document.querySelector("#periodicite");
const msgErrperiodicite = document.querySelector("#periodicite-erreur");

const dateDebut = document.querySelector("#date-debut");
const msgErrDateDebut = document.querySelector("#date-debut-erreur");

const regex = /^[\p{L}\p{M}0-9 -]{3,40}$/u;

function showError(input, errElement, msg) {
    input.setAttribute("aria-invalid", "true");

    errElement.textContent = msg;
    errElement.classList.remove("hidden");
}

function hideError(input, errElement) {
    input.setAttribute("aria-invalid", "false");

    errElement.textContent = "";
    errElement.classList.add("hidden");
}

function validateNameCercle() {
    const name = nomCercle.value.trim();

    if (!regex.test(name)) {
        showError(nomCercle, msgErrNomCercle, "Le nom doit contenir entre 3 et 40 caractères autorisés.");
        return false;
    }

    hideError(nomCercle, msgErrNomCercle);
    return true;
}

nomCercle.addEventListener("input", validateNameCercle);
cotisation.addEventListener("input", validateCotisation)

form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateNameCercle();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    validateNameCercle();
    validateCotisation();
});

function validateCotisation() {
    const amount = Number(cotisation.value);

    if (cotisation.value.trim() === "" || !Number.isInteger(amount) || amount < 100 || amount > 50000) {
        showError(cotisation, msgErrCotisation, "La cotisation doit etre un entier entre 100 et 50 000 MAD.");
        return false;
    }

    hideError(cotisation, msgErrCotisation);
    return true;
}
//-----------------------------------------------------------
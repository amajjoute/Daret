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

function validateCotisation() {
    const amount = Number(cotisation.value);

    if (cotisation.value.trim() === "" || !Number.isInteger(amount) || amount < 100 || amount > 50000) {
        showError(cotisation, msgErrCotisation, "La cotisation doit etre un entier entre 100 et 50 000 MAD.");
        return false;
    }

    hideError(cotisation, msgErrCotisation);
    return true;
}
cotisation.addEventListener("input", validateCotisation)

function validateDateDebut() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(dateDebut.value + "T00:00:00");

    if (!dateDebut.value || selectedDate < today) {
        showError(dateDebut, msgErrDateDebut, "La date de début doit être aujourd'hui ou une date ultérieure.");
        return false;
    }

    hideError(dateDebut, msgErrDateDebut);
    return true;
}
dateDebut.addEventListener("change", validateDateDebut);

function validateDuplicateNames(names) {
    const normalizedNames = names.map(name => name.trim().toLowerCase());

    for (let i = 0; i < normalizedNames.length; i++) {
        for (let j = i + 1; j < normalizedNames.length; j++) {
            if (normalizedNames[i] === normalizedNames[j]) {
                return false;
            }
        }
    }
    return true;
}


//US-20
const participantsList = document.querySelector("#participants-liste");
const participantsCount = document.querySelector("#participants-compteur");
const participantsErrMsg = document.querySelector("#participants-erreur");
const participantsAdd = document.querySelector("#ajouter-participant");

function createParticipants() {
    const participants = document.createElement("li");

    const label = document.createElement("label");
    label.textContent = "Nom du participant";

    const div = document.createElement("div");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "participants[]";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Retirer";

    div.append(input, button);
    participants.append(label, div);
    participantsList.append(participants);
}

function updateParticipants() {
    const participants = participantsList.querySelectorAll("li");
    const count = participants.length;

    participantsCount.textContent = `${count} participants`;

    participants.forEach((participant) => {
        const button = participant.querySelector("button");
        button.disabled = count <= 2;
    });
}

function deleteParticipants(participant) {
    const participants = participantsList.querySelectorAll("li");
    
    if (participants.length <= 2) {
        return;
    }

    participant.remove();
    updateParticipants();
}



//-----------------------------------------------------------

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameValid = validateNameCercle();
    const amountValid = validateCotisation();
    const dateValid = validateDateDebut();

    if (!nameValid) {
        nomCercle.focus();
    } else if (!amountValid) {
        cotisation.focus();
    } else if (!dateValid) {
        dateDebut.focus();
    }

    if (!nameValid || !amountValid || !dateValid) {
        return;
    }
});
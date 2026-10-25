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

//US-02
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
        button.hidden = count <= 2;
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

createParticipants();
createParticipants();
createParticipants();
updateParticipants();

participantsAdd.addEventListener("click", function () {
    const participants = participantsList.querySelectorAll("li");

    if (participants.length >= 20) {
        participantsErrMsg.textContent = "Maximum 20 participants.";
        return;
    }

    createParticipants();
    updateParticipants();

});

participantsList.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        const participant = event.target.closest("li");
        deleteParticipants(participant);
    }
});

//US-03
function amountReceived(cotisation, nbParticipants) {
    return (cotisation * nbParticipants);
}

function totalPaid(cotisation, nbParticipants) {
    return (cotisation * nbParticipants);
}

function toursNumber(nbParticipants) {
    return (nbParticipants);
}

function dateBegginEnd(date, nbParticipants, periodicite) {
    const startDate = new Date(date);
    const endDate = new Date(startDate);

    const intervals = nbParticipants - 1;

    if (periodicite === "Hebdomadaire") {
        endDate.setDate(endDate.getDate() + 7 * intervals);
    } else if (periodicite === "Tous les 15 jours") {
        endDate.setDate(endDate.getDate() + 15 * intervals);
    } else if (periodicite === "Mensuelle") {
        endDate.setMonth(endDate.getMonth() + intervals);
    //     const originalDay = endDate.getDate();

    //     endDate.setDate(1);
    //     endDate.getMonth(endDate.getMonth() + intervals);

    //     const lastDayOfMonth = new date(
    //         endDate.getFullYear(),
    //         endDate.getMonth() + 1,
    //         0
    //     ).getDate();

    //     endDate.setDate(Math.min(originalDay, lastDayOfMonth));
    }

    return [startDate, endDate];
}

const resumeCagnotte = document.querySelector("#resume-cagnotte");
const resumeTotalCycle = document.querySelector("#resume-total-cycle");
const resumeNbTours = document.querySelector("#resume-nb-tours");
const resumeDates = document.querySelector("#resume-dates");

const etatVide = document.querySelector("#etat-vide");
const contenuResultat = document.querySelector("#contenu-resultat");

//US-04
function getParticipantsList() {
    return participantsList.querySelectorAll("li");
}

function getTourDate(startDate, tourIndex, periodicite) {
    const date = new Date(startDate);
    
    if (periodicite === "Hebdomadaire") {
        date.setDate(date.getDate() + tourIndex * 7)
    } else if (periodicite === "Tous les 15 jours") {
        date.setDate(date.getDate() + tourIndex * 15)
    } else if (periodicite === "Mensuelle") {
        date.setMonth(date.getMonth() + tourIndex)
    }

    return date;
}


function generateCalendar(participants = [...getParticipantsList()]) {
    const calendendarBody = document.querySelector("#calendrier-corps");

    calendendarBody.innerHTML = "";

    for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = i + 1;

        const td2 = document.createElement("td");
        td2.textContent = getTourDate(
            dateDebut.value,
            i,
            periodicite.value
        ).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const td3 = document.createElement("td");
        td3.textContent = participant.querySelector("input").value;

        const td4 = document.createElement("td");
        td4.textContent = amountReceived(
            Number(cotisation.value),
            participants.length
        );

        const td5 = document.createElement("td");
        td5.textContent = "À venir";

        tr.append(td1, td2, td3, td4, td5);
        calendendarBody.append(tr);
    }

    return calendendarBody;
}

 // US-05
const tirageAuSortButton = document.querySelector("#tirage-au-sort");
const ordreSaisieButton = document.querySelector("#ordre-saisie");

let originalList = [];
let partList = [];

function shuffleArray(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}

tirageAuSortButton.addEventListener("click", function () {
    originalList = [...getParticipantsList()];
    partList = shuffleArray([...originalList]);
    generateCalendar(partList);
});

ordreSaisieButton.addEventListener("click", function () {
    generateCalendar();
});

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

    const nbParticipants = participantsList.querySelectorAll("li").length;

    const cotisationValue = Number(cotisation.value);

    const montant = amountReceived(
        cotisationValue,
        nbParticipants
    );

    const total = totalPaid(
        cotisationValue,
        nbParticipants
    );

    const tours = toursNumber(nbParticipants);

    const [startDate, endDate] = dateBegginEnd(
        dateDebut.value,
        nbParticipants,
        periodicite.value
    );

    resumeCagnotte.textContent = `${montant} DH`;
    resumeTotalCycle.textContent = `${total} DH`;
    resumeNbTours.textContent = tours;

    resumeDates.textContent = `${startDate.toLocaleDateString("fr-FR")} · ` + `${endDate.toLocaleDateString("fr-FR")}`;

    contenuResultat.classList.remove("hidden");
    etatVide.classList.add("hidden");

    generateCalendar();
});
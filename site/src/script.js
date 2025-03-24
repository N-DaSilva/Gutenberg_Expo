document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelectorAll('.close');
    const nav = document.querySelector('.nav-links');

    toggle.forEach((btn) => {
        btn.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
        })
    });

    document.querySelectorAll('.expo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentpage = parseInt(btn.dataset.current);
            document.getElementById(`expo-${currentpage}`).classList.toggle('hide');
            if (btn.classList.contains('next')) {
                document.getElementById(`expo-${currentpage + 1}`).classList.toggle('hide');
            } else if (btn.classList.contains('prev')) {
                document.getElementById(`expo-${currentpage - 1}`).classList.toggle('hide');
            } else if (btn.classList.contains('skip')) {
                document.getElementById(`expo-${btn.dataset.goto}`).classList.toggle('hide');
            }
        });
    })

    document.querySelectorAll('.form-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentpage = parseInt(btn.dataset.current);
            document.getElementById(`etape-${currentpage}`).classList.toggle('hide');
            if (btn.classList.contains('next')) {
                document.getElementById(`etape-${currentpage + 1}`).classList.toggle('hide');
            } else if (btn.classList.contains('prev')) {
                document.getElementById(`etape-${currentpage - 1}`).classList.toggle('hide');
            }
        });
    })

    let commande = { 'tarif-1': 0, 'tarif-2': 0, 'tarif-3': 0, 'tarif-4': 0 };

    document.querySelectorAll('.ticket-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ticketId = btn.parentElement.id.split('-')[1];
            const ticketAmountField = document.getElementById(`ticket-nbr-${ticketId}`);
            let ticketAmount = ticketAmountField.innerText == '---' ? 0 : parseInt(ticketAmountField.innerText);

            if (btn.classList.contains('moins')) {
                ticketAmount = ticketAmount > 0 ? ticketAmount - 1 : 0;
                commande[`tarif-${ticketId}`] = commande[`tarif-${ticketId}`] > 0 ? commande[`tarif-${ticketId}`] - 1 : 0;

                btn.parentElement.querySelector('.added-tickets').removeChild(document.getElementById(`added-ticket-${ticketId}-${ticketAmount + 1}`));

            } else if (btn.classList.contains('plus')) {
                ticketAmount += 1;
                commande[`tarif-${ticketId}`] += 1;

                const addedTicket = document.createElement('div');
                addedTicket.classList.add('added-ticket');
                addedTicket.id = `added-ticket-${ticketId}-${ticketAmount}`;
                addedTicket.innerHTML = `
                <div class='form-group'>
                    <label for='nom-${ticketId}-${ticketAmount}'>Nom</label>
                    <input type='text' name='nom-${ticketId}-${ticketAmount}' id='nom-${ticketId}-${ticketAmount}'>
                </div>
                <div class='form-group'>
                    <label for='prenom-${ticketId}-${ticketAmount}'>Prénom</label>
                    <input type='text' name='prenom-${ticketId}-${ticketAmount}' id='prenom-${ticketId}-${ticketAmount}'>
                </div>
                `;

                btn.parentElement.querySelector('.added-tickets').appendChild(addedTicket);
            }
            updateSelection(commande);
            ticketAmountField.innerText = ticketAmount == 0 ? '---' : ticketAmount;
        })
    });

    const updateSelection = (commande) => {
        const selectionList = document.getElementById('ticket-selection');
        selectionList.innerHTML = '';
        const totalField = document.getElementById('total-selection');
        totalField.innerText = `${commande['tarif-1'] * 5 + commande['tarif-2'] * 10 + commande['tarif-3'] * 12 + commande['tarif-4'] * 10}€`;

        if (commande['tarif-1'] > 0) {
            selectionList.innerHTML += `<li>Tarif Enfants (-12 ans) x${commande['tarif-1']}</li>`;
        }

        if (commande['tarif-2'] > 0) {
            selectionList.innerHTML += `<li>Tarif Jeunes (-26 ans) x${commande['tarif-2']}</li>`;
        }

        if (commande['tarif-3'] > 0) {
            selectionList.innerHTML += `<li>Plein tarif x${commande['tarif-3']}</li>`;
        }

        if (commande['tarif-4'] > 0) {
            selectionList.innerHTML += `<li>Tarif Seniors x${commande['tarif-4']}</li>`;
        }
    }

    const updateRecap = () => {
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const heure = document.querySelector('input[name="heure"]:checked').value;

        const nomSummary = document.getElementById('nom-summary');
        const prenomSummary = document.getElementById('prenom-summary');
        const emailSummary = document.getElementById('email-summary');
        const dateSummary = document.getElementById('date-summary');
        const horaireSummary = document.getElementById('horaire-summary');
        const ticketsSummary = document.getElementById('tickets-summary');
        const totalSummary = document.getElementById('total-summary');

        nomSummary.innerText = nom;
        prenomSummary.innerText = prenom;
        emailSummary.innerText = email;
        dateSummary.innerText = date;
        horaireSummary.innerText = heure;
        ticketsSummary.innerHTML = document.getElementById('ticket-selection').innerHTML;
        totalSummary.innerText = document.getElementById('total-selection').innerText;
    }

    document.getElementById('to-recap').addEventListener('click', updateRecap);

    document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (i = 1; i <= 4; i++) {
            for (j = 1; j <= commande[`tarif-${i}`]; j++) {
                formData.append('nom[]', document.getElementById(`nom-${i}-${j}`).value);
                formData.append('prenom[]', document.getElementById(`prenom-${i}-${j}`).value);
                formData.append('tarif[]', i);
            }
        }

        formData.append('date', document.getElementById('date').value);
        formData.append('heure', document.querySelector('input[name="heure"]:checked').value);
        formData.append('email', document.getElementById('email').value);

        fetch('https://rgbagency.fr/api-reservation/api.php', {
            method: 'POST',
            body: formData
        })
    });
});
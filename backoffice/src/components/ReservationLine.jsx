export const ReservationLine = ({ reservation }) => {
    const date = new Date(reservation.dateheure);

    const formattedDate = `
    Le ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} 
    à ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;

    const deleteReservation = (id) => {
        fetch('https://rgbagency.fr/api-reservation/api.php?id='+id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                window.location.reload();})
            .catch((error) => console.error(error));
    }


    return (
        <div className="wrapper-row">
            <p>{formattedDate} - {reservation.prenom} {reservation.nom} - {reservation.email} - {reservation.tarif}</p>
            <button onClick={() => deleteReservation(reservation.resa_id)}>
                🗑️
            </button>
        </div>
    )
}
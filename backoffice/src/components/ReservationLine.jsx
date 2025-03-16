export const ReservationLine = ({ reservation }) => {
    const date = new Date(reservation.dateheure);

    const formattedDate = `
    Le ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear()} 
    à ${date.getHours().toString().padStart(2, '0')}h${date.getMinutes().toString().padStart(2, '0')}`;


    return (
        <div>
            <p>{formattedDate} - {reservation.prenom} {reservation.nom} - {reservation.email} - {reservation.tarif}</p>
        </div>
    )
}
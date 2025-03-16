export const ReservationLine = ({ reservation }) => {
    return (
        <div>
            <p>{reservation.dateheure} - {reservation.prenom} {reservation.prenom} - {reservation.email} - {reservation.tarif}</p>
        </div>
    )
}
import { ReservationLine } from './ReservationLine';

export const ReservationList = ({ reservations }) => {
    return (
        <details>
            <summary><h2>Liste des réservations {'>'}</h2></summary>
            { reservations.map((reservation) => {
                return < ReservationLine key={reservation.resa_id} reservation={reservation} />
            }) }
        </details>
    )
}
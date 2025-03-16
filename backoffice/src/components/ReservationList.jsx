import { ReservationLine } from './ReservationLine';

export const ReservationList = ({ reservations }) => {
    return (
        <details>
            <summary><h1>Reservation List</h1></summary>
            { reservations.map((reservation) => {
                return < ReservationLine key={reservation.resa_id} reservation={reservation} />
            }) }
        </details>
    )
}
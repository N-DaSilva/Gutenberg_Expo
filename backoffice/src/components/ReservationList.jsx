import { ReservationLine } from './ReservationLine';

export const ReservationList = ({ reservations }) => {
    return (
        <details>
            <summary>Reservation List</summary>
            { reservations.map((reservation) => {
                return < ReservationLine key={reservation.resa_id} reservation={reservation} />
            }) }
        </details>
    )
}
export const MainInfo = ({ reservations }) => {
    return (
        <div>
            <h1>Main Info</h1>
            <p>{reservations.length} réservations au total</p>
        </div>
    )
}
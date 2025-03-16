export const MainInfo = ({ reservations }) => {
    return (
        <div>
            <h2>Informations globales</h2>
            <div>
                <h3>Nombre total de réservations</h3>
                <p className="number">{reservations.length}</p>
            </div>
            <div>
                <div>
                    <h3>Cette semaine</h3>
                    <p className="number">{reservations.length}</p>
                </div>
                <div>
                    <h3>Aujourd'hui</h3>
                    <p className="number">{reservations.length}</p>
                </div>
            </div>
        </div>
    )
}
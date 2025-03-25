export const MainInfo = ({ reservations }) => {
    const today = new Date();
    const weekStart = new Date();
    const weekEnd = new Date();

    weekStart.setDate(today.getDate() - today.getDay() +1);
    weekEnd.setDate(weekStart.getDate()+6);
    
    return (
        <div className="main-info">
            <h2>Informations globales</h2>
            <div className="wrapper-column">
                <div>
                    <h3>Nombre total de réservations</h3>
                    <p className="number">{reservations.length}</p>
                </div>
                <div className="wrapper-row">
                    <div>
                        <h3>Visiteurs cette semaine</h3>
                        <p className="number">{reservations.filter((reservation) => {
                            const reservationDate = new Date(reservation.dateheure);
                            return reservationDate >= weekStart && reservationDate <= weekEnd;
                        }).length}</p>
                    </div>
                    <div>
                        <h3>Visiteurs aujourd'hui</h3>
                        <p className="number">{reservations.filter((reservation) => new Date(reservation.dateheure).getDate() == today.getDate()).length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
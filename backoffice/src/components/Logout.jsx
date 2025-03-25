export const LogoutButton = () => {
    const handleLogout = () => {
        fetch('https://rgbagency.fr/backoffice/logout.php', {
            method: 'POST',
            credentials: 'include',
          }).then(() => window.location.href = 'https://rgbagency.fr/backoffice/connect.php')
            .catch((error) => console.error('Logout failed:', error))
    }

    return (
        <button onClick={handleLogout}>
            Se déconnecter
        </button>
    )
}
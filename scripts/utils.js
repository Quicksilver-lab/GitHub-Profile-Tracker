function validateUsername(username) {
    if (!username) {
        displayErrorMessage('Username cannot be empty. Please enter a GitHub username.');
        return false;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
        displayErrorMessage('Invalid username format. Please enter a valid GitHub username.');
        return false;
    }
    document.getElementById('error-message').style.display = 'none';
    return true;
}

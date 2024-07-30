document.getElementById('username-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('github-username').value.trim();
    if (validateUsername(username)) {
        fetchGitHubData(username);
    }
});

function fetchGitHubData(username) {
    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    fetch(userUrl)
        .then(response => response.json())
        .then(userData => {
            if (userData.message) {
                displayErrorMessage('User not found. Please enter a valid GitHub username.');
                return;
            }
            displayProfileInfo(userData);
            fetchReposData(reposUrl);
        })
        .catch(error => {
            displayErrorMessage('An error occurred while fetching data. Please try again later.');
            console.error('Error fetching user data:', error);
        });
}

function fetchReposData(reposUrl) {
    fetch(reposUrl)
        .then(response => response.json())
        .then(reposData => {
            if (reposData.message) {
                displayErrorMessage('Could not fetch repositories. Please try again later.');
                return;
            }
            const repoNames = reposData.map(repo => repo.name);
            const stars = reposData.map(repo => repo.stargazers_count);
            const forks = reposData.map(repo => repo.forks_count);
            const commitPromises = repoNames.map(repoName => {
                return fetch(`https://api.github.com/repos/${username}/${repoName}/commits`)
                    .then(response => response.json());
            });

            Promise.all(commitPromises).then(commitData => {
                const commitCounts = commitData.map(commits => commits.length);
                displayCharts(repoNames, commitCounts, stars, forks);
                populateTable(repoNames, stars, forks);
            });
        })
        .catch(error => {
            displayErrorMessage('An error occurred while fetching repository data. Please try again later.');
            console.error('Error fetching repository data:', error);
        });
}

function displayProfileInfo(userData) {
    document.getElementById('profile-info').innerHTML = `
        <h2>${userData.login}</h2>
        <p>Public Repositories: ${userData.public_repos}</p>
        <p>Followers: ${userData.followers}</p>
    `;
    document.getElementById('error-message').style.display = 'none';
}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message;
    errorMessageElement.style.display = 'block';
}

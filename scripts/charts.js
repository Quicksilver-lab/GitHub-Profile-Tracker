function displayCharts(repoNames, commitCounts, stars, forks) {
    const ctxRepo = document.getElementById('repoChart').getContext('2d');
    const ctxActivity = document.getElementById('activityChart').getContext('2d');

    new Chart(ctxRepo, {
        type: 'bar',
        data: {
            labels: repoNames,
            datasets: [
                {
                    label: 'Stars',
                    data: stars,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Forks',
                    data: forks,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxActivity, {
        type: 'line',
        data: {
            labels: repoNames,
            datasets: [
                {
                    label: 'Commits',
                    data: commitCounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function populateTable(repoNames, stars, forks) {
    const tableBody = document.getElementById('repoTable').querySelector('tbody');
    tableBody.innerHTML = '';

    repoNames.forEach((repoName, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${repoName}</td>
            <td>${stars[index]}</td>
            <td>${forks[index]}</td>
        `;
        tableBody.appendChild(row);
    });
}

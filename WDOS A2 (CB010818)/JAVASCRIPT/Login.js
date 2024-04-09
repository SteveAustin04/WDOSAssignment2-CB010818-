// Fetch JSON data from 'Wilpattu National Park.json'
// Fetch JSON data from 'user.json'
fetch('JSON DATA FILES/user.json')
    .then(response => response.json())
    .then(data => {
        // Store data in a variable
        const users = data.users;

        // Set up event listener for the login form
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            let authenticatedUser = users.find(user => user.username === username && user.password === password);
            if (authenticatedUser) {
                // Redirect to dashboard or any other page
                window.location.href = 'Home.html';
            } else {
                document.getElementById('error').textContent = 'Invalid username or password';
            }
        });

        // Store users data in localStorage
        localStorage.setItem('users', JSON.stringify(users));
    })
    .catch(error => console.error('Error loading JSON:', error));


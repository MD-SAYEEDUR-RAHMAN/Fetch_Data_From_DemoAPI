document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get username and password values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Define the payload
    const payload = {
        username: username,
        password: password,
        expiresInMins: 30 // optional
    };

    // Make the API call using fetch
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then(data => {
        if (data.token) {
            // Display success message and token

          /*  const message = `Login successful! 
                             ID: ${data.id}
                             Name: ${data.firstName} ${data.lastName}
                             Token: ${data.token}`;
            
            document.getElementById('result').textContent = message;
            */

            document.getElementById('result').textContent = 'Login successful! Token: ' + data.token;

            document.getElementById('result').style.color = 'blue';
  
        } else {
            document.getElementById('result').textContent = 'Login failed. Please check your credentials.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Login failed. Please try again.';
    });
});

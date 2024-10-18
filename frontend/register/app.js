let loginForm = document.querySelector(".my-form")

loginForm.addEventListener("submit", (e) => { 
    e.preventDefault();
    
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    if (!username || !email || !password) {
        alert("Please fill out all fields")
        return
    }

    // Check if the email already exists
    axios
        .post("http://localhost:3000/auth/check-email", { email }) 
        .then(res => {
            if (res.data.exists) {
                alert("Email already exists")
            } else {
                // If email doesn't exist, proceed with signup
                axios
                    .post("http://localhost:3000/auth/register", { username, email, password }) 
                    .then(res => {
                        alert("Signup successful")
                      
                        window.location.href = "http://127.0.0.1:5501/login/index.html"
                    })
                    .catch(err => {
                        alert("Signup error")
                    })
            }
        })
        .catch(err => {
            console.error(err)
            alert("Failed to check email")
        })
})

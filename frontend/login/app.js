
window.addEventListener('load', async () => {

    console.log("hello from")
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
        try {
            const res = await axios.post("http://localhost:3000/auth/verify", {}, {
                headers: { 'token': token}
            });
            if (res.data.valid) {
              window.location.href='http://127.0.0.1:5501/home/index.html'
            }
        } catch (error) {
            alert("Please login")
        }
    }
})


let loginForm = document.querySelector(".my-form")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    try {
        const res = await axios.post("http://localhost:3000/auth/login", { email, password })
        localStorage.setItem("token", res.data.token)  
        alert("Signin successful")
        window.location.href = 'http://127.0.0.1:5501/home/index.html'
    } catch (err) {
        console.log(err)
        alert("Unauthorized")
    }
})



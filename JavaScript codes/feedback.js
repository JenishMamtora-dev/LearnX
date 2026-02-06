document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let responseMessage = document.getElementById("responseMessage");

    if (name === "" || email === "" || message === "") {
        responseMessage.style.color = "red";
        responseMessage.textContent = "All fields are required!";
        return;
    }

    responseMessage.style.color = "#1b8033ff";
    responseMessage.textContent = "Thank you for your feedback, " + name + "";

    // Optionally, reset the form
    document.getElementById("feedbackForm").reset();
});
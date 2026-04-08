document.getElementById("submitFeedbackBtn").addEventListener("click", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let errorMsg = document.getElementById("loginError");
    let successMsg = document.getElementById("successMsg");

    // Reset messages
    errorMsg.style.display = "none";
    successMsg.style.display = "none";

    if (name === "" || email === "" || message === "") {
        errorMsg.style.display = "block";
        errorMsg.textContent = "All fields are required!";
        return;
    }

    try {
        // Enforce user is logged in
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Login first";
            return;
        }

        if (email.toLowerCase() !== user.email.toLowerCase()) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Email not registered";
            return;
        }

        // Send to supabase
        const { error } = await supabaseClient
            .from('feedback')
            .insert([{ name: name, email: email, message: message, user_id: user.id }]);

        if (error) {
            console.error(error);
            // Optionally could still show thank you message or show actual error 
            // but we will gracefully handle it for the user
        }

        // Show success message
        successMsg.style.display = "block";
        successMsg.textContent = "Thank you " + name;

        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

    } catch (err) {
        errorMsg.style.display = "block";
        errorMsg.textContent = "An error occurred. Please try again.";
        console.error(err);
    }
});
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
        // Check if user is logged in
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Login first to submit feedback";
            return;
        }

        if (email.toLowerCase() !== user.email.toLowerCase()) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Email does not match your account";
            return;
        }

        // Send to Supabase feedback table
        const { data, error } = await supabaseClient
            .from('feedback')
            .insert([{ 
                user_id: user.id,
                name: name,
                email: email,
                message: message,
                submitted_at: new Date().toISOString()
            }]);

        if (error) {
            console.error("Supabase error:", error);
            errorMsg.style.display = "block";
            errorMsg.textContent = "Error submitting feedback. Please try again.";
            return;
        }

        // Show success message
        successMsg.style.display = "block";
        successMsg.textContent = "Thank you " + name + "! Your feedback has been received. ✅";

        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);

    } catch (err) {
        errorMsg.style.display = "block";
        errorMsg.textContent = "An error occurred. Please try again.";
        console.error(err);
    }
});
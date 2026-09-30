const registerForm =
    document.getElementById("registerForm");

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        // ================= Password Check =================

        if (password !== confirmPassword) {

            message.innerText =
                "Passwords do not match.";

            message.className =
                "text-center mt-4 font-semibold text-red-600";

            return;
        }


        // ================= Create Form Data =================

        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);


        try {

            const response =
                await fetch("register.php", {
                    method: "POST",
                    body: formData
                });


            const result =
                await response.text();


            if (
                result.includes(
                    "Registration successful"
                )
            ) {

                message.innerText =
                    "Registration successful!";

                message.className =
                    "text-center mt-4 font-semibold text-green-600";


                setTimeout(function () {

                    window.location.href =
                        "login.html";

                }, 1000);

            } else {

                message.innerText = result;

                message.className =
                    "text-center mt-4 font-semibold text-red-600";
            }


        } catch (error) {

            console.error(error);

            message.innerText =
                "Server error. Please try again.";

            message.className =
                "text-center mt-4 font-semibold text-red-600";
        }

    }
);
const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const message =
            document.getElementById("loginMessage");


        // ================= Form Data =================

        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);


        try {

            const response =
                await fetch("login.php", {
                    method: "POST",
                    body: formData
                });


            const result =
                await response.text();


            // ================= Login Success =================

            if (
                result.includes(
                    "Login successful"
                )
            ) {

                message.innerText =
                    "Login successful!";

                message.className =
                    "text-center mt-4 font-semibold text-green-600";


                setTimeout(function () {

                    window.location.href =
                        "index.html";

                }, 1000);


            } else {

                message.innerText =
                    result;

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
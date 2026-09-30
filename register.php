<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";
$confirmPassword = $_POST["confirmPassword"] ?? "";


// ================= Validation =================

if ($name === "" || $email === "" || $password === "") {
    die("All fields are required.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}

if ($password !== $confirmPassword) {
    die("Passwords do not match.");
}

if (strlen($password) < 6) {
    die("Password must be at least 6 characters.");
}


// ================= Check Existing Email =================

$stmt = $conn->prepare(
    "SELECT id FROM users WHERE email = ?"
);

$stmt->bind_param("s", $email);

$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    die("This email is already registered.");
}


// ================= Hash Password =================

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);


// ================= Insert User =================

$stmt = $conn->prepare(
    "INSERT INTO users (name, email, password)
     VALUES (?, ?, ?)"
);

$stmt->bind_param(
    "sss",
    $name,
    $email,
    $hashedPassword
);


if ($stmt->execute()) {

    header("Location: login.html?registered=success");
    exit;

} else {

    die("Registration failed: " . $conn->error);

}

?>
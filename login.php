<?php

session_start();

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request.");
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";


// ================= Validation =================

if ($email === "" || $password === "") {
    die("Email and password are required.");
}


// ================= Find User =================

$stmt = $conn->prepare(
    "SELECT id, name, email, password
     FROM users
     WHERE email = ?"
);

$stmt->bind_param("s", $email);

$stmt->execute();

$result = $stmt->get_result();


// ================= User Not Found =================

if ($result->num_rows === 0) {
    die("Invalid email or password.");
}


$user = $result->fetch_assoc();


// ================= Check Password =================

if (!password_verify($password, $user["password"])) {
    die("Invalid email or password.");
}


// ================= Create Session =================

$_SESSION["user_id"] =
    $user["id"];

$_SESSION["user_name"] =
    $user["name"];

$_SESSION["user_email"] =
    $user["email"];


// ================= Login Success =================

echo "Login successful";

?>
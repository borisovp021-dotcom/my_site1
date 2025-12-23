<?php
// Файл для обработки отправки формы (пример для PHP)
header('Content-Type: application/json');

// Получаем данные из формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Проверяем обязательные поля
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля.']);
    exit;
}

// Проверяем email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, введите корректный email адрес.']);
    exit;
}

// Настройки email
$to = 'elena.photo@example.com'; // Замените на реальный email
$subject = 'Новое сообщение с сайта фотографа от ' . $name;
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Формируем тело письма
$email_body = "Имя: $name\n";
$email_body .= "Email: $email\n\n";
$email_body .= "Сообщение:\n$message\n\n";
$email_body .= "-- \nЭто сообщение отправлено с сайта фотографа Елены.";

// Отправляем email
if (mail($to, $subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.']);
}

// Альтернативный вариант с использованием PHPMailer (рекомендуется)
/*
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->isSMTP();
$mail->Host = 'smtp.example.com'; // Ваш SMTP сервер
$mail->SMTPAuth = true;
$mail->Username = 'your_email@example.com'; // Ваш email
$mail->Password = 'your_password'; // Ва
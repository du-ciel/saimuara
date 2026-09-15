<?php

if (!is_dir('/tmp/views')) {
    mkdir('/tmp/views', 0777, true);
}

// Mengarahkan semua request Vercel (dari folder api) ke file utama Laravel (di folder public)
require __DIR__ . '/../public/index.php';

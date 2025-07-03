document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling untuk Navigasi ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Memastikan targetId adalah ID yang valid dan elemen ada di DOM
            if (targetId.startsWith('#') && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth' // Efek scroll yang halus
                });
            }
        });
    });

    // --- CTA Button (Lihat Produk Kami) ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('#products').scrollIntoView({
                behavior: 'smooth'
            });
            console.log('Tombol "Lihat Produk Kami" diklik!');
        });
    }

    // --- View Details Button pada Product Cards ---
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.product; // Mengambil data-product attribute
            alert(`Anda ingin melihat detail produk: ${productName.toUpperCase()}. Ini adalah placeholder untuk halaman atau modal detail produk.`);
            console.log(`Tombol "Lihat Detail" untuk ${productName} diklik.`);
            // Di sini Anda akan menambahkan logika untuk menampilkan modal detail produk,
            // atau mengarahkan ke halaman detail produk yang sesungguhnya.
        });
    });

    // --- Kalkulator Otomatis ---
    const currentCostInput = document.getElementById('currentCost');
    const desiredDiscountInput = document.getElementById('desiredDiscount');
    const monthlySavingSpan = document.getElementById('monthlySaving');
    const newCostSpan = document.getElementById('newCost');
    const calculateBtn = document.querySelector('.calculate-btn');

    // Fungsi untuk memformat angka ke mata uang Rupiah
    function formatRupiah(number) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0 // Tidak ada angka di belakang koma
        }).format(number);
    }

    // Fungsi untuk menghitung penghematan
    function calculateSavings() {
        // Mengambil nilai input dan mengubahnya ke float, default 0 jika kosong
        const currentCost = parseFloat(currentCostInput.value) || 0;
        const desiredDiscount = parseFloat(desiredDiscountInput.value) || 0;

        // Validasi input
        if (currentCost < 0 || desiredDiscount < 0 || desiredDiscount > 100) {
            monthlySavingSpan.textContent = formatRupiah(0);
            newCostSpan.textContent = formatRupiah(0);
            return;
        }

        const discountAmount = (currentCost * desiredDiscount) / 100;
        const newMonthlyCost = currentCost - discountAmount;

        monthlySavingSpan.textContent = formatRupiah(discountAmount);
        newCostSpan.textContent = formatRupiah(newMonthlyCost);
    }

    // Event listener untuk menghitung otomatis saat input berubah
    currentCostInput.addEventListener('input', calculateSavings);
    desiredDiscountInput.addEventListener('input', calculateSavings);
    // Event listener untuk tombol hitung (tetap ada meskipun sudah otomatis, untuk UX)
    calculateBtn.addEventListener('click', calculateSavings);

    // Inisialisasi kalkulator saat halaman dimuat
    calculateSavings();

    // --- FAQ Interactive (Show/Hide) ---
    document.querySelectorAll('.faq-item h3').forEach(faqTitle => {
        faqTitle.addEventListener('click', function() {
            const parentFaqItem = this.closest('.faq-item'); // Mendapatkan elemen induk .faq-item
            const answer = this.nextElementSibling; // Mendapatkan elemen <p> (jawaban) yang berdekatan

            if (parentFaqItem && answer && answer.tagName === 'P') {
                parentFaqItem.classList.toggle('active'); // Toggle class 'active' pada item FAQ

                if (answer.style.maxHeight) { // Jika jawaban sudah terbuka, tutup
                    answer.style.maxHeight = null; // Menghilangkan max-height untuk efek transisi ke 0
                } else { // Jika jawaban tertutup, buka
                    // Mengatur max-height ke scrollHeight untuk memungkinkan transisi dari 0 ke tinggi konten
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });

    // --- Tombol Kembali ke Atas (Back-to-Top Button) ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        // Tampilkan tombol setelah menggulir 300px ke bawah
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        // Gulir halus ke bagian paling atas halaman
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Animasi Tampilan (Fade-in dan Slide-up) menggunakan Intersection Observer ---
    const animateElements = document.querySelectorAll('.fade-in, .slide-up');

    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat di viewport, aktifkan animasi
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear'); // Tambahkan kelas 'appear' untuk memicu animasi
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi diaktifkan
            }
        });
    }, observerOptions);

    // Amati setiap elemen yang memiliki kelas animasi
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Menu Login dan Daftar (Placeholder Fungsionalitas) ---
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Ini adalah placeholder untuk fitur Masuk. Anda akan diarahkan ke halaman login yang sesungguhnya.');
            console.log('Tombol Masuk diklik.');
            // Di sini Anda akan menambahkan window.location.href = 'login.html'; atau menampilkan modal login
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            alert('Ini adalah placeholder untuk fitur Daftar. Anda akan diarahkan ke halaman pendaftaran yang sesungguhnya.');
            console.log('Tombol Daftar diklik.');
            // Di sini Anda akan menambahkan window.location.href = 'register.html'; atau menampilkan modal daftar
        });
    }
});
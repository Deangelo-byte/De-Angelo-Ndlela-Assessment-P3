console.log("JavaScript is connected successfully!");
document.addEventListener("DOMContentLoaded", function () {

    // Select all gallery images
    const images = document.querySelectorAll(".gallery-image");

    // Create the lightbox
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";

    lightbox.innerHTML = `
        <button id="close-lightbox" aria-label="Close image">&times;</button>
        <button id="prev-image" aria-label="Previous image">&#10094;</button>
        <img id="lightbox-image" src="" alt="">
        <button id="next-image" aria-label="Next image">&#10095;</button>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = document.getElementById("lightbox-image");
    let currentIndex = 0;

    // Display selected image
    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }

    // Open lightbox when an image is clicked
    images.forEach(function (image, index) {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        function openImage() {
            showImage(index);
            lightbox.classList.add("active");
            document.getElementById("close-lightbox").focus();
        }

        image.addEventListener("click", openImage);

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage();
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove("active");
        images[currentIndex].focus();
    }

    document.getElementById("close-lightbox")
        .addEventListener("click", closeLightbox);

    // Previous image
    document.getElementById("prev-image")
        .addEventListener("click", function () {
            showImage(currentIndex - 1);
        });

    // Next image
    document.getElementById("next-image")
        .addEventListener("click", function () {
            showImage(currentIndex + 1);
        });

    // Keyboard controls
    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });

    // Close when clicking outside the image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

});


/* ==================================
   PART 3 - SERVICE SEARCH
================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("serviceSearch");
    const services = document.querySelectorAll(".grooming-service");
    const searchMessage = document.getElementById("searchMessage");

    // Only run on the Services page
    if (!searchInput || !searchMessage) return;

    // Search services as the user types
    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();
        let matches = 0;

        services.forEach(function (service) {

            const serviceName = service.querySelector("h2").textContent.toLowerCase();

            if (serviceName.includes(searchText)) {
                service.style.display = "";
                matches++;
            } else {
                service.style.display = "none";
            }

        });

        // Display a message if no services match
        if (matches === 0) {
            searchMessage.textContent = "No grooming services found.";
        } else {
            searchMessage.textContent = "";
        }

    });

});



/* ==================================
   PART 3 - SERVICE SORTING
================================== */

document.addEventListener("DOMContentLoaded", function () {

    const sortSelect = document.getElementById("serviceSort");
    const container = document.getElementById("servicesContainer");

    if (!sortSelect || !container) return;

    const services = Array.from(
        container.querySelectorAll(".grooming-service")
    );

    sortSelect.addEventListener("change", function () {

        const sortedServices = [...services];

        if (sortSelect.value === "az") {
            sortedServices.sort((a, b) =>
                a.querySelector("h2").textContent.localeCompare(
                    b.querySelector("h2").textContent
                )
            );
        }

        if (sortSelect.value === "za") {
            sortedServices.sort((a, b) =>
                b.querySelector("h2").textContent.localeCompare(
                    a.querySelector("h2").textContent
                )
            );
        }

        sortedServices.forEach(function (service) {
            container.appendChild(service);
        });

    });

});



/* ==================================
   PART 3 - BOOKING FORM VALIDATION
================================== */

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");
    console.log("Booking form found:", bookingForm);
    const bookingMessage = document.getElementById("bookingMessage");
    console.log("Booking message found:",bookingMessage);

    // Only run on the Booking page
    if (!bookingForm || !bookingMessage) return;

    bookingForm.addEventListener("submit", function (event) {

        // Prevent the page from reloading
        event.preventDefault();

        // Check that all required fields are valid
        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        // Get customer information
        const fullName = document.getElementById("fullname").value.trim();
        const dogName = document.getElementById("dogname").value.trim();

        // Display confirmation message
        bookingMessage.textContent =
            "Thank you, " + fullName +
            "! Your booking request for " + dogName +
            " has been completed successfully (demo only).";

        bookingMessage.style.color = "green";
        bookingMessage.style.fontWeight = "bold";

        // Clear the form
        bookingForm.reset();

    });

    // Clear confirmation when the form is reset
    bookingForm.addEventListener("reset", function () {
        bookingMessage.textContent = "";
    });

});


/* ==================================
   PART 3 - CONTACT FORM VALIDATION
================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    // Only run on the Contact page
    if (!contactForm || !contactMessage) return;

    contactForm.addEventListener("submit", function (event) {

        // Prevent the page from refreshing
        event.preventDefault();

        // Check required fields
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Get the customer's name
        const customerName = document.getElementById("name").value.trim();

        // Display confirmation message
        contactMessage.textContent =
            "Thank you, " + customerName +
            "! Your message has been received successfully (demo only).";

        contactMessage.style.color = "green";

        // Clear the form
        contactForm.reset();

    });

});

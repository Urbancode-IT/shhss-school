document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    let name = document.getElementById('name').value;
    let selectedAmount = document.querySelector('input[name="donation"]:checked')?.value;
    let otherAmount = document.getElementById('other-amount').value;
    let amount = selectedAmount || otherAmount;

    // Validate amount
    if (!amount) {
        alert("Please enter or select an amount to donate.");
        return;
    }

    // Add the new donor to the table
    let table = document.getElementById('donorTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    cell1.innerHTML = name;
    cell2.innerHTML = `₹${amount}`;

    // Clear form fields after submission
    document.getElementById('donationForm').reset();
});
document.addEventListener("DOMContentLoaded", function() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const totalPages = pageNumbers.length;
    let currentPage = 1;

    function updatePageDisplay(page) {
        document.querySelectorAll('.donations-container').forEach(container => {
            container.style.display = 'none';
        });
        document.getElementById(`page-${page}`).style.display = 'grid';

        // Update active page number
        pageNumbers.forEach(pageNumber => {
            pageNumber.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');
        
        // Disable/Enable prev and next buttons
        prevButton.disabled = page == 1;
        nextButton.disabled = page == totalPages;
    }

    // Page number click event
    pageNumbers.forEach(pageNumber => {
        pageNumber.addEventListener('click', function() {
            currentPage = parseInt(this.getAttribute('data-page'));
            updatePageDisplay(currentPage);
        });
    });

    // Previous button click event
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePageDisplay(currentPage);
        }
    });

    // Next button click event
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageDisplay(currentPage);
        }
    });

    // Initialize first page display
    updatePageDisplay(currentPage);
});


    // Get elements
    const donationRadios = document.querySelectorAll('.donation-options input[type="radio"]');
    const otherAmountInput = document.getElementById('other-amount');

    // Function to handle radio button click
    donationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Set the value of the other amount input to the value of the selected radio button
            otherAmountInput.value = this.value;
        });
    });

    // Allow manual editing in the "Other Amount" input field
    otherAmountInput.addEventListener('input', function() {
        // If the user starts typing, deselect all radio buttons
        donationRadios.forEach(radio => {
            radio.checked = false;
        });
    });


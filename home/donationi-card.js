// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECTORS
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountInput = document.querySelector('.input-group input');

    // 2. TOGGLE LOGIC (Single vs Monthly)
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons in this group
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');
            
            // Logic tip: You can trigger API calls or UI changes here 
            // based on button.innerText (e.g., "SINGLE" vs "MONTHLY")
        });
    });

    // 3. AMOUNT PRESETS LOGIC
    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            // UI Feedback: Update active state
            amountButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update Input: Get number from text (e.g., "£50" -> 50)
            const value = button.innerText.replace('£', '');
            amountInput.value = value;
        });
    });

    // 4. MANUAL INPUT OVERRIDE
    // If the user types a custom amount, remove the "active" highlight from presets
    amountInput.addEventListener('input', () => {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });

});
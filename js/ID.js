document.addEventListener('DOMContentLoaded', () => {
    const accountBtn = document.getElementById('accountBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Toggle Dropdown
    accountBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('active')) {
            dropdownMenu.classList.remove('active');
        }
    });
});
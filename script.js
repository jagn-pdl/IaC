// Select elements from the DOM
const button = document.getElementById('btn');
const message = document.getElementById('message');

// Add click event listener to the button
button.addEventListener('click', () => {
    message.textContent = "You clicked the button! JavaScript is working 🎉";
});
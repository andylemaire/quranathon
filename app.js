// Define leaderboard array to store submissions
let leaderboard = [];

// Get the form element
const form = document.getElementById("leaderboard-form");

// Get the leaderboard table body element
const leaderboardTableBody = document.querySelector("#leaderboard-table tbody");

// Handle form submission
form.addEventListener("submit", function(event) {
  // Prevent default form submission
  event.preventDefault();

  // Get form input values
  const name = document.getElementById("name").value.trim();
  const amount = parseInt(document.getElementById("amount").value.trim());

  // Validate input values
  if (name === "" || isNaN(amount) || amount < 1) {
    alert("Please enter valid name and amount recited.");
    return;
  }

  // Check if user has already submitted for the day
  const today = new Date().toLocaleDateString();
  const existingSubmission = leaderboard.find(submission => submission.name === name && submission.date === today);
  if (existingSubmission) {
    alert("You have already submitted for today. Please try again tomorrow.");
    return;
  }

  // Add new submission to leaderboard
  leaderboard.push({
    name: name,
    amount: amount,
    date: today
  });

  // Sort leaderboard by amount recited (descending order)
  leaderboard.sort((a, b) => b.amount - a.amount);

  // Remove existing table rows
  leaderboardTableBody.innerHTML = "";

  // Add new rows to table
  leaderboard.forEach((submission, index) => {
    const row = document.createElement("tr");
    const rankCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const amountCell = document.createElement("td");

    rankCell.textContent = index + 1;
    rankCell.classList.add("rank");
    nameCell.textContent = submission.name;
    amountCell.textContent = submission.amount;

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(amountCell);
    leaderboardTableBody.appendChild(row);
  });

  // Reset form inputs
  form.reset();
});

// Initialize an empty array to store quotes
let quotes = [];

// Load quotes from localStorage on page load
window.onload = function() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
    displayRandomQuote();
  } else {
    document.getElementById('quoteDisplay').innerText = "No quotes available.";
  }
};

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
  } else {
    document.getElementById('quoteDisplay').innerText = "No quotes available.";
  }
}

// Event listener for showing new quote
document.getElementById('showNewQuote').addEventListener('click', displayRandomQuote);

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    document.getElementById('newQuoteText').value = ''; // Clear input fields
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for adding a new quote
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Function to export quotes as a JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty print JSON
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url); // Clean up the URL object
}

// Event listener for exporting quotes
document.getElementById('exportQuotes').addEventListener('click', exportQuotesToJson);

// Function to import quotes from a JSON file
function importQuotesFromJson(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes); // Add the imported quotes to the existing array
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listener for importing quotes
document.getElementById('importFile').addEventListener('change', importQuotesFromJson);

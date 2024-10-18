// Array to store quotes
let quotes = [];

// Load quotes from localStorage when page initializes
window.onload = function() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
    displayRandomQuote(); // Display one of the saved quotes
  }
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    document.getElementById('quoteDisplay').innerText = lastViewedQuote;
  }
};

// Function to save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length > 0) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteDisplay').innerText = randomQuote.text + " - " + randomQuote.category;
    sessionStorage.setItem('lastViewedQuote', randomQuote.text);
  } else {
    document.getElementById('quoteDisplay').innerText = "No quotes available.";
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };
    quotes.push(newQuote);
    saveQuotes();
    document.getElementById('newQuoteText').value = ''; // Clear input fields
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for showing new quote
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to export quotes as JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2); // Pretty print with 2 spaces
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
  
    URL.revokeObjectURL(url); // Clean up after download
  }
  // Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes); // Add new quotes
      saveQuotes(); // Save to localStorage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
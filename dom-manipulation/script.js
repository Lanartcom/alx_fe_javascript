// Array to store quotes
let quotes = [];

// Load quotes from localStorage when page initializes
window.onload = function() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
    displayRandomQuote(); // Display one of the saved quotes
  }

  // Load the last viewed quote from sessionStorage if it exists
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
    document.getElementById('quoteDisplay').innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
    
    // Save the last viewed quote in sessionStorage
    sessionStorage.setItem('lastViewedQuote', `"${randomQuote.text}" - ${randomQuote.category}`);
  } else {
    document.getElementById('quoteDisplay').innerText = "No quotes available.";
  }
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };

    quotes.push(newQuote);
    saveQuotes(); // Save the updated quotes to localStorage

    // Clear input fields after adding a quote
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert('Quote added successfully!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to export quotes as a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty-print with 2 spaces
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  // Clean up after download
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      // Validate that the file contains an array of quotes
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
        quotes.push(...importedQuotes); // Append new quotes to the array
        saveQuotes(); // Save to localStorage
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid format. Please upload a valid JSON file.');
      }
    } catch (error) {
      alert('Error parsing the JSON file. Please ensure it is properly formatted.');
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Attach the import functionality to the file input
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

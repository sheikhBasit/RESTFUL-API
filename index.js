// Function to fetch and display books
async function fetchBooks() {
    const response = await fetch('/books');
    const books = await response.json();

    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';

    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author} - $${book.price}`;
        booksList.appendChild(listItem);
    });
    }

  // Function to add a new book
async function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;

    const response = await fetch('/books', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({ title, author, price })
    });

    const newBook = await response.json();
    console.log('New Book:', newBook);

    // Fetch and display updated books after adding a new book
    fetchBooks();
}

  // Attach event listener to the form
document.getElementById('addBookForm').addEventListener('submit', addBook);

  // Initial fetch and display of books
fetchBooks();

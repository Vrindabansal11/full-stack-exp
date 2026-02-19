let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = null;

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks(filter = "") {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  books
    .filter(book =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase()) ||
      book.category.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((book, index) => {

      const bookDiv = document.createElement("div");
      bookDiv.className = "book";

      bookDiv.innerHTML = `
        <div>
          <strong>${book.title}</strong><br>
          <small>by ${book.author}</small><br>
          <span class="category">Category: ${book.category}</span>
        </div>
        <div class="actions">
          <button class="edit" onclick="startEdit(${index})">Edit</button>
          <button class="remove" onclick="removeBook(${index})">Remove</button>
        </div>
      `;

      bookList.appendChild(bookDiv);
    });
}

function addBook() {
  const titleInput = document.getElementById("titleInput");
  const authorInput = document.getElementById("authorInput");
  const categoryInput = document.getElementById("categoryInput");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const category = categoryInput.value.trim();

  if (title === "" || author === "" || category === "") {
    alert("Please fill all fields!");
    return;
  }

  if (editIndex === null) {
    books.push({ title, author, category });
  } else {
    books[editIndex] = { title, author, category };
    editIndex = null;
    document.querySelector(".add-book button").textContent = "Add Book";
  }

  saveBooks();
  displayBooks();

  titleInput.value = "";
  authorInput.value = "";
  categoryInput.value = "";
}

function removeBook(index) {
  books.splice(index, 1);
  saveBooks();
  displayBooks();
}

function startEdit(index) {
  document.getElementById("titleInput").value = books[index].title;
  document.getElementById("authorInput").value = books[index].author;
  document.getElementById("categoryInput").value = books[index].category;

  editIndex = index;
  document.querySelector(".add-book button").textContent = "Update Book";
}

document.getElementById("searchInput").addEventListener("input", function() {
  displayBooks(this.value);
});

displayBooks();

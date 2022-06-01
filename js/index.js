const listSection = document.querySelector('.booklist');
const addSection = document.querySelector('.addnew');
const contactSection = document.querySelector('.contacts');

const listMenuLink = document.querySelector('#bookslist');
const addMenuLink = document.querySelector('#addbooks');
const contactMenuLink = document.querySelector('#contact');

document.querySelectorAll('.navbar').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    listMenuLink.addEventListener('click', () => {
      listSection.style.display = 'block';
      addSection.style.display = 'none';
      contactSection.style.display = 'none';
    });

    addMenuLink.addEventListener('click', () => {
      listSection.style.display = 'none';
      addSection.style.display = 'block';
      contactSection.style.display = 'none';
    });

    contactMenuLink.addEventListener('click', () => {
      listSection.style.display = 'none';
      addSection.style.display = 'none';
      contactSection.style.display = 'block';
    });
  });
});

// storage
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static clearfields() {
    document.querySelector('#title-input').value = '';
    document.querySelector('#author-input').value = '';
  }

  addbook() {
    const book = {
      title: this.title.value,
      author: this.author.value,
    };

    const books = [];
    if (JSON.parse(localStorage.getItem('booklist')) === null) {
      books.push(book);
      localStorage.setItem('booklist', JSON.stringify(books));
    } else {
      const newbooks = JSON.parse(localStorage.getItem('booklist'));
      newbooks.push(book);
      localStorage.setItem('booklist', JSON.stringify(newbooks));
    }
  }

  static fetchbooks() {
    const booklist = document.querySelector('.list');
    const data = JSON.parse(localStorage.getItem('booklist'));

    let str = '';
    if (JSON.parse(localStorage.getItem('booklist')) === null || data.length === 0) {
      str = '<li class="list-item">No book stored!</li>';
    } else {
      data.forEach((book) => {
        str += `<li class="list-item">
          <p>${book.title} by ${book.author}</p>
          <a href="" class="remove-btn" id="remove-book">Remove</a>
        </li>`;
      });

      booklist.innerHTML = str;
    }
  }

  static removebook(id) {
    let data = JSON.parse(localStorage.getItem('booklist'));
    const selectedbook = data[id];
    const filteredBooks = data.filter((item) => item !== selectedbook);
    localStorage.setItem('booklist', JSON.stringify(filteredBooks));
    const newData = JSON.parse(localStorage.getItem('booklist'));
    data = newData;
  }
}

const bk = new Books(titleInput, authorInput);

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  bk.addbook();
  Books.clearfields();
  Books.fetchbooks();
});

Books.fetchbooks();

document.querySelectorAll('#remove-book').forEach((button, id) => {
  button.addEventListener('click', () => {
    Books.removebook(id);
    Books.fetchbooks();
  });
});

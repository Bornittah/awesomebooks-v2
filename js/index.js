let listSection = document.querySelector('.booklist');
let addSection = document.querySelector('.addnew');
let contactSection = document.querySelector('.contacts');


let listMenuLink = document.querySelector('#bookslist');
let addMenuLink = document.querySelector('#addbooks');
let contactMenuLink = document.querySelector('#contact');

document.querySelectorAll('.navbar').forEach((link)=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    listMenuLink.addEventListener('click', ()=>{
      listSection.style.display='block';
      addSection.style.display='none';
      contactSection.style.display='none';
    });
    
    addMenuLink.addEventListener('click', ()=>{
        listSection.style.display='none';
        addSection.style.display='block';
        contactSection.style.display='none';
      
    });
    
    contactMenuLink.addEventListener('click', ()=>{
      listSection.style.display='none';
      addSection.style.display='none';
      contactSection.style.display='block';
    });
});
});

// storage
let titleInput = document.querySelector('#title-input');
let authorInput = document.querySelector('#author-input');
class Books {
    constructor(title, author){
      this.title=title;
      this.author=author;
    }

    clearfields() {
      titleInput.value = '';
      authorInput.value = '';
    }

    addbook(){
      let book = {
        'title': this.title.value,
        'author': this.author.value
      };

      let books = [];
      if (JSON.parse(localStorage.getItem('booklist')) === null) {
        books.push(book);
        localStorage.setItem('booklist', JSON.stringify(books));
      } 
      else {
        let newbooks = JSON.parse(localStorage.getItem('booklist'));
        newbooks.push(book);
        localStorage.setItem('booklist', JSON.stringify(newbooks));
      }
    }

    fetchbooks(){
      let booklist = document.querySelector('.list');
      let data = JSON.parse(localStorage.getItem('booklist'));
      
        let str='';
        if (JSON.parse(localStorage.getItem('booklist')) === null || data.length===0) {
          str=`<li class="list-item">No book stored!</li>`;
        }
        else{
          for(let obj of data){
          str+=`<li class="list-item">
          <p>${obj.title} by ${obj.author}</p>
          <a href="" class="remove-btn" id="remove-book">Remove</a>
        </li>`
        }
        }
        booklist.innerHTML=str;

    }

    removebook(id){
      let data = JSON.parse(localStorage.getItem('booklist'));
      let selectedbook=data[id];
      let filteredBooks=data.filter((item)=>{
        return item !== selectedbook;
      });
      localStorage.setItem('booklist', JSON.stringify(filteredBooks));
      let newData=JSON.parse(localStorage.getItem('booklist'));
      data = newData;
    }
  }

  let bk = new Books(titleInput,authorInput);

  document.getElementById('form').addEventListener('submit', (e)=>{
    e.preventDefault();
    bk.addbook();
    bk.clearfields();
    bk.fetchbooks();
  });

  bk.fetchbooks();
  
  document.querySelectorAll('#remove-book').forEach((button, id)=>{
    button.addEventListener('click', (e)=>{
    bk.removebook(id);
    bk.fetchbooks();
  })
});



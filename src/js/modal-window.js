import axios from 'axios';
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css";


const booksListContainer = document.querySelector('#book-list');

function getBookIndexInShoppingList(bookData) {
    let booksShoppingList = localStorage.getItem("booksShoppingList");
    if (!booksShoppingList) {
        return -1;
    }
    booksShoppingList = JSON.parse(booksShoppingList);

    // Find the index of the book with the given ID
    const bookIndex = booksShoppingList.findIndex(book => book.id === bookData.id);

    return bookIndex;
}

function addToShoppingList(bookData) {
    let booksShoppingList = localStorage.getItem("booksShoppingList");
    if (!booksShoppingList) {
        booksShoppingList = [];
    } else {
        booksShoppingList = JSON.parse(booksShoppingList);
    }

    // Check if a book with the same ID already exists
    const existingBookIndex = booksShoppingList.findIndex(item => item.id === bookData.id);
    if (existingBookIndex === -1) {
        booksShoppingList.push(bookData);

        localStorage.setItem("booksShoppingList", JSON.stringify(booksShoppingList));
    }
}

function removeFromShoppingList(bookData) {
    let booksShoppingList = localStorage.getItem("booksShoppingList");
    if (!booksShoppingList) {
        return;
    }
    booksShoppingList = JSON.parse(booksShoppingList);

    // Find the index of the book with the given ID
    const bookIndex = booksShoppingList.findIndex(book => book.id === bookData.id);
    if (bookIndex !== -1) {
        booksShoppingList.splice(bookIndex, 1);
        localStorage.setItem("booksShoppingList", JSON.stringify(booksShoppingList));
    }
}

function openModal(bookData) {
    const template = document.querySelector('#modal-template');
    const lightbox = new basicLightbox.create(template);
    const modalBody = lightbox.element();

    modalBody.querySelector('.modal-close').onclick = lightbox.close;

    modalBody.querySelector('.book-img').src = bookData.book_image;
    modalBody.querySelector('.book-name').innerText = bookData.title;
    modalBody.querySelector('.book-author').innerText = bookData.author;
    modalBody.querySelector('.book-description').innerText = bookData.description;
    modalBody.querySelector('.book-description').innerText = bookData.description;

    bookData.buy_links.forEach((link) => {
        if (link.name === 'Amazon') {
            modalBody.querySelector('.book-links-amazon').href = link.url;
        } else if (link.name === 'Apple Books') {
            modalBody.querySelector('.book-links-applebook').href = link.url;
        }
    });

    const addToShoppingListElement = modalBody.querySelector('.addToList');
    const removeFromShoppingListElement = modalBody.querySelector('.removeFromList');

    if (getBookIndexInShoppingList(bookData) > -1) {
        // If book already in shopping list

        addToShoppingListElement.classList.add('hidden');
        removeFromShoppingListElement.classList.remove('hidden');
    }

    addToShoppingListElement.addEventListener('click', (e) => {
        e.preventDefault();
        addToShoppingList(bookData);

        modalBody.querySelector('.removeFromList-info').classList.remove('hidden');
        addToShoppingListElement.classList.add('hidden');
        removeFromShoppingListElement.classList.remove('hidden');
    });

    removeFromShoppingListElement.addEventListener('click', (e) => {
        e.preventDefault();
        removeFromShoppingList(bookData);

        modalBody.querySelector('.removeFromList-info').classList.add('hidden');
        addToShoppingListElement.classList.remove('hidden');
        removeFromShoppingListElement.classList.add('hidden');
    });

    lightbox.show();
}
 
async function loadBookForModal(link) {
    try {
        const { data } = await axios.get(link);

        openModal(data);
    } catch (e) {
        console.log(e.message);
    }
}

booksListContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('js-open-modal')) {
        e.preventDefault();

        loadBookForModal(e.target.href);
    }
});


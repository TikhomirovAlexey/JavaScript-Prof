'use strict';

// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. 
// В этом классе будет приватное свойство для хранения списка книг, 
// а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, 
// которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
// Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. 
// Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать 
// true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. 
// Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];

    constructor(arrayBooks) {
        for (let i = 0; i < arrayBooks.length; i++) {
            for (let k = i + 1; k < arrayBooks.length; k++) {
                if (arrayBooks[i] === arrayBooks[k]) {
                    throw new Error('В списке не должно быть повторений!');
                }
            }
        }

        this.#books.push(...arrayBooks);
    }

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        if (this.#books.includes(title)) {
            throw new Error('Такая книга уже есть в списке!');
        }

        this.#books.push(title);
    }

    removeBook(title) {
        if (!(this.#books.includes(title))) {
            throw new Error('Такой книги нет в списке!');
        }

        this.#books.splice(this.#books.indexOf(title), 1);
    }

    hasBook(title) {
        return this.#books.includes(title);
    }
}

const library = new Library(['aaa', 'bbb', 'ddd']);
console.log(library.allBooks);

library.addBook('ccc');
console.log(library.allBooks);

library.removeBook('bbb');
console.log(library.allBooks);


console.log(library.hasBook('aaa'));


// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, 
// но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, 
// где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 
// 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const appleEl = document.querySelector('.item-apple');
const samsungEl = document.querySelector('.item-samsung');
const playstationEl = document.querySelector('.item-playstation');
const btnEls = document.querySelectorAll('.btn');

function innerHTMLReviews(element) {
    element.querySelector('.reviews').textContent = '';
    initialData.forEach(el => {
        if (el.product === element.querySelector('.name').textContent) {
            for (let i = 0; i < el.reviews.length; i++) {
                element.querySelector('.reviews').insertAdjacentHTML("beforeend", `<p>${el.reviews[i].text}</p>`);
            }
        }
    });
}

function addReview(newReview, element) {
    initialData.forEach(el => {
        if (el.product === element.querySelector('.name').textContent) {
            el.reviews.push({
                id: String(el.reviews.length + 1),
                text: newReview
            })
        }
    });
}

btnEls.forEach(element => {
    element.addEventListener('click', event => {
        let newReview = event.target.parentElement.querySelector('.input').value;
        if (newReview.length > 50 && newReview.length < 500) {
            addReview(newReview, event.target.parentElement.parentElement);
            innerHTMLReviews(event.target.parentElement.parentElement);
            event.target.parentElement.querySelector('.input').value = '';
        } else {
            throw new Error('Комментарий должен быть больше 50 символов и меньше 500.')
        }
    });
});


const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

innerHTMLReviews(appleEl);
innerHTMLReviews(samsungEl);
innerHTMLReviews(playstationEl);
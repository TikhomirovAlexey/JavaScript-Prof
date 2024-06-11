'use strict';

const inputName = document.querySelector('.input-name');
const inputText = document.querySelector('.input-text');
const buttonAdd = document.querySelector('.btn-add');
const productList = document.querySelector('.product-list');
const commentsBlock = document.querySelector('.comments-block');
const headerProductNameSpan = document.querySelector('.header-product-name-span');
const errorBlock = document.querySelector('.error');
const buttonDelete = document.querySelector('.btn-delete');


function displayProductList() {
    productList.innerHTML = '';
    const keys = Object.keys(localStorage);
    for (let i = 0; i < localStorage.length; i++) {
        productList.insertAdjacentHTML('beforeend', `<li class='product-list-item'>${keys[i]}</li>`);
    }
}

function displayCommentsList(obj, name) {
    commentsBlock.innerHTML = '';
    headerProductNameSpan.innerHTML = '';

    if (obj == 0, name == 0) return;

    headerProductNameSpan.innerHTML = name;
    for (const key in obj) {
        if (key == 'length') continue;
        commentsBlock.insertAdjacentHTML('beforeend',
            `<li class='product-comment-item'>${obj[key]}
                <span class='btn-delete' data-product='${name}' data-commentid='${key}'>удалить</span>
            </li>`)
    }
}

buttonAdd.addEventListener('click', () => {
    if (inputName.value === '' || inputText.value === '') {
        errorBlock.innerHTML = 'Поля не должны быть пустыми!';
    } else {
        errorBlock.innerHTML = '';
        if (localStorage.getItem(inputName.value.toLowerCase()) == null) {

            localStorage.setItem(inputName.value.toLowerCase(),
                JSON.stringify({ 1: inputText.value, length: 1 }));

            displayProductList();

            inputName.value = '';
            inputText.value = '';
        } else {
            let tmpObj = JSON.parse(localStorage.getItem(inputName.value.toLowerCase()));
            tmpObj.length++;
            tmpObj[tmpObj.length] = inputText.value;
            localStorage.setItem(inputName.value.toLowerCase(),
                JSON.stringify(tmpObj));
            inputName.value = '';
            inputText.value = '';
        }
    }
});

if (localStorage.length > 0) displayProductList();
else console.log(localStorage);

productList.addEventListener('click', e => {
    let tmpObj = JSON.parse(localStorage.getItem(e.target.innerHTML));

    displayCommentsList(tmpObj, e.target.innerHTML);

});

commentsBlock.addEventListener('click', e => {
    let tmpObj = JSON.parse(localStorage.getItem(e.target.dataset.product));
    delete tmpObj[e.target.dataset.commentid];
    tmpObj.length--;
    if (tmpObj.length == 0) {
        localStorage.removeItem(e.target.dataset.product);
        displayProductList();
        displayCommentsList(0, 0);
    } else {
        localStorage.setItem(e.target.dataset.product, JSON.stringify(tmpObj));
        displayCommentsList(tmpObj, e.target.dataset.product);
    }
});

const showModal = document.getElementById('showModal');
const modal = document.getElementById('modal');
const bookmarkCont = document.getElementById('bookmarkCont');
const item = document.querySelector('.item')
const delet = document.getElementById('delete');
const close = document.getElementById('close');
const bookmarkForm = document.getElementById('bookmarkForm');
const websiteName = document.getElementById('websiteName');
const websiteUrl = document.getElementById('websiteUrl');
const save = document.getElementById('save');


let bookmarks = [];


//show modal 

showModal.addEventListener('click', ()=> {
    modal.style.display = 'block';
});

// close modal 

close.addEventListener('click', ()=> {
    modal.style.display = 'none';
})


// delete bookmark 
function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    });

    // update bookmarks array in localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    buildBookmarks();

}

// build bookmarks 

function buildBookmarks() {

    item.textContent = " ";

    bookmarks.forEach((bookmark)=> {
        const { name , url} = bookmark;

        item.innerHTML += 
        `
        <div class="name">
            <img src="https://s2.googleusercontent.com/s2/favicons?domain=${url}" alt="">
            <a href=${url} target="_blank">${name}</a>
            <i onclick='deleteBookmark("${url}")' class="fa-solid fa-xmark delete"></i>
        </div>
        `
        console.log(name, url)
    })
    
}

// fetch bookmarks

function fetchBookmarks() {
    //get bookmarks from localstorage
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }else {
        // create bookmarks array in localstorage
        bookmarks = [
            {
                name : 'google',
                url: 'google.com',
            },
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    buildBookmarks();
}







bookmarkForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;
    if (!urlValue.includes('http://', 'https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validateForm(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name : nameValue,
        url : urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
});



// form validation 

function validateForm(nameValue, urlValue) {
    const URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    const regex = new RegExp(URL);
    if (!nameValue || !urlValue) {
        alert('Please Enter Both Website Name And URL Adress')
        return false
    }
    if (!urlValue.match(regex)) {
        alert('Please Enter Valid  URL Adress')
        return false;
    }

    // valid
    return true
}


//on load fetch bookmarks
fetchBookmarks();
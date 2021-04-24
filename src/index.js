const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
let allBreedsList = []

document.addEventListener('DOMContentLoaded', (e) => {
    loadImgUrl();
    allBreeds();
    breedDropdown();
});

const loadImgUrl = () => {
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        data.message.forEach(image => {
            renderImg(image)
        })
    });
};

const renderImg = (dogUrl) => {
    const imgContainer = document.getElementById('dog-image-container')
    const imgElement = document.createElement('img')
    imgElement.src = dogUrl
    imgContainer.appendChild(imgElement)
    // console.log(imgElement)
};

const allBreeds = () => {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        allBreedsList = Object.keys(data.message)
        allBreedsList.forEach(breedName => {
            addBreedName(breedName)
        })
        // console.log(allBreedsList)
    })
};

const addBreedName = (breedName) => {
    const breedsUlList = document.getElementById('dog-breeds')
    let newLi = document.createElement('li')
    newLi.innerText = breedName
    newLi.className = 'dogBreed'
    breedsUlList.append(newLi)
    // console.log(image)  
    
    breedsUlList.addEventListener('click', (e) => {
        e.target.style.color = 'lightblue'
    })
};

const breedDropdown = () => {
    const breedSelect = document.querySelector('#breed-dropdown');
    const breedsUlList = document.getElementById('dog-breeds');
    breedSelect.addEventListener('change', (e) => {
        // console.log(e.target.value);  
        const filterLetter = e.target.value
        const filteredBreedsList = allBreedsList.filter(name => name.charAt(0) === filterLetter);
        // console.log(filteredBreedsList)
        removeAllChildNodes(breedsUlList);
        filteredBreedsList.forEach(breedName => {
            addBreedName(breedName)
        })
    });
}

const removeAllChildNodes = (ulList) => {
    while (ulList.firstChild) {
        ulList.removeChild(ulList.firstChild);
    }
}
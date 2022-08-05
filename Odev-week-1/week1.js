
const WriteToScreen = (Data = []) => {
    //console.log(Data);
    const PhotosContainer = document.querySelector('.photos');
    let Elements = '';
    Data.forEach(Photo => {
        Elements += `
            <div class="photo">
                <h3>${Photo.title}</h3>
                <img src="${Photo.thumbnailUrl}" alt="" >
                <button onclick="this.parentElement.style.display = 'none';">Delete</button>
            </div>
        `;
    });
    
    PhotosContainer.innerHTML = Elements;
    
};

const GetPhotos = async () => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=50');
        WriteToScreen(res.data)
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};
GetPhotos();


//https://via.placeholder.com/150/92c952
// Form a girilen datayı ekrana ekleme
const form = document.querySelector('.form');
// console.log(form)
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const Title = document.getElementById('title').value;
    const ImgUrl = document.getElementById('ImgUrl').value;
    const NewElement=`
        <div class="photo">
            <h3>${Title}</h3>
            <img src="${ImgUrl}" alt="" >
            <button onclick="this.parentElement.style.display = 'none';">Delete</button>
        </div>
    `;
        const PhotosContainer = document.querySelector('.photos');
        PhotosContainer.innerHTML += NewElement;
        alert(Title + " Eklendi");
});

const SearchFilter = () =>{
    let Input = document.querySelector(".SearchInput");
    let Filter = Input.value.toUpperCase();
    let ul = document.querySelector(".photos");
    let div = ul.getElementsByTagName("div");
    for (let i = 0; i < div.length; i++) {
        let element = div[i].getElementsByTagName("h3")[0];
        let TxtValue = element.textContent || a.innerHTML;
        if(TxtValue.toUpperCase().indexOf(Filter)>-1){
            div[i].style.display ="";
        }else{
            div[i].style.display ="none";
        }
    }
};
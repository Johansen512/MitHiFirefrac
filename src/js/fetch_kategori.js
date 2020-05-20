document.addEventListener("DOMContentLoaded", function (){

    fetch("/assets/data/fetch_kategori.json")
    .then(response => response.json())
    .then(data => {

        let kategoriSection = document.querySelector('.kategori');
        
        data.kategori.forEach(kategori => {

            let section = document.createElement('section');
            section.setAttribute('data-category', kategori.name);
            section.innerHTML = `  
            <div class="kategori__box" style="background-image: url('/assets/img/${kategori.image_folder}/${kategori.image}" alt="${kategori.name}');"> 
            <a class="kategori__link" href="/shop_kategorier?category=${kategori.category}">${kategori.name}
            </a></div>
            `;
            
            kategoriSection.appendChild(section);
        });
    })
})
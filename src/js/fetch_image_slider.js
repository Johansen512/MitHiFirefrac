document.addEventListener("DOMContentLoaded", function () {
    fetch("/assets/data/product_data_dummy.json")
        .then(response => response.json())
        .then(data => {

            let sliderSection = document.querySelector('.image-slider__container_image');
            data.products.forEach(products => {

                let section = document.createElement('section');
                section.className = "mySlides";
                section.setAttribute('data-id', products.id);
                section.innerHTML = ` 
                <div class="image-slider__container">
                        <div class="image-slider__text">
                        ${products.name}
                    </div>
                        <div class="fade">
                        <a href="/shop_kategorier?id=${products.name}">
                        <img src="/assets/img/produktbilleder/${products.image_folder}/${products.image}" class="pics" alt="${products.name}" /></a>
                        </div>
                </div>
            `;
                sliderSection.appendChild(section);
            });
        })
        .then(() => {

            var slideIndex = 0;
            showSlides();

            let prev = document.querySelector("#prev");
            let next = document.querySelector("#next");

            prev.addEventListener("click", nextSlide);
            function nextSlide() {
                plusSlides(-1);
            }

            next.addEventListener("click", nextSlide);
            function nextSlide() {
                plusSlides(1);
            }

            var slides, timer;

            function showSlides() {
                var i;
                slides = document.getElementsByClassName("mySlides");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) { slideIndex = 1 }
                slides[slideIndex - 1].style.display = "block";

                timer = setTimeout(showSlides, 4000); // antal milisekunder pr. billede
            }

            function plusSlides(position) {
                //stopper timeren ved klik
                clearTimeout(timer);
                slideIndex += position;
                if (slideIndex > slides.length) { slideIndex = 1 }
                else if (slideIndex < 1) { slideIndex = slides.length }
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }

                slides[slideIndex - 1].style.display = "block";

                // laver en ny timer
                timer = setTimeout(showSlides, 4000);
            }

            function currentSlide(index) {
                //stopper timeren ved klik
                clearTimeout(timer);
                if (index > slides.length) { index = 1 }
                else if (index < 1) { index = slides.length }
                //sæt slideIndex med index af funktionen
                slideIndex = index;
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }

                slides[index - 1].style.display = "block";

                // laver en ny timer
                timer = setTimeout(showSlides, 4000);
            }

        })

});
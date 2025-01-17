const modal = document.querySelector(".modal-background");
modal.addEventListener("click", (e) => {
    if (e.target.className === "modal-background")
        modal.classList.add("hide");
});







fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    //    console.log(data)
    data.forEach(function (oneCat) {

        const a = document.createElement("a");
        a.setAttribute("href", `#${oneCat}`)
        a.textContent = oneCat;
        document.querySelector("nav>ul>li").appendChild(a);


        const section = document.createElement("section");
        section.id = oneCat;
        section.classList.add("menu")
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);

    })
    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}


function showData(jsonData) {
    console.log(jsonData);
    jsonData.forEach(showSingleDish);
}


function showSingleDish(dish) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h3").textContent = dish.name;
    clone.querySelector(".description").textContent = dish.shortdescription;

    //    clone.querySelector(".fullPrice").textContent = dish.price;

    if (dish.discount) { //on sale

        clone.querySelector(".fullPrice").textContent = dish.price;

        const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);

        clone.querySelector(".fullPrice").textContent = newPrice;

        clone.querySelector(".discountPrice").textContent = dish.price

    } else { //not on discount
        clone.querySelector(".discountPrice").remove()
        clone.querySelector(".discount").remove()
        clone.querySelector(".fullPrice").textContent = dish.price
    }

    clone.querySelector("button").addEventListener("click", () => {

        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });






    const imageName = dish.image; // this would be dynamic
    //    console.log(imageName)

    const base = "https://kea-alt-del.dk/t5/site/imgs/";

    const smallImg = base + "small/" + imageName + "-sm.jpg";

    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;




    //    console.log(`#${dish.category}`)


    function showDetails(data) {
        const newPrice = Math.round(data.price - data.price * data.discount / 100);


        modal.querySelector(".modal-name").textContent = data.name;

        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.querySelector(".modal-price").textContent = newPrice;

        modal.querySelector(".modal-alcohol").textContent = data.alcohol;

        if (dish.alcohol) {
            modal.querySelector(".modal-alc").classList.remove("hide")

            console.log("Alcohol")
        }
        else {
            modal.querySelector(".modal-alc").classList.add("hide")
        }


        modal.querySelector(".modal-image").src = mediumImg;
        modal.classList.remove("hide");

        if (data.longdescription == false) {
            modal.querySelector(".modal-description").textContent = data.shortdescription;
        }


    }





    if (dish.soldout == true) {

        //        console.log("Sold Out");

        clone.querySelector("p").classList.add("soldOut");

        clone.querySelector(".course h3").classList.add("soldOut");

        clone.querySelector(".course button").classList.add("soldOut");

        clone.querySelector(".course .menuImg").classList.add("soldOut");

        clone.querySelector(".course .price").classList.add("soldOut");
        clone.querySelector(".soldOutImg").classList.remove("hide");
    }



    if (dish.vegetarian == true) {
        //        console.log("Vegetarian!");

        clone.querySelector(".veggieImg").classList.remove("hide");

        if (dish.category == "drinks") { // no veggie symbol on drinks
            clone.querySelector(".veggieImg").classList.add("hide");
        }

        if (dish.soldout == true & dish.vegetarian == true)
            clone.querySelector(".veggieImg").classList.add("soldOut");

    }








    document.querySelector(`#${dish.category}`).appendChild(clone)

    //    const parent = document.querySelector(".menu");
    //    parent.appendChild(clone);



}



// To the top

const myBtn = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myBtn.style.display = "block";
    } else {
        myBtn.style.display = "none";
    }
    if (modal.classList.contains("hide") == false) {
        myBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

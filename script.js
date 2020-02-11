fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    //    console.log(data)
    data.forEach(function (oneCat) {
        const section = document.createElement("section");
        section.id = oneCat;
        section.classList.add("menu")
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
        getProducts();
    })
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

    } else { //not on discount
        clone.querySelector(".discountPrice").remove()
        clone.querySelector(".fullPrice").textContent = dish.price
    }








    const imageName = dish.image; // this would be dynamic
    //    console.log(imageName)

    const base = "https://kea-alt-del.dk/t5/site/imgs/";

    const smallImg = base + "small/" + imageName + "-sm.jpg";

    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;







    console.log(`#${dish.category}`)
    document.querySelector(`#${dish.category}`).appendChild(clone)

    //    const parent = document.querySelector(".menu");
    //    parent.appendChild(clone);



}

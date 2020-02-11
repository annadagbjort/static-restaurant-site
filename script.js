fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showData(data)
    })



function showData(jsonData) {

    jsonData.forEach(showSingleDish);
    console.log(jsonData);


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
    console.log(imageName)

    const base = "https://kea-alt-del.dk/t5/site/imgs/";

    const smallImg = base + "small/" + imageName + "-sm.jpg";

    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";

    clone.querySelector("img").src = smallImg;









    const parent = document.querySelector(".menu");
    parent.appendChild(clone);



}

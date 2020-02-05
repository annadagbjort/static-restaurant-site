const pop = document.getElementsByClassName("popup");

const image = document.getElementsByClassName("imgCourse")

const span = document.getElementsByClassName("close")[0];

image.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }


console.log(pop)

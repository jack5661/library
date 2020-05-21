const modal = document.querySelector("#modal");
const form = modal.querySelector("form");
form.reset();

const close = document.querySelector("#close");
close.onclick = hide_modal;

const add_book = document.querySelector("#add_book");
add_book.onclick = () => {
    modal.style.display = "block";
};

const close_btn = document.querySelector("#close_btn");
close_btn.onclick = hide_modal;

window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
          form.reset();
    }
}); 

function hide_modal() {
    modal.style.display = "none";
    form.reset();
}

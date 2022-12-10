let photoContainer = document.querySelector('.photo-container .row');
let allSections = document.querySelectorAll('main');
let allLis = document.querySelectorAll('.navbar ul li a');
console.log(allLis);



/****/

function activeMenu() {
       let len = allSections.length;
       while (--len && window.scrollY + 59 < allSections[len].offsetTop) { }
       allLis.forEach((li) => li.classList.remove('active'));
       allLis[len].classList.add('active');
}
window.addEventListener('scroll', activeMenu);



function scrollup() {
       const scrollup = document.getElementById('scroll-up');

       if (this.scrollY >= 200) scrollup.classList.add('show-scroll');
       else scrollup.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollup);


////////////////

onload = async function () {
       await read();

       const showDetailsModal = document.querySelectorAll(".main-photo");
       showDetailsModal.forEach((item) => {
              item.addEventListener("click", () => {
                     document.getElementById("detail-modal").style.display = "block";

                     document.getElementById("fashion_image").src = item.querySelector(".img-fluid").src;
                     document.getElementById("fashion_name").value = item.querySelector(".cardName").innerHTML;
                     document.getElementById("fashion_price").value = item.querySelector(".cardPrice").innerHTML;
                     document.getElementById("fashion_category").value = item.querySelector(".cardCateg").innerHTML;

                     var closeButton = document.getElementById("close_detail_modal");
                     var deleteBtn = document.getElementById("delete_detail_modal");
                     var updateBtn = document.getElementById("update_detail_modal");

                     closeButton.addEventListener("click", () => { document.getElementById("detail-modal").style.display = "none"; });
                     deleteBtn.addEventListener("click", () => { readToDelete(item.querySelector(".cardName").innerHTML) });
                     updateBtn.addEventListener("click", () => { readToUpdate(item.querySelector(".cardName").innerHTML); });
              });
       });
}

const showAddModal = document.getElementById("show-modal");
showAddModal.addEventListener("click", () => {
       var modal = document.getElementById("modal__add");
       modal.style.display = "block";

       var closeModal = document.getElementById("close_modal");
       var createButton = document.getElementById("createbtn");

       closeModal.addEventListener("click", () => {
              modal.style.display = "none";
       });

       createButton.addEventListener("click", () => {
              create();
              modal.style.display = "none";
       });
})


// func

async function read() {
       var fashion = Parse.Object.extend("fashions");

       query = new Parse.Query(fashion);

       let result = await query.find();
       for (let index = 0; index < result.length; index++) {
              element = result[index];

              let main = document.createElement('div');
              main.className = 'col-md-4 col-lg-3 main-photo';
              main.setAttribute('data-name', element.get('name'));
              main.setAttribute('data-category', element.get('category'));
              main.setAttribute('data-price', element.get('price'));

              let name = document.createElement('div');
              name.className = "cardName";
              name.innerHTML = element.get('name');
              let category = document.createElement('p');
              category.className = "cardCateg";
              category.style.display = "none";
              category.innerHTML = element.get('category')
              let price = document.createElement('p');
              price.className = "cardPrice";
              price.style.display = "none";
              price.innerHTML = element.get('price');

              let img = document.createElement('img');
              img.src = element.get("image");
              img.className = 'img-fluid';
              main.appendChild(img);
              main.appendChild(name);
              main.appendChild(category);
              main.appendChild(price);
              photoContainer.appendChild(main);
       }
}

function create() {
       var fashion = Parse.Object.extend("fashions");
       const newFashion = new fashion();

       var textName = document.getElementById("name").value;
       var textCategory = document.getElementById("category").value;
       var textPrice = document.getElementById("price").value;
       var fileUploadControl = document.getElementById("imageFile");

       // fileUploadControl.addEventListener("change", (target) => {
       //        console.log(target.files.length);
       // });

       if (fileUploadControl.files.length > 0) {

              var file = fileUploadControl.files[0];
              console.log("file uploaded " + file.name);
              const parseFile = new Parse.File("image.jpg", file);

              parseFile.save().then((img) => {
                     console.log("file parse  " + img._url);
                     console.log("saving...");

                     newFashion.set("name", textName);
                     newFashion.set("price", textPrice);
                     newFashion.set("category", textCategory);
                     newFashion.set("image", img._url);

                     newFashion.save().then((res) => {
                            console.log("created Successfully");
                     });
              })
       }
}

function readToUpdate(name) {
       var fashion = Parse.Object.extend("fashions");

       query = new Parse.Query(fashion);
       query.equalTo("name", name);
       query.first().then(function (fash) {
              if (fash) {
                     fash.set("price", document.getElementById("fashion_price").value);
                     fash.set("category", document.getElementById("fashion_category").value);
                     fash.set("price", document.getElementById("fashion_price").value);
                     fash.save();
              }
       });
       document.getElementById("detail-modal").style.display = "none";
}

function readToDelete(name) {
       var fashion = Parse.Object.extend("fashions");
       query = new Parse.Query(fashion);
       query.equalTo("name", name);
       query.first().then(function (f) { if (f) { f.destroy(); } });
       document.getElementById("detail-modal").style.display = "none";
}
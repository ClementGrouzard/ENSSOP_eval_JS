const taille = document.getElementById("taille")
const capacity = document.getElementById("capacity")
let apiKey = "Your API key right here"


taille.addEventListener("click", function (ev) {
    if (ev.target === taille) {
        if (capacity.style.display == "none") {
            capacity.style.display = "flex";
            brand.style.display = "none";
            color.style.display = "none";
        } else {
            capacity.style.display = "none";
        }
    }
});

const marque = document.getElementById("marque");
const brand = document.getElementById("brand");

marque.addEventListener("click", function (ev) {
    if (ev.target === marque) {

        if (brand.style.display == "none") {
            brand.style.display = "flex";
            color.style.display = "none";
            capacity.style.display = "none";
        } else {
            brand.style.display = "none";
        }
    }
});

const couleur = document.getElementById("couleur");
const color = document.getElementById("color");

couleur.addEventListener("click", function (ev) {
    if (ev.target === couleur) {

        if (color.style.display == "none") {
            color.style.display = "flex";
            brand.style.display = "none";
            capacity.style.display = "none";
        } else {
            color.style.display = "none";
        }
    }
});

const loupe = document.getElementById("loupe")
const search = document.getElementById("search")

loupe.addEventListener("click", function () {
    search.style.display = "block";
})

const filMod = document.getElementById("filMob");
const nav = document.getElementById("nav");

filMod.addEventListener("click", function () {
    if (nav.style.display == "none") {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
})

//API product

let keyPic = document.getElementById("product-pic")
let keyPrice = document.getElementById("product-price")
let productList = document.getElementById("content")
// let apiKey = "API key right here"

const params = new URLSearchParams()
//affichage des articles
 axios.get("http://localhost:3000/api/products",).then(function (response) {
    console.log(response.data.results)
    for (let keyPics of response.data.results) {
        params.set("key_id", keyPics.id) // permet d'assigner une URL différente à chaque lien produit grâce à la variable params
        productList.innerHTML += `<div class="produit"><a href= "page_produit.html?${params}"><img id="product-pic" src="${keyPics.picture}" alt="usb drive"></a>
        <figure>${keyPics.name}, ${keyPics.price / 100} € </figure>
        <button id="btnPanier${keyPics.id}" >Acheter <i class="fas fa-shopping-basket"></i></button>
    </div>`
        setTimeout(function () {
            const btnPanier = document.getElementById(`btnPanier${keyPics.id}`)
            console.log(btnPanier)
            btnPanier.addEventListener("click", function () {
                axios.post("http://localhost:3000/api/cart", {
                    product: keyPics.id,
                    qty: 1

                }, {
                    headers: {
                        "Authorization": apiKey
                    }
                })

            })

        },0)
    }
})  


//aff filtre couleur
axios.get("http://localhost:3000/api/filters").then(function (response) {
    for (let colors of response.data.color) {
        color.innerHTML +=
            `<label for="Noir"><input type="checkbox" name="Couleur" id="{">${colors.name}</label>`
    }
})

//aff filtre taille
axios.get("http://localhost:3000/api/filters").then(function (response) {
    for (let capacitys of response.data.size) {
        capacity.innerHTML +=
            `<label for="4Go"><input type="checkbox" name="Capacity" id="4Go">${capacitys.name}</label>`

    }
})

//aff filtre marque
axios.get("http://localhost:3000/api/filters").then(function (response) {
    for (let brands of response.data.brand) {
        brand.innerHTML +=
            `<label for="Samsung"><input type="checkbox" name="Marque" id="Samsung">${brands.name}</label>`

    }
})


//Rechercher un produit

search.addEventListener("keypress", function(val){

    if(val.code == "Enter"){
           const  txtRechercher = search.value
           axios.get("http://localhost:3000/api/products",{params:{search :txtRechercher}}).then(function (response) {
               productList.innerHTML = ""
            for (let keyPics of response.data.results) {
                productList.innerHTML += `<div class="produit"><img id="product-pic" src="${keyPics.picture}" alt="usb drive">
                <figure>${keyPics.name}, ${keyPics.price / 100} € </figure>
                <button id="btnPanier${keyPics.id}">Achète ! <i class="fas fa-shopping-basket"></i></button>
            </div>`
            setTimeout(function () {
                const btnPanier = document.getElementById(`btnPanier${keyPics.id}`)
                console.log(btnPanier)
                btnPanier.addEventListener("click", function () {
                    axios.post("http://localhost:3000/api/cart", {
                        product: keyPics.id,
                        qty: 1
    
                    }, {
                        headers: {
                            "Authorization": apiKey
                        }
                    })
    
                })
    
            },0)
            }
           })

    }

})
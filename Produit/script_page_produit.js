// Page produit

const productName = document.getElementById("nom_du_produit")
const productPic = document.getElementById("image_du_produit")
const productDetails = document.getElementById("details_du_produit")
const productBrand = document.getElementById("marque_du_produit") // contient également le prix (cf ligne 17)


const params = new URLSearchParams(window.location.search)
const id = params.get("key_id")

axios.get(`http://localhost:3000/api/products/${id}`).then(function(res1){
    console.log(res1.data)
    productName.innerText = res1.data.name
    productPic.src = res1.data.picture
    productDetails.innerText = res1.data.description
    productBrand.innerText = res1.data.brand + ", "+res1.data.price/100 + " €"
    
})

  

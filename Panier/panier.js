/* axios.get("http://localhost:3000/api/filters").then(function (response) {
    for (let brands of response.data.brand) {
        brand.innerHTML =
`<article><img src="../ENSSOP/48996039.jpg" alt=""><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p><button class="btnSup">Supprimer</button><form action=""><label for="quantity">Qty:</label><select name="quantity" id="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></form><div class="prixPanier">Prix: <span class="prix">49,99</span>€
            </div>

        </article>`
    }
}) */

let apiKey = "Your API key right here"

const cartList = document.getElementById("panier")

axios.get("http://localhost:3000/api/cart",
{
    headers:{
        "x-api-key": apiKey
    }

}).then(function(res2){
    console.log(res2)
    for(let item of response.data.results){
    cartList.innerHTML += `<article>
    <img src= ${item.picture} alt="">

    <p>${item.description}</p>

    <button class="btnSup">Supprimer</button>

    <form action="">
        <label for="quantity">Qty:</label>
        <select name="quantity" id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </form>`
    }
})

/* const poubelle = document.getElementsByClassName("btnSup")
poubelle.addEventListener("click", function(){
    axios.put("http://localhost:3000/api/cart",
    {
        headers: {
            "x-api-key": apiKey
        },
        body: {
            "product": axios.get("http://localhost:3000/api/product")
            "qty": 0
        } 
    }).then(function(res1){
        
    })
})
 */
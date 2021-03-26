let $productoCaja = document.querySelector('.product-box');
let $precio = document.querySelector('#price');
let $imagen = document.querySelector('.product-box_image');
let $article = document.querySelector('.product-box_data');
let $boton = document.querySelector('.coso')







fetch('http://localhost:3000/api/products/all')
.then(result => result.json())
.then(result => {
    let producto = result.data[0]
    console.log(producto.imagenes[0].name)
    $imagen.innerHTML += `<img src='/images/productos/${producto.imagenes[0].name}'>  `
    $article.innerHTML += `<h2 class="precio">${producto.price}</h2>`
    $boton.innerHTML += `<a href="/product/${producto.id}">detalles</a>`
})
.catch(error => console.log(error))
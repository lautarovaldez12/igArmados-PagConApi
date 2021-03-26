
const fetch = require('node-fetch')

module.exports = {
    index: (req, res) => {
        
        fetch('http://localhost:3000/api/products/all')
            .then(res => res.json())
            .then(json => {

                let productos = json.data

                let destacados = productos.filter(producto => producto.category_id == 1)
                let novedades = productos.filter(producto => producto.category_id = 2)
                res.render("index", {
                    title: "IG-Armados",
                    destacados,
                    novedades
                })
                
               
            }).catch(error => console.log(error))

    },
    contact: (req, res) => {
        res.render("contacto", {
            title: "contacto"
        })
    }


}



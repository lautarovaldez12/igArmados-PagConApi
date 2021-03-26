const { json, response } = require('express');
const { validationResult } = require('express-validator');
const fetch = require('node-fetch')


module.exports = {
    index: (req, res) => {
        
        fetch('http://localhost:3000/api/products/all')
            .then(res => res.json())
            .then(json => {

                let productos = json.data

               
                res.render("admin/productoLista", {
                    title: "Lista de productos",
                    productos
                })
                
               
            }).catch(error => console.log(error))
    },

    cargaProducto: (req, res) => {

        let categorias = fetch('http://localhost:3000/api/categories/all');
        let marcas = fetch('http://localhost:3000/api/marks/all');
        let componentes = fetch('http://localhost:3000/api/components/all');
        let garantia = fetch('http://localhost:3000/api/guarantees/all');

        Promise.all([categorias,marcas,componentes,garantia])
        .then(async([categorias,marcas,componentes,garantia]) => {
        
            const category = await categorias.json();
            const brand = await marcas.json();
            const component = await componentes.json();
            const guarantee = await garantia.json();

            return [category,brand,component,guarantee] 

        })
        .then(result => {

            let categorias = result[0].data
            let marcas = result[1].data
            let componentes = result[2].data
            let garantias = result[3].data

            return res.render("admin/cargaProducto", {
                title: "Edicion de producto",
                categorias,
                componentes,
                garantias,
                marcas,
            })
            
        }).catch(error => console.log(error))

    },
    storeProducto: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {/* si no hay errores */
            
            const { title, price, insale, garantia, component, mark, category, model, stock, description, features } = req.body;

            const body = {
                image : (req.files[0]) ? req.files[0].filename : "default-image.png",
                title,
                price,
                insale,
                garantia,
                component,
                mark,
                category,
                model,
                stock : +stock,
                description,
                features
            }

            fetch('http://localhost:3000/api/products/create',{
                method : 'post',
                body : JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },

            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                res.redirect('/admin')
        
            }).catch(error => console.log(error))


            
        } else{
            let categorias = fetch('http://localhost:3000/api/categories/all');
            let marcas = fetch('http://localhost:3000/api/marks/all');
            let componentes = fetch('http://localhost:3000/api/components/all');
            let garantia = fetch('http://localhost:3000/api/guarantees/all');
    
            Promise.all([categorias,marcas,componentes,garantia])
            .then(async([categorias,marcas,componentes,garantia]) => {
            
                const category = await categorias.json();
                const brand = await marcas.json();
                const component = await componentes.json();
                const guarantee = await garantia.json();
    
                return [category,brand,component,guarantee] 
    
            })
            .then(result => {
    
                let categorias = result[0].data
                let marcas = result[1].data
                let componentes = result[2].data
                let garantias = result[3].data
    
                return res.render("admin/cargaProducto", {
                    title: "Edicion de producto",
                    categorias,
                    componentes,
                    garantias,
                    marcas,
                    errores : errors.mapped()

                })
                
            }).catch(error => console.log(error))
         

        }

    },

    detalleProducto: (req, res) => {


        /*
        let categorias = db.Categorys.findAll();
        let componentes = db.Components.findAll();
        let garantias = db.Guarantees.findAll();
        let marcas = db.Marks.findAll();

        let producto = db.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { association: 'categoria' },
                { association: 'componente' },
                { association: "marca" },
                { association: "imagenes" },
                { association: "garantia" }
            ]
        })
        Promise.all([categorias, componentes, garantias, marcas, producto])
            .then(([categorias, componentes, garantias, marcas, producto]) => {
                return res.render("admin/productoDetalle", {
                    title: "Detalle",
                    producto,
                    categorias,
                    componentes,
                    garantias,
                    marcas,
                });
            })
            .catch(error => res.send(error))*/

    },
    editarProducto: (req, res) => {
        
        let producto = fetch('http://localhost:3000/api/products/' + req.params.id);
        let categorias = fetch('http://localhost:3000/api/categories/all');
        let marcas = fetch('http://localhost:3000/api/marks/all');
        let componentes = fetch('http://localhost:3000/api/components/all');
        let garantia = fetch('http://localhost:3000/api/guarantees/all')

        Promise.all([producto,categorias,marcas,componentes,garantia])
        .then(async([producto,categorias,marcas,componentes,garantia]) => {
           
            const product =  await producto.json();
            const category = await categorias.json();
            const brand = await marcas.json();
            const component = await componentes.json();
            const guarantee = await garantia.json();

            return [product,category,brand,component,guarantee]
            

        })
        .then(result => {

            let producto = result[0].data
            let categorias = result[1].data
            let marcas = result[2].data
            let componentes = result[3].data
            let garantias = result[4].data

            return res.render("admin/editarProducto", {
                title: "Edicion de producto",
                producto,
                categorias,
                componentes,
                garantias,
                marcas,

            })
            
        }).catch(error => console.log(error))


    },
    actualizarProducto: (req, res) => {

        let errors = validationResult(req);
        if (errors.isEmpty()) {

            const { title, price, insale, garantia, component, mark, category, model, stock, description, features } = req.body;

            const body = {
                image : (req.files[0]) ? req.files[0].filename : "default-image.png",
                title,
                price,
                insale,
                garantia,
                component,
                mark,
                category,
                model,
                stock : +stock,
                description,
                features
            }

            fetch('http://localhost:3000/api/products/edit/' + req.params.id,{
                method : 'put',
                body : JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },

            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                res.redirect('/admin')
        
            }).catch(error => console.log(error))

        }else {
            console.log(errors)
            let producto = fetch('http://localhost:3000/api/products/' + req.params.id);
            let categorias = fetch('http://localhost:3000/api/categories/all');
            let marcas = fetch('http://localhost:3000/api/marks/all');
            let componentes = fetch('http://localhost:3000/api/components/all');
            let garantia = fetch('http://localhost:3000/api/guarantees/all')

            Promise.all([producto,categorias,marcas,componentes,garantia])
            .then(async([producto,categorias,marcas,componentes,garantia]) => {
            
                const product =  await producto.json();
                const category = await categorias.json();
                const brand = await marcas.json();
                const component = await componentes.json();
                const guarantee = await garantia.json();

                return [product,category,brand,component,guarantee]
                

            })
            .then(result => {

                let producto = result[0].data
                let categorias = result[1].data
                let marcas = result[2].data
                let componentes = result[3].data
                let garantias = result[4].data

                return res.render("admin/editarProducto", {
                    title: "Edicion de producto",
                    producto,
                    categorias,
                    componentes,
                    garantias,
                    marcas,
                    errores : errors.mapped()

                })
                
            }).catch(error => console.log(error))
            
        }

    },
    borrarProducto: (req, res) => {
        
        fetch('http://localhost:3000/api/products/delete/' + req.params.id)
        .then(result => result.json())
        .then(result => {
            return res.redirect("/admin")


        }).catch(error => res.send(error))
     




    }
}
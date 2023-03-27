const express = require('express');
const app = express();
app.use(express.json())

const products = [
    { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
    { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
    { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
    { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
    { id: 5, nombre: 'Skin Valorant', precio: 120 },
    { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
];

// Crear endpoint para poder crear un producto nuevo
app.post('/products', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send('El nombre y el precio son obligatorios');
    }
    const newProduct = {
        id: products.length + 1,
        nombre,
        precio
    };
    products.push(newProduct);
    res.json(newProduct);
});


// // Crear endpoint para poder actualizar un producto

app.put("/id/:id", (req, res) => {
    const found = products.some((product) => product.id == req.params.id); //devuelve true o false
    if (found) {
        products.forEach((product) => {
            if (product.id == req.params.id) {
                (product.nombre = req.body.nombre), (product.precio = req.body.precio);
                res.send(product);
            }
        });
    } else {
        res.status(404).send(`Product with id ${req.params.id} not found`);
    }
});

// //  Crear endpoint para poder eliminar un producto

app.delete('/products/:id', (req, res) => {
    const found = products.some((product) => product.id == req.params.id); //devuelve true o false
    if (found) {
        res.send(products.filter((product) => product.id !== +req.params.id)); //+ convierte req.params.id en un numero
    } else {
        res.status(404).send('Product not found');
    }
});
// // Crear filtro por precio de producto

// app.get('/products', (req, res) => {
//     const filterPrecio = req.query.precio;

//     let productosFiltrados = products;

//     if (filterPrecio) {
//       productosFiltrados = products.filter(
//         (producto) => producto.precio == filterPrecio
//       );
//     }

//     res.json({ description: 'Productos filtrados por precio', items: productosFiltrados });
//   });

// // Crear filtro que muestre los productos con un precio entre 50 y 250.

app.get('/products', (req, res) => {
    const filterRango = req.query.rango;

    let productosFiltrados = products;

    if (filterRango) {

        productosFiltrados = products.filter(
            (producto) => producto.precio >= 50 && producto.precio <= 250
        );
    }

    res.json({ description: 'Productos filtrados por rango de precio', items: productosFiltrados });
});

// // Crear un filtro que cuando busque en postman por parámetro el id de un producto me devuelva ese producto

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const producto = products.find((producto) => producto.id == id);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Product not found');
    }
});

// // Crear un filtro que cuando busque en postman por parámetro el nombre de un producto me devuelva ese producto

app.get('/products/search/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const producto = products.find((producto) => producto.nombre === nombre);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen("8080", () => {
    console.log("Servidor levantado en el puerto 8080");
});

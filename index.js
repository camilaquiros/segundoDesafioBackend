const fs = require('fs')

class ProductManager {
    products = [];
    product = Product;
    constructor(path){
        this.path = path;
    }

    cargaDelArchivo(){
        const database = fs.readFileSync(this.path, "utf-8");
        const databaseParsed = JSON.parse(database)
        return databaseParsed;
    }

    getProducts() {
        const database = this.cargaDelArchivo();
        if(database.length === 0) return console.log("No hay productos")
        else console.log(database)
    }

    addProduct(product) {
        const database = this.cargaDelArchivo();
        if (database.find((p) => p.code == product.code)){ 
            console.log(`Producto ${product.title} ya existente`);
        } else{
            product.id = database.length + 1;
            database.push(product);
            fs.writeFileSync(this.path, JSON.stringify(database))
        }
    }

    getProductsById(productId) {
        const database = this.cargaDelArchivo();
        const product = database.find((search) => search.id == productId)
        if(product){
            return console.log(product)
        } else{
            return console.log('Producto no encontrado')
        }
    }

    updateProduct(productUpdate, {...productNew}){
        const database = this.cargaDelArchivo();
        this.deleteProduct(productUpdate);
        const product = database.find((search) => search.id == productUpdate)
        if(product){
            this.deleteProduct(productUpdate);
            const databaseNueva = this.cargaDelArchivo();
            let productsModified = [{ ...productNew, id: productUpdate}, ...databaseNueva]
            fs.writeFileSync(this.path, JSON.stringify(productsModified))
        } else{
            return console.log('Producto no encontrado')
        }
    }

    deleteProduct(product){
        const database = this.cargaDelArchivo();
        if(database.find((search) => search.id == product)){
            const databaseNueva = database.filter((search) => search.id !== product)
            fs.writeFileSync(this.path, JSON.stringify(databaseNueva))
        } else{
            return console.log('Producto no encontrado')
        }
    }
}

class Product extends ProductManager {
    contructor(title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const nuevoProducto = new ProductManager('./database.json');

const product1 = {
    title: 'celular',
    description: 'Lorem Ipsum',
    price: 1000,
    thumbnail: 'thumbnail',
    code: 'abc123',
    stock: 10
}

const product2 = {
    title: 'computadora',
    description: 'Lorem Ipsum',
    price: 5000,
    thumbnail: 'thumbnail',
    code: 'abc124',
    stock: 10
}

const product3 = {
    title: 'tablet',
    description: 'Lorem Ipsum',
    price: 3000,
    thumbnail: 'thumbnail',
    code: 'abc125',
    stock: 10
}

console.log(nuevoProducto.getProducts())

nuevoProducto.addProduct(product1);
nuevoProducto.addProduct(product2);
nuevoProducto.addProduct(product3);

console.log(nuevoProducto.getProducts())

// console.log(nuevoProducto.deleteProduct(2))
// console.log(nuevoProducto.deleteProduct(4))

// console.log(nuevoProducto.updateProduct(1,  
// {
// title: 'celular',    
// description: 'Lorem Ipsum',
// price: 7000,
// thumbnail: 'thumbnail',
// code: 'abc124',
// stock: 10}))
const fs = require('fs')

class ProductManager {
    // products = cargaDelArchivo();6
    product = Product;
    constructor(path){
        this.path = path;
    }

    guardarCambios() {
        fs.writeFileSync(path, JSON.stringify(products))
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
        const database = this.cargaDelArchivo();4
        if (this.getProducts().find((p) => p.code == product.code)){ 
            console.log(`Producto ${product.title} ya existente`);
        } else{
            product.id = this.getProducts().length + 1;
            this.products.push(product);
            this.guardarCambios();
        }
    }

    // getProductsById(product) {
    //     this.cargaDelArchivo();
    //     if(this.getProducts().find((search) => search.id == product)){
    //         return console.log(this.getProducts().find((search) => search.id == product))
    //     } else{
    //         return console.log('Producto no encontrado')
    //     }
    // }

    updateProduct(){

    }

    deleteProduct(){

    }
}

class Product extends ProductManager {
    contructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const nuevoProducto = new ProductManager('./database.json');

console.log(nuevoProducto.getProducts())

// nuevoProducto.addProduct(product1);
// nuevoProducto.addProduct(product2);
// nuevoProducto.addProduct(product3);

// console.log(nuevoProducto.getProducts())

// nuevoProducto.addProduct(product3SameCode);

// console.log(nuevoProducto.getProductsById(2))
// console.log(nuevoProducto.getProductsById(4))

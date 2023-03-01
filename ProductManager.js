const fs = require("fs")

class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
      this.path = "./productos.txt"
    }


  
    addProduct(product) {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("No fueron completados todos los campos");
        return;
      }
  
      if (this.products.find(p => p.code === product.code)) {
        console.log("Error: Ya existe un producto con el mismo codigo");
        return;
      }
  
      const newProduct = {
        id: this.nextId,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock
      };
      this.nextId++;
      this.products.push(newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.log("Error: Producto no encontrado");
        return;
      }
      return product;
    }

    updateProduct(id, updateFields) {
        const index = this.products.findIndex((p) => p.id === id);
      
        if (index === -1) {
          console.log("Error: Producto no encontrado :(");
          return;
        }
      
        const updatedProduct = { ...this.products[index], ...updateFields };
      
        this.products[index] = updatedProduct;
      
        fs.writeFile(this.path, JSON.stringify(this.products), (error) =>{
            if(error) return console.log('error');

            fs.readFile(this.path, 'utf-8', (error, resultado)=> {
                if(error) return console.log('error al leer');
                console.log(resultado)
            })
        });
      
        return updatedProduct;
      }

    deleteProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);
      
        if (index === -1) {
          console.log("Error: Producto no encontrado");
          return;
        }
      
        this.products.splice(index, 1);
      
        fs.writeFile(this.path, JSON.stringify(this.products), (error) =>{
            if(error) return console.log('error');

            fs.readFile(this.path, 'utf-8', (error, resultado)=> {
                if(error) return console.log('error al leer');
                console.log(resultado)
            })
        });
      }  
      
  }

  
  
  //TESTEO:
  
  
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripcion del producto 1",
    price: 9.99,
    thumbnail: "image1.png",
    code: "PROD1",
    stock: 10
  });
  
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripcion del producto 2",
    price: 19.99,
    thumbnail: "image2.png",
    code: "PROD2",
    stock: 5
  });
  
const products = productManager.getProducts();
console.log(products); 
  
const product = productManager.getProductById(2);
console.log(product); 
  
const nonExistentProduct = productManager.getProductById(3);
console.log(nonExistentProduct)

const update = productManager.updateProduct(1, {title: "nuevo titulo"})

const deleteProducts = productManager.deleteProduct(2)

import { constants, writeFile } from "node:fs";
import { readFile, access } from "node:fs/promises";

export class Msg {
  constructor(path) {
    this.path = path;
  }

  async verifiedArchive() {
    try {
      await access(this.path, constants.R_OK);
    } catch {
      writeFile(this.path, JSON.stringify([], null, 2), (err) => {
        !err && console.log("archivo creado!");
      });
    }
  }

  async lastId() {
    try {
      if (this.products.length === 0) {
        return 1;
      }
      let newId = this.products[this.products.length - 1];
      return newId.id + 1;
    } catch (err) {
      throw err.message
    }
  }

  async productExist(id) {
    const exist = this.products.some((res) => res.id == parseInt(id));
    return exist;
  }

  async getAll() {
    try {
        if(await readFile(this.path, "utf-8")!==[]){
            return this.products = JSON.parse(await readFile(this.path, "utf-8"))
        }
      return null
    } catch (err) {
      throw err.message
    }
  }

  async save(product) {
    try {
      await this.getAll();
      const newId = await this.lastId(this.products);
      product = { id: newId, ...product };
      this.products = [...this.products, product];
      writeFile(this.path, JSON.stringify(this.products, null, 2), (err) => {
        return this.products
      });
    } catch (err) {
      throw err.message
    }
  }

  async getById(id) {
    try {
      if (await this.productExist(id)) {
        return this.products.find((res) => res.id == parseInt(id));
      } else {
        return null;
      }
    } catch (err) {
      throw err.message
    }
  }

  async deleteById(id) {
    try {
      let i = 0;
      for (const producto of this.products) {
        if (producto.id == parseInt(id)) {
          this.products.splice(i, 1);
          writeFile(
            this.path,
            JSON.stringify(this.products, null, 2),
            (err) => {
              !err && console.log(`producto con id: ${id} eliminado!`);
            }
          );
          return;
        }
        i = i + 1;
      }
    } catch (err) {
      throw err.message
    }
  }

  async deleteAll() {
    try {
      writeFile(this.path, JSON.stringify([], null, 2), (err) => {
        !err && console.log(`el archivo fue limpiado con exito!`);
      });
    } catch (err) {
      throw err.message
    }
  }

}
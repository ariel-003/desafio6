export class Products {
    constructor() {
      this.products = [];
    }
    async get() {
      try {
        return this.products;
      } catch (error) {
        throw Error(error.message);
      }
    }
    async getById(id) {
      try {
        const product = this.products.find((res) => res.id === parseInt(id));
        if (product) {
          return product;
        }
      } catch (error) {
        throw Error(error.message);
      }
    }
    async lastId() {
      try {
        if (this.products.length === 0) {
          return 1;
        }
        let newId = this.products[this.products.length - 1];
        return newId.id + 1;
      } catch (error) {
        throw Error(error.message);
      }
    }
    async addProduct(product) {
      try {
        let newId = await this.lastId();
        this.products = [...this.products, { id: newId, ...product }];
        return this.products;
      } catch (error) {
        throw Error(error.message);
      }
    }
    async setProduct(product, id) {
      try {
        this.products.map((res) => {
          if (res.id == parseInt(id)) {
            (res.title = product.title),
              (res.price = product.price),
              (res.thumbnail = product.thumbnail);
          }
        });
        return true;
      } catch (error) {
        throw Error(error.message);
      }
    }
    async delProduct(id) {
      let i = 0;
      try {
        for (const product of this.products) {
          if (product.id === parseInt(id)) {
            this.products.splice(i, 1);
          }
          i = i + 1;
        }
      } catch (error) {
        throw Error(error.message);
      }
    }
  }
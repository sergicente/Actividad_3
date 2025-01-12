import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://jsonblob.com/api/1326974176178921472';
  private productos: IProduct[] = []

  // Método para cargar los productos desde la API
  async cargarProductosApi(): Promise<IProduct[]> {
    try {
      const response = await fetch(this.api);
      if (response.ok) {
        this.productos = await response.json();
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      this.productos = [];
    }
    return this.productos;
  }

  // Devuelve los productos almacenados en la lista.
  obtenerProductos() {
    return this.productos;
  }

  // Elimina un producto de la lista según su ID utilizando filter.
  eliminarProducto(event: string): void {
    this.productos = this.productos.filter(p => p._id !== event);
  }

  // Actualiza un producto de la lista
  actualizarProducto(productoActualizado: IProduct): void {
    this.productos.forEach((producto, indice) => {
      if (producto._id === productoActualizado._id) {
        this.productos[indice] = { ...productoActualizado };
      }
    });
  }

  // Agrega un nuevo producto a la lista.
  addProduct(nuevoProducto: IProduct): void {
    this.productos.push(nuevoProducto);
    console.log('Producto añadido:', nuevoProducto);
  }
}
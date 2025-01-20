import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://jsonblob.com/api/1330899915362197504';
  private productos: IProduct[] = []

  // Llama a la API en el constructor para cargar los productos al inicializar el servicio
  constructor() {
    this.cargarProductosApi();
    this.obtenerProductosFiltrados({});
  }

  async cargarProductosApi(): Promise<void> {
    try {
      const response = await fetch(this.api);
      if (response.ok) {
        this.productos = await response.json();
      } else {
        this.productos = [];
      }
    } catch {
      this.productos = [];
    }
  }

  // Devuelve los productos almacenados en la lista.
  obtenerProductos() {
    return this.productos;
  }

  // Elimina un producto de la lista según su ID utilizando filter.
  eliminarProducto(id: string): void {
    this.productos = this.productos.filter(p => p._id !== id);
  }

  // Actualiza un producto de la lista
  actualizarProducto(productoActualizado: IProduct): void {
    this.productos.forEach((producto, i) => {
      if (producto._id === productoActualizado._id) {
        this.productos[i] = { ...productoActualizado };
      }
    });
  }

  // Agrega un nuevo producto a la lista.
  addProduct(nuevoProducto: IProduct): void {
    this.productos.push(nuevoProducto);
  }


  // Aplica filtros y devuelve productos filtrados
  obtenerProductosFiltrados(filtros: any): IProduct[] {
    return this.productos.filter(producto => {
      return (
        // Si hay texto en el filtro, comprueba que el nombre del producto contenga el texto.
        (!filtros.nombre || producto.name.toLowerCase().includes(filtros.nombre.toLowerCase())) &&
        //  Comprueba que la categoría del producto coincida exactamente con la del filtro (si hay filtro).
        (!filtros.categoria || producto.category === filtros.categoria) &&
        // Comprueba que el precio del producto esté dentro del rango del filtro (si hay filtro).
        (!filtros.precioMin || producto.price >= filtros.precioMin) &&
        (!filtros.precioMax || producto.price <= filtros.precioMax) &&
        // Si el filtro está en undefined, significa que queremos mostrar todos los productos (vista por defecto)
        // Por lo contrario si el filtro es true o false, solo pasa los productos que coincidan con el estado.
        (filtros.activo === undefined || producto.active === filtros.activo)
      );
    });
  }


}
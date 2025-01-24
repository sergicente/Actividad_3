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
    let resultado = this.productos;

    // Filtrar por nombre si el filtro existe
    if (filtros.nombre) {
      resultado = resultado.filter(producto => 
        producto.name.toLowerCase().includes(filtros.nombre.toLowerCase())
      );
    }
  
  // Filtrar por rango de precio si los filtros existen
  if (filtros.precioMin !== undefined) {
    resultado = resultado.filter(producto => producto.price >= filtros.precioMin);
  }
  
  if (filtros.precioMax !== undefined) {
    resultado = resultado.filter(producto => producto.price <= filtros.precioMax);
  }
  
  // Filtrar por estado activo si el filtro existe
  if (filtros.activo !== undefined) {
    resultado = resultado.filter(producto => producto.active === filtros.activo);
  }
  
    // Devolver siempre un array, aunque esté vacío
    return resultado;
  }


}
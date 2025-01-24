import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from "../product-filter/product-filter.component";
import { ProductFormComponent } from "../product-form/product-form.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {


  productos: IProduct[] = [];
  mostrarModal: boolean = false;
  modalNuevoProducto: boolean = false;
  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  productoSeleccionado: IProduct;
  filtros: any = { activo: false };

  // Constructor que inyecta el servicio ProductService
  constructor(private productService: ProductService) {
    this.productoSeleccionado = this.generarProductoVacio();
  }

  // Carga de forma asíncrona los productos desde la API a través del servicio al iniciar el componente
  async ngOnInit(): Promise<void> {
    await this.productService.cargarProductosApi();
    this.productos = this.productService.obtenerProductosFiltrados(this.filtros);
  }

    // Retorna un objeto iProduct con todas las propiedades de un producto inicializadas a valores vacíos
  generarProductoVacio(): IProduct {
    return {
      _id: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      active: false
    };
  }

  // Recibe los filtros y actualiza la lista de productos
  aplicarFiltros(filtros: any): void {
    this.filtros = filtros;
    this.productos = this.productService.obtenerProductosFiltrados(filtros);
  }

    // Muestra el modal para editar un producto existente
  mostrarModalEditarProducto(producto: IProduct): void {
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

    // Muestra el modal para crear un nuevo producto
  mostrarModalNuevoProducto() {
    this.modalNuevoProducto = true;
  }

    // Cierra cualquier modal abierto y actualiza la lista de productos, aplicando los filtros actuales
  cerrarModal(): void {
    this.mostrarModal = false;
    this.modalNuevoProducto = false;
    this.productos = this.productService.obtenerProductos();
    this.aplicarFiltros(this.filtros);
    this.productoSeleccionado = this.generarProductoVacio();
  }

    // Muestra un mensaje de alerta por un tiempo determinado
  mostrarMensajeAlerta(texto: string): void {
    this.mensajeAlerta = texto;
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 5000);
  }



}

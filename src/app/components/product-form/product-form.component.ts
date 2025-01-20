import { IProduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  private productService = inject(ProductService);
  modelForm: FormGroup;
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() notificarMensaje: EventEmitter<string> = new EventEmitter();

  // Constructor donde se inicializa el formulario reactivo y definimos las validaciones de los campos.
  constructor() {
    this.modelForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl(null, [
        Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/),
      ]),
      active: new FormControl(true)
    }, []);
  }

  // Método que se ejecuta al enviar el formulario. Generamos un id único usando un timestamp y añadimos el producto al servicio.
  onSubmit(): void {
    if (this.modelForm.valid) {
      const nuevoProducto: IProduct = {
        ...this.modelForm.value,
        _id: String(Date.now()),
      };
      this.productService.addProduct(nuevoProducto);
      this.notificarMensaje.emit('Producto añadido correctamente.');
      this.cerrar();
    } else {
      console.log('Formulario inválido');
    }
  }

  // Método para comprobar si un campo tiene un error
  checkControl(formControlName: string, validador: string): boolean | undefined{
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  // Método para emitir el evento de cierre del modal al componente padre.
  cerrar() {
    this.cerrarModal.emit();
  }
}
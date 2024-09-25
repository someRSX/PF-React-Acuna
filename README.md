# Proyecto Final de React JS
Este proyecto es una aplicación de e-commerce desarrollada en React, que permite a los usuarios navegar por una variedad de productos, añadirlos a un carrito de compras y realizar un proceso de checkout. La aplicación utiliza Firebase para almacenar y gestionar los datos de los productos y las órdenes.

## Enfoque
El enfoque principal de este proyecto fue crear una experiencia de usuario intuitiva y fluida. Se implementaron las siguientes características clave:

- **Navegación por Categorías**: Los productos están organizados en categorías, lo que facilita la búsqueda y selección de artículos.
- **Detalles del Producto**: Al hacer clic en un producto, los usuarios pueden ver una página de detalles que incluye una descripción, imagen y precio del artículo.
- **Carrito de Compras**: Los usuarios pueden agregar productos al carrito y ver el resumen de su selección antes de realizar la compra.
- **Integración con Firebase**: La aplicación utiliza Firebase para manejar la autenticación y almacenamiento de datos, permitiendo una gestión eficaz de productos y órdenes.

### Estructura del Proyecto
- Se creó un contexto de carrito (`CartContext`) para manejar el estado del carrito de compras de forma global.
- Se implementaron componentes reutilizables para facilitar la extensión y mantenimiento de la aplicación, como `ItemListContainer` y `ItemDetailContainer`.
- Se utilizó `React Router` para manejar la navegación entre diferentes rutas (inicio, categorías, detalles del producto, carrito y checkout).
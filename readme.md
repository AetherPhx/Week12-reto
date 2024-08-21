# Presentación del Proyecto: Cajero Automático

Este ejercicio tiene como objetivo poner en práctica los conceptos vistos en clase maquetando y programando una IU de un cajero simulando sus operaciones de manera simple.

## Indicaciones Generales

### General

La app web se desarrollará únicamente con lenguaje nativo `HTML, CSS y JS` sin el uso de frameworks.
El diseño debe ser similar a las pantallas de cajero automático de cualquier banco (BCP, Interback, BBVA, etc).

Para manejar las diversar vistas de la app, se manejarán mediante manipulación del DOM con JS para mostrarlas dinámicamente.

No se mencionó nada sobre metodologías ni arquitectura css, por lo que se deja a libre elección.

### Cuenta

Para que el usuario puede utilizar la app primero se le pedirá ingresar en una de las cuentas existentes.
Estas cuentas estarán representadas en un arreglo de objetos con la siguiente estructura:

```js
// Ejemplo del arreglo de objetos
let cuentas = [
	{
		dni: "12345678",
		contraseña: "1234",
		nombre: "Pepe",
		saldo: 1000,
	},
	{
		dni: "87654321",
		contraseña: "4321",
		nombre: "Juan",
		saldo: 2000,
	},
];
```

Se debe ingresar el DNI y PIN de seguridad, estos serán validados y en el caso de ser incorrectos se notificará al usuario permitiendole intentarlo nuevamente.
Por el contrario, si los datos son correctos se concede el acceso a la cuenta mostrando el menú de operaciones.

### Operaciones

La app contará con las siguientes 3 operaciones completamente funcionales:

1. Consultar saldo
2. Ingresar monto
3. Retirar monto
   > Cada operación debe tener las validaciones necesarias. Principalmente que el saldo no sea menor a 0.
   > Se puede tener más operaciones, pero no es obligatorio que funcionen.

Las especificaciones de las operaciones obligatorias son las siguientes:

- Al realizar la operación de **Consultar Saldo** se debe mostrar en la pantalla el saldo actual.
- Al realizar la operación de **Ingresar Monto** el usuario debe escoger el monto a ingresar, mostrando en pantalla el monto ingresado y el nuevo saldo.
- Al realizar la operación de **Retirar Monto** el usuario debe escoger el monto a retirar, mostrando en pantalla el monto retirado y el nuevo saldo.

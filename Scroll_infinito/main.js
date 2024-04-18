var products = [
    {
        "name": "Camisa de Algodón",
        "description": "Camisa de algodón suave y cómoda, perfecta para el uso diario.",
        "price": 29.99
    },
    {
        "name": "Pantalones Vaqueros",
        "description": "Pantalones vaqueros modernos y duraderos para cualquier ocasión.",
        "price": 39.99
    },
    {
        "name": "Zapatos de Cuero",
        "description": "Zapatos de cuero elegantes y resistentes, ideales para el trabajo o eventos formales.",
        "price": 59.99
    },
    {
        "name": "Bolso de Mano",
        "description": "Bolso de mano espacioso con múltiples compartimentos para organizar tus pertenencias.",
        "price": 49.99
    },
    {
        "name": "Reloj de Pulsera",
        "description": "Reloj de pulsera analógico con correa de acero inoxidable y resistente al agua.",
        "price": 79.99
    },
    {
        "name": "Gafas de Sol",
        "description": "Gafas de sol de moda con protección UV y montura ligera.",
        "price": 24.99
    }
];

// Función para obtener un producto aleatorio del array
function getRandomProduct() {
    return products[Math.floor(Math.random() * products.length)];
}

// Selecciona el elemento HTML con el ID 'infinite-list'
var listElm = document.querySelector('#infinite-list');

// Define una función llamada 'loadMore' para cargar más productos en la lista
var loadMore = function() {
    // Itera 20 veces para agregar 20 productos a la lista
    for (var i = 0; i < 20; i++) {
        // Obtiene un producto aleatorio llamando a la función 'getRandomProduct'
        var product = getRandomProduct();
        // Crea un nuevo elemento de lista
        var item = document.createElement('li');
        // Asigna HTML al elemento de lista que incluye el nombre, descripción y precio del producto
        item.innerHTML = `<strong>${product.name}</strong><br>${product.description}<br>Precio: $${product.price.toFixed(2)}`;
        // Agrega el elemento de lista al elemento de lista principal ('listElm')
        listElm.appendChild(item);
    }
}

// Agrega un evento de desplazamiento al elemento de lista ('listElm')
listElm.addEventListener('scroll', function() {
    // Comprueba si el usuario ha llegado al final de la lista
    if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        // Si ha llegado al final de la lista, carga más productos llamando a la función 'loadMore'
        loadMore();
    }
});

// Carga inicialmente más productos en la lista
loadMore();
// ─── Configuración de Sanity ───────────────────────────────
const PROJECT_ID = 'z6nleokz';
const DATASET    = 'production';
const API_URL    = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}`;

// ─── Query GROQ: trae todos los productos ──────────────────
const query = encodeURIComponent(`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    price,
    description,
    category,
    image {
      asset -> { url }
    }
  }
`);

// ─── Función para construir la tarjeta de cada producto ────
// ─── Función para construir la tarjeta de cada producto ────
function crearTarjeta(producto) {
  const imagen = producto.image?.asset?.url
    ? `<img src="${producto.image.asset.url}" alt="${producto.name}" />`
    : `<div class="no-image">📦</div>`;

  const categoria = producto.category
    ? `<span class="category">${producto.category}</span>`
    : '';

  const descripcion = producto.description
    ? `<p>${producto.description}</p>`
    : '';

  // Mensaje predefinido para WhatsApp
  const mensaje = encodeURIComponent(
    `Hola! Me interesa el producto: *${producto.name}* - $${producto.price}. ¿Está disponible?`
  );

  // Tu número de WhatsApp (con código de país, sin + ni espacios)
  const telefono = '59174328155';

  const btnWhatsapp = `
    <a class="btn-whatsapp" 
       href="https://wa.me/${telefono}?text=${mensaje}" 
       target="_blank">
      💬 Pedir por WhatsApp
    </a>
  `;

  return `
    <div class="card">
      ${imagen}
      <div class="card-body">
        ${categoria}
        <h2>${producto.name}</h2>
        <div class="price">$${producto.price}</div>
        ${descripcion}
        ${btnWhatsapp}
      </div>
    </div>
  `;
}

// ─── Función principal: trae datos y renderiza ─────────────
async function cargarProductos() {
  const loading    = document.getElementById('loading');
  const contenedor = document.getElementById('productos');

  try {
    const res  = await fetch(`${API_URL}?query=${query}`);
    const data = await res.json();
    const productos = data.result;

    // Oculta el loading
    loading.style.display = 'none';

    if (!productos || productos.length === 0) {
      contenedor.innerHTML = '<p>No hay productos disponibles.</p>';
      return;
    }

    // Renderiza cada producto
    contenedor.innerHTML = productos.map(crearTarjeta).join('');

  } catch (error) {
    loading.textContent = 'Error al cargar productos. Intenta de nuevo.';
    console.error('Error Sanity:', error);
  }
}

// ─── Inicia la app ─────────────────────────────────────────
cargarProductos();
import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, SafeAreaView, 
  TextInput, Pressable, ScrollView, Alert 
} from 'react-native';

const INITIAL_PRODUCTS = [
  { 
    id: 'PROD-001', 
    nombre: 'Soporte Ergónomico Laptop', 
    categoria: 'Tecnología', 
    marca: 'ErgoTech',
    descripcion: 'Soporte ergonómico de aluminio compatible con portátiles de 10 a 17 pulgadas.', 
    resenas: [5, 4],
    variantes: [
      { id: 'V-001', etiqueta: 'Plata / 13 pulgadas', precioFinal: 45000, stockPropio: 5 },
      { id: 'V-002', etiqueta: 'Gris Oscuro / 15 pulgadas', precioFinal: 48000, stockPropio: 5 }
    ]
  },
  { 
    id: 'PROD-002', 
    nombre: 'Audífonos Bluetooth Swim', 
    categoria: 'Tecnología', 
    marca: 'SoundMax',
    descripcion: 'Auriculares inalámbricos con resistencia al agua IPX7 para deporte extremo.', 
    resenas: [5],
    variantes: [
      { id: 'V-003', etiqueta: 'Negro / Estándar', precioFinal: 75000, stockPropio: 6 }
    ]
  },
  { 
    id: 'PROD-003', 
    nombre: 'Bombillo LED RGB Smart', 
    categoria: 'Tecnología', 
    marca: 'LumenHouse',
    descripcion: 'Bombillo inteligente controlable por app móvil, compatible con asistentes de voz.', 
    resenas: [4, 4],
    variantes: [
      { id: 'V-004', etiqueta: 'Blanco Cálido/RGB', precioFinal: 32000, stockPropio: 15 }
    ]
  },
  { 
    id: 'PROD-004', 
    nombre: 'Termo de Acero Inoxidable', 
    categoria: 'Hogar', 
    marca: 'EcoContainer',
    descripcion: 'Mantiene bebidas frías o calientes por más de 12 horas con doble pared térmica.', 
    resenas: [5, 5],
    variantes: [
      { id: 'V-005', etiqueta: 'Verde Bosque / 750ml', precioFinal: 35000, stockPropio: 4 },
      { id: 'V-006', etiqueta: 'Acero Puro / 750ml', precioFinal: 35000, stockPropio: 4 }
    ]
  },
  { 
    id: 'PROD-005', 
    nombre: 'Lámpara de Escritorio Led', 
    categoria: 'Hogar', 
    marca: 'LumenHouse',
    descripcion: 'Lámpara decorativa con luz cálida regulable ideal para estudio o teletrabajo.', 
    resenas: [3, 4],
    variantes: [
      { id: 'V-007', etiqueta: 'Blanco Minimalista', precioFinal: 55000, stockPropio: 4 }
    ]
  },
  { 
    id: 'PROD-006', 
    nombre: 'Organizador de Escritorio', 
    categoria: 'Hogar', 
    marca: 'WoodCraft',
    descripcion: 'Estructura compacta en madera y malla metálica para ordenar accesorios y notas.', 
    resenas: [4],
    variantes: [
      { id: 'V-008', etiqueta: 'Negro Mate', precioFinal: 28000, stockPropio: 12 }
    ]
  },
  { 
    id: 'PROD-007', 
    nombre: 'Camiseta Deportiva Pro', 
    categoria: 'Deportes', 
    marca: 'FitActive',
    descripcion: 'Camiseta transpirable de secado rápido para running y entrenamiento de fuerza.', 
    resenas: [5, 5, 4],
    variantes: [
      { id: 'V-009', etiqueta: 'Talla M / Verde', precioFinal: 40000, stockPropio: 5 },
      { id: 'V-010', etiqueta: 'Talla L / Verde', precioFinal: 40000, stockPropio: 5 }
    ]
  },
  { 
    id: 'PROD-008', 
    nombre: 'Banda Elástica de Resistencia', 
    categoria: 'Deportes', 
    marca: 'FitActive',
    descripcion: 'Banda de látex natural de alta durabilidad para tonificación y estiramiento.', 
    resenas: [4],
    variantes: [
      { id: 'V-011', etiqueta: 'Resistencia Media', precioFinal: 18000, stockPropio: 20 }
    ]
  },
  { 
    id: 'PROD-009', 
    nombre: 'Cuerda para Saltar Profesional', 
    categoria: 'Deportes', 
    marca: 'FitActive',
    descripcion: 'Cuerda ligera con rulemanes de precisión y mangos ergonómicos de alta velocidad.', 
    resenas: [5],
    variantes: [
      { id: 'V-012', etiqueta: 'Negro / Ajustable', precioFinal: 22000, stockPropio: 14 }
    ]
  },
  { 
    id: 'PROD-010', 
    nombre: 'Mordedor de Caucho Canino', 
    categoria: 'Mascotas', 
    marca: 'PetHappy',
    descripcion: 'Hueso duradero de caucho natural con textura para limpieza dental en perros.', 
    resenas: [4, 5],
    variantes: [
      { id: 'V-013', etiqueta: 'Mediano / Aroma Menta', precioFinal: 25000, stockPropio: 9 }
    ]
  },
  { 
    id: 'PROD-011', 
    nombre: 'Comedero Doble Antideslizante', 
    categoria: 'Mascotas', 
    marca: 'PetHappy',
    descripcion: 'Recipientes de acero inoxidable desmontables con base de caucho firme.', 
    resenas: [5],
    variantes: [
      { id: 'V-014', etiqueta: 'Acero / Base Verde', precioFinal: 38000, stockPropio: 7 }
    ]
  },
  { 
    id: 'PROD-012', 
    nombre: 'Correa Extensible Retráctil', 
    categoria: 'Mascotas', 
    marca: 'PetHappy',
    descripcion: 'Correa resistente de hasta 5 metros con sistema de freno y bloqueo con una mano.', 
    resenas: [4, 4],
    variantes: [
      { id: 'V-015', etiqueta: 'Hasta 20kg / 5 metros', precioFinal: 48000, stockPropio: 5 }
    ]
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('catalog'); 
  const [productos, setProductos] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortOrder, setSortOrder] = useState('none'); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [filterMarca, setFilterMarca] = useState('Todas');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const [compareList, setCompareList] = useState([]); 
  const [preguntas, setPreguntas] = useState([        
    { id: 'P-1', prodId: 'PROD-001', texto: '¿Sirve para MacBooks de 16 pulgadas?', respuesta: 'Hola, sí es totalmente compatible con equipos de hasta 17 pulgadas.', estado: 'Respondida', fecha: '2026-03-01' }
  ]);
  const [nuevaPregunta, setNuevaPregunta] = useState('');

  const [direcciones, setDirecciones] = useState([    
    { id: 'DIR-1', alias: 'Casa Principal', municipio: 'Mosquera', ref: 'Calle 10 # 5-20 apto 301', principal: true },
    { id: 'DIR-2', alias: 'Oficina Sabana', municipio: 'Funza', ref: 'Zona Industrial Lote 4', principal: false }
  ]);
  const [nuevaDir, setNuevaDir] = useState({ alias: '', municipio: 'Mosquera', ref: '' });
  const [dirSeleccionada, setDirSeleccionada] = useState('DIR-1');
  const [modalidadEnvio, setModalidadEnvio] = useState('estandar'); 

  const [notificaciones, setNotificaciones] = useState([]); 
  const [subscriptionsStock, setSubscriptionsStock] = useState([]); 
  const [supportTickets, setSupportTickets] = useState([]); 
  const [ticketForm, setTicketForm] = useState({ pedidoId: '', motivo: 'Entrega', descripcion: '' });

  const categories = ['Todas', 'Tecnología', 'Hogar', 'Deportes', 'Mascotas'];
  const marcasList = ['Todas', 'ErgoTech', 'SoundMax', 'LumenHouse', 'EcoContainer', 'WoodCraft', 'FitActive', 'PetHappy'];

  const getStockTotal = (prod) => {
    return prod.variantes.reduce((acc, v) => acc + v.stockPropio, 0);
  };

  const filteredProducts = productos.filter(p => {
    const matchesSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || p.categoria === selectedCategory;
    const matchesMarca = filterMarca === 'Todas' || p.marca === filterMarca;
    
    const minP = Math.min(...p.variantes.map(v => v.precioFinal));
    const maxP = Math.max(...p.variantes.map(v => v.precioFinal));
    const pMinVal = precioMin !== '' ? parseFloat(precioMin) : 0;
    const pMaxVal = precioMax !== '' ? parseFloat(precioMax) : 9999999;
    const matchesPrice = minP >= pMinVal && maxP <= pMaxVal;

    return matchesSearch && matchesCat && matchesMarca && matchesPrice;
  }).sort((a, b) => {
    const precioA = Math.min(...a.variantes.map(v => v.precioFinal));
    const precioB = Math.min(...b.variantes.map(v => v.precioFinal));
    if (sortOrder === 'asc') return precioA - precioB;
    if (sortOrder === 'desc') return precioB - precioA;
    return 0;
  });

  
const toggleFavorite = (id) => {
  setFavorites(prevFavorites => {
    if (prevFavorites.includes(id)) {
      return prevFavorites.filter(favId => favId !== id);
    } else {
      return [...prevFavorites, id];
    }
  });
};


  const toggleCompare = (product) => {
    if (compareList.includes(product.id)) {
      setCompareList(compareList.filter(id => id !== product.id));
    } else {
      if (compareList.length >= 3) {
        Alert.alert('Límite alcanzado', 'Solo puedes comparar máximo 3 productos simultáneamente.');
        return;
      }
      setCompareList([...compareList, product.id]);
      Alert.alert('Comparador', `${product.nombre} añadido al comparador.`);
    }
  };

  const addToCartWithVariant = (product, variant) => {
    if (!variant) {
      Alert.alert('Variante obligatoria', 'Por favor selecciona una variante antes de continuar.');
      return;
    }
    if (variant.stockPropio <= 0) {
      Alert.alert('Agotado', 'Esta variante seleccionada no tiene existencias disponibles.');
      return;
    }

    const cartKey = `${product.id}-${variant.id}`;
    const existing = cart.find(item => item.cartKey === cartKey);

    if (existing) {
      if (existing.quantity >= variant.stockPropio) {
        Alert.alert('Stock máximo', 'No puedes agregar más unidades de las disponibles.');
        return;
      }
      setCart(cart.map(item => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { cartKey, product, variant, quantity: 1 }]);
    }
    Alert.alert('Éxito', 'Producto con variante agregado al carrito.');
  };

  const updateCartQuantity = (cartKey, delta) => {
    setCart(cart.map(item => {
      if (item.cartKey === cartKey) {
        const newQty = item.quantity + delta;
        if (newQty > item.variant.stockPropio) {
          Alert.alert('Stock máximo', 'No hay más unidades disponibles.');
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (cartKey) => {
    setCart(cart.filter(item => item.cartKey !== cartKey));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.variant.precioFinal * item.quantity), 0);

  const calcularEnvio = () => {
    if (subtotal === 0) return 0;
    const dirObj = direcciones.find(d => d.id === dirSeleccionada);
    const muni = dirObj ? dirObj.municipio : 'Mosquera';

    let costo = 6000;
    if (muni === 'Mosquera') {
      costo = modalidadEnvio === 'expres' ? 10000 : 6000;
    } else if (muni === 'Funza') {
      costo = modalidadEnvio === 'expres' ? 12000 : 8000;
    } else if (muni === 'Madrid') {
      costo = modalidadEnvio === 'expres' ? 14000 : 10000;
    } else {
      costo = modalidadEnvio === 'expres' ? 18000 : 15000;
    }
    return costo;
  };

  const shipping = calcularEnvio();
  const total = subtotal + shipping;

  const confirmCheckout = () => {
    if (!dirSeleccionada) {
      Alert.alert('Dirección requerida', 'Por favor selecciona una dirección de entrega válida.');
      return;
    }
    if (cart.length === 0) return;

    for (let item of cart) {
      const prodInDb = productos.find(p => p.id === item.product.id);
      const varInDb = prodInDb.variantes.find(v => v.id === item.variant.id);
      if (item.quantity > varInDb.stockPropio) {
        Alert.alert('Error de stock', `La variante ${varInDb.etiqueta} ya no cuenta con stock suficiente.`);
        return;
      }
    }

    const updatedProducts = productos.map(p => {
      const newVariantes = p.variantes.map(v => {
        const cartMatch = cart.find(ci => ci.product.id === p.id && ci.variant.id === v.id);
        if (cartMatch) {
          return { ...v, stockPropio: v.stockPropio - cartMatch.quantity };
        }
        return v;
      });
      return { ...p, variantes: newVariantes };
    });
    setProductos(updatedProducts);

    const dirObj = direcciones.find(d => d.id === dirSeleccionada);
    const newOrderCode = 'PED-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder = {
      code: newOrderCode,
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      shipping,
      total,
      estado: 'Confirmado',
      municipioDestino: dirObj ? dirObj.municipio : 'Mosquera',
      direccionTexto: dirObj ? `${dirObj.alias}: ${dirObj.ref}` : 'Principal'
    };

    setHistory([newOrder, ...history]);

    setNotificaciones(prev => [
      { id: 'NOTIF-' + Date.now(), tipo: 'Pedido', mensaje: `Tu pedido ${newOrderCode} fue confirmado exitosamente.`, fecha: new Date().toLocaleTimeString(), leida: false, refId: newOrderCode },
      ...prev
    ]);

    setCart([]);
    setCurrentScreen('history');
    Alert.alert('¡Compra Exitosa!', `Pedido generado con código: ${newOrderCode}`);
  };

  const avanzarEstadoPedido = (orderCode) => {
    setHistory(history.map(ord => {
      if (ord.code === orderCode) {
        let nuevoEstado = ord.estado;
        if (ord.estado === 'Confirmado') nuevoEstado = 'Preparando';
        else if (ord.estado === 'Preparando') nuevoEstado = 'En camino';
        else if (ord.estado === 'En camino') nuevoEstado = 'Entregado';
        else {
          Alert.alert('Aviso', 'Este pedido ya se encuentra finalizado.');
          return ord;
        }

        setNotificaciones(prev => [
          { id: 'NOTIF-' + Date.now(), tipo: 'Estado', mensaje: `El pedido ${ord.code} cambió a estado: ${nuevoEstado}`, fecha: new Date().toLocaleTimeString(), leida: false, refId: ord.code },
          ...prev
        ]);

        return { ...ord, estado: nuevoEstado };
      }
      return ord;
    }));
  };

  const cancelarPedido = (orderCode) => {
    const ord = history.find(o => o.code === orderCode);
    if (!ord) return;

    if (ord.estado !== 'Confirmado' && ord.estado !== 'Preparando') {
      Alert.alert('No se puede cancelar', 'El pedido ya está en camino o entregado.');
      return;
    }

    setProductos(prevProds => {
      return prevProds.map(prod => {
        const matchingItemsInOrder = ord.items.filter(it => it.product.id === prod.id);
        if (matchingItemsInOrder.length > 0) {
          const updatedVars = prod.variantes.map(v => {
            const foundInOrder = matchingItemsInOrder.find(it => it.variant.id === v.id);
            if (foundInOrder) {
              return { ...v, stockPropio: v.stockPropio + foundInOrder.quantity };
            }
            return v;
          });
          return { ...prod, variantes: updatedVars };
        }
        return prod;
      });
    });

    setHistory(history.map(o => o.code === orderCode ? { ...o, estado: 'Cancelado' } : o));

    setNotificaciones(prev => [
      { id: 'NOTIF-' + Date.now(), tipo: 'Cancelación', mensaje: `Tu pedido ${orderCode} ha sido cancelado y el stock fue devuelto.`, fecha: new Date().toLocaleTimeString(), leida: false, refId: orderCode },
      ...prev
    ]);

    Alert.alert('Pedido Cancelado', `El pedido ${orderCode} fue cancelado y las unidades se restituyeron.`);
  };

  const suscribirStock = (prodId) => {
    if (subscriptionsStock.includes(prodId)) {
      Alert.alert('Aviso', 'Ya estás suscrito a las alertas de reposición.');
      return;
    }
    setSubscriptionsStock([...subscriptionsStock, prodId]);
    Alert.alert('Suscripción exitosa', 'Te notificaremos cuando este artículo reciba unidades.');
  };

  const simularReposicionStock = (prodId) => {
    setProductos(productos.map(p => {
      if (p.id === prodId) {
        const repairedVars = p.variantes.map(v => ({ ...v, stockPropio: v.stockPropio + 5 }));
        if (subscriptionsStock.includes(p.id)) {
          setNotificaciones(prev => [
            { id: 'NOTIF-' + Date.now(), tipo: 'Reposición', message: `¡El producto ${p.nombre} ha vuelto a estar disponible!`, fecha: new Date().toLocaleTimeString(), leida: false, refId: p.id },
            ...prev
          ]);
        }
        return { ...p, variantes: repairedVars };
      }
      return p;
    }));
    Alert.alert('Simulación de Reposición', 'Se añadieron 5 unidades a las variantes de este producto.');
  };

  const enviarPregunta = () => {
    if (nuevaPregunta.trim().length < 10) {
      Alert.alert('Texto muy corto', 'La pregunta debe contener al menos 10 caracteres.');
      return;
    }
    const nuevaQ = {
      id: 'Q-' + Date.now(),
      prodId: selectedProduct.id,
      texto: nuevaPregunta,
      respuesta: 'Pendiente de respuesta por el tendero local...',
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString()
    };
    setPreguntas([nuevaQ, ...preguntas]);
    setNuevaPregunta('');
    Alert.alert('Pregunta enviada', 'Tu inquietud fue registrada correctamente.');
  };

  const simularRespuestaPregunta = (qId) => {
    setPreguntas(preguntas.map(q => q.id === qId ? { ...q, respuesta: 'Hola, gracias por escribir. Sí, contamos con garantía de fábrica.', estado: 'Respondida' } : q));
  };

  const crearTicketSoporte = () => {
    if (!ticketForm.pedidoId || ticketForm.descripcion.length < 15) {
      Alert.alert('Datos incompletos', 'Ingresa el número de pedido y una descripción de al menos 15 caracteres.');
      return;
    }
    const nuevoT = {
      id: 'CASO-' + Math.floor(1000 + Math.random() * 9000),
      pedidoId: ticketForm.pedidoId,
      motivo: ticketForm.motivo,
      descripcion: ticketForm.descripcion,
      estado: 'Abierto',
      respuestaFicticia: ''
    };
    setSupportTickets([nuevoT, ...supportTickets]);
    setTicketForm({ pedidoId: '', motivo: 'Entrega', descripcion: '' });
    Alert.alert('Caso Creado', `Se generó tu número de caso ${nuevoT.id}.`);
  };

  const simularRespuestaSoporte = (casoId) => {
    setSupportTickets(supportTickets.map(t => t.id === casoId ? { ...t, estado: 'Respondido', respuestaFicticia: 'Estimado cliente, su caso fue validado y resuelto con éxito.' } : t));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado Principal */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>EcoMarket Mosquera</Text>
        <Text style={styles.brandSlogan}>Lo natural y local al alcance de tus manos</Text>
      </View>

      {/* Barra de Navegación con Contadores Dinámicos */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navBar}>
        <Pressable onPress={() => setCurrentScreen('catalog')} style={[styles.navBtn, currentScreen === 'catalog' && styles.activeNav]}><Text style={styles.navText}>Catálogo</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('compare')} style={[styles.navBtn, currentScreen === 'compare' && styles.activeNav]}><Text style={styles.navText}>Comparador</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('favorites')} style={[styles.navBtn, currentScreen === 'favorites' && styles.activeNav]}><Text style={styles.navText}>Favoritos</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('cart')} style={[styles.navBtn, currentScreen === 'cart' && styles.activeNav]}><Text style={styles.navText}>Carrito</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('addresses')} style={[styles.navBtn, currentScreen === 'addresses' && styles.activeNav]}><Text style={styles.navText}>Direcciones </Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('history')} style={[styles.navBtn, currentScreen === 'history' && styles.activeNav]}><Text style={styles.navText}>Pedidos</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('notifications')} style={[styles.navBtn, currentScreen === 'notifications' && styles.activeNav]}><Text style={styles.navText}>Avisos</Text></Pressable>
        <Pressable onPress={() => setCurrentScreen('support')} style={[styles.navBtn, currentScreen === 'support' && styles.activeNav]}><Text style={styles.navText}>Soporte</Text></Pressable>
      </ScrollView>

      {/* VISTA 1: CATÁLOGO */}
      {currentScreen === 'catalog' && (
        <View style={{ flex: 1 }}>
          <View style={styles.filterContainer}>
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar producto por nombre..."
              value={search}
              onChangeText={setSearch}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {categories.map(cat => (
                <Pressable key={cat} onPress={() => setSelectedCategory(cat)} style={[styles.catChip, selectedCategory === cat && styles.activeChip]}>
                  <Text style={[styles.catChipText, selectedCategory === cat && styles.activeChipText]}>{cat}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={{flexDirection: 'row', marginTop: 6, alignItems: 'center'}}>
              <Text style={{fontSize: 11, fontWeight: 'bold', marginRight: 4}}>Marca:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {marcasList.map(m => (
                  <Pressable key={m} onPress={() => setFilterMarca(m)} style={[styles.sortBtn, filterMarca === m && styles.activeSort]}>
                    <Text style={{fontSize: 10}}>{m}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={{flexDirection: 'row', marginTop: 6, alignItems: 'center', justifyContent: 'space-between'}}>
              <TextInput style={styles.miniInput} placeholder="Mín $" keyboardType="numeric" value={precioMin} onChangeText={setPrecioMin} />
              <TextInput style={styles.miniInput} placeholder="Máx $" keyboardType="numeric" value={precioMax} onChangeText={setPrecioMax} />
              <Pressable onPress={() => { setPrecioMin(''); setPrecioMax(''); setFilterMarca('Todas'); setSearch(''); setSelectedCategory('Todas'); }} style={styles.resetBtn}>
                <Text style={{fontSize: 10, color: '#fff', fontWeight: 'bold'}}>Restablecer</Text>
              </Pressable>
            </View>

            <View style={styles.sortRow}>
              <Text style={styles.labelSort}>Ordenar:</Text>
              <Pressable onPress={() => setSortOrder('none')} style={[styles.sortBtn, sortOrder==='none'&&styles.activeSort]}><Text style={{fontSize: 11}}>Normal</Text></Pressable>
              <Pressable onPress={() => setSortOrder('asc')} style={[styles.sortBtn, sortOrder==='asc'&&styles.activeSort]}><Text style={{fontSize: 11}}>Menor $</Text></Pressable>
              <Pressable onPress={() => setSortOrder('desc')} style={[styles.sortBtn, sortOrder==='desc'&&styles.activeSort]}><Text style={{fontSize: 11}}>Mayor $</Text></Pressable>
            </View>
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const isFav = favorites.includes(item.id);
              const isCompared = compareList.includes(item.id);
              const stockTotal = getStockTotal(item);
              const minPrice = Math.min(...item.variantes.map(v => v.precioFinal));
              const avgRating = item.resenas && item.resenas.length > 0 ? (item.resenas.reduce((a,b)=>a+b,0)/item.resenas.length).toFixed(1) : 'Sin calificar';
              
              return (
                <View style={styles.card}>
                  <Pressable onPress={() => { setSelectedProduct(item); setSelectedVariant(null); setCurrentScreen('detail'); }}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.badgeText}>{item.categoria} • {item.marca}</Text>
                      <View style={{flexDirection: 'row', gap: 8}}>
                        <Pressable onPress={() => toggleCompare(item)}>
                          <Text style={{fontSize: 14, color: isCompared ? '#2e7d32' : '#777'}}>{isCompared ? '⚖️ [Comparando]' : '⚖️'}</Text>
                        </Pressable>
                        <Pressable onPress={() => toggleFavorite(item.id)}>
                          <Text style={{fontSize: 16}}>{isFav ? '❤️' : '🤍'}</Text>
                        </Pressable>
                      </View>
                    </View>
                    <Text style={styles.productName}>{item.nombre}</Text>
                    <Text style={styles.productDesc} numberOfLines={2}>{item.descripcion}</Text>
                    <Text style={{fontSize: 11, color: '#f57c00', marginBottom: 4}}>⭐ {avgRating} ({item.resenas?.length || 0} reseñas)</Text>
                  </Pressable>

                  <View style={styles.footerCard}>
                    <View>
                      <Text style={styles.productPrice}>Desde ${minPrice.toLocaleString()} COP</Text>
                      <Text style={styles.productStock}>Stock Total: {stockTotal}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 6}}>
                      {stockTotal === 0 && (
                        <Pressable style={styles.btnNotifStock} onPress={() => suscribirStock(item.id)}>
                          <Text style={{fontSize: 10, color: '#fff', fontWeight: 'bold'}}>Avisarme</Text>
                        </Pressable>
                      )}
                      <Pressable 
                        style={[styles.btnAction, stockTotal === 0 && {backgroundColor: '#ccc'}]} 
                        onPress={() => { setSelectedProduct(item); setSelectedVariant(null); setCurrentScreen('detail'); }}
                      >
                        <Text style={styles.btnText}>Ver Variantes</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={<Text style={styles.emptyText}>No encontramos productos con los filtros seleccionados.</Text>}
          />
        </View>
      )}

      {/* VISTA 2: DETALLE DE PRODUCTO */}
      {currentScreen === 'detail' && selectedProduct && (
        <ScrollView style={styles.containerPad}>
          <Pressable onPress={() => setCurrentScreen('catalog')} style={styles.backBtn}>
            <Text style={{color: '#2e7d32', fontWeight: 'bold'}}>← Volver al Catálogo</Text>
          </Pressable>

          <View style={styles.detailCard}>
            <Text style={styles.badgeText}>{selectedProduct.categoria} | Marca: {selectedProduct.marca}</Text>
            <Text style={styles.detailTitle}>{selectedProduct.nombre}</Text>
            <Text style={styles.detailPrice}>
              {selectedVariant ? `$${selectedVariant.precioFinal.toLocaleString()} COP` : `Desde $${Math.min(...selectedProduct.variantes.map(v=>v.precioFinal)).toLocaleString()} COP`}
            </Text>
            <Text style={styles.detailStock}>
              {selectedVariant ? `Disponibilidad variante (${selectedVariant.etiqueta}): ${selectedVariant.stockPropio} unidades` : `Stock total acumulado: ${getStockTotal(selectedProduct)} unidades`}
            </Text>

            <Text style={styles.detailDescTitle}>Selecciona una variante (Talla / Color / Presentación):</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14}}>
              {selectedProduct.variantes.map(v => {
                const isSelected = selectedVariant?.id === v.id;
                const sinStock = v.stockPropio === 0;
                return (
                  <Pressable 
                    key={v.id} 
                    onPress={() => setSelectedVariant(v)}
                    style={[
                      styles.variantChip, 
                      isSelected && styles.activeVariantChip,
                      sinStock && {backgroundColor: '#f1f1f1', borderColor: '#ddd'}
                    ]}
                  >
                    <Text style={[styles.variantText, isSelected && {color: '#fff'}, sinStock && {color: '#aaa'}]}>
                      {v.etiqueta} (${v.precioFinal.toLocaleString()}) {sinStock ? '[Agotado]' : `(${v.stockPropio} disp)`}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.detailDescTitle}>Descripción:</Text>
            <Text style={styles.detailDesc}>{selectedProduct.descripcion}</Text>

            {getStockTotal(selectedProduct) === 0 && (
              <Pressable style={[styles.mainBtn, {backgroundColor: '#f57c00', marginBottom: 10}]} onPress={() => simularReposicionStock(selectedProduct.id)}>
                <Text style={styles.mainBtnText}>Simular Ingreso de Stock (+5 Unidades)</Text>
              </Pressable>
            )}

            <Pressable 
              style={[styles.mainBtn, (!selectedVariant || selectedVariant.stockPropio === 0) && {backgroundColor: '#ccc'}]}
              onPress={() => addToCartWithVariant(selectedProduct, selectedVariant)}
            >
              <Text style={styles.mainBtnText}>Agregar Variante al Carrito</Text>
            </Pressable>

            {/* Preguntas Frecuentes */}
            <View style={{marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 8}}>Preguntas y Respuestas</Text>
              <TextInput 
                style={styles.input}
                placeholder="Escribe tu pregunta (mínimo 10 caracteres)..."
                value={nuevaPregunta}
                onChangeText={setNuevaPregunta}
              />
              <Pressable style={[styles.btnAction, {alignSelf: 'flex-start', padding: 8}]} onPress={enviarPregunta}>
                <Text style={styles.btnText}>Enviar Pregunta</Text>
              </Pressable>

              {preguntas.filter(q => q.prodId === selectedProduct.id).map(q => (
                <View key={q.id} style={styles.qCard}>
                  <Text style={{fontSize: 12, fontWeight: 'bold'}}>P: {q.texto}</Text>
                  <Text style={{fontSize: 12, color: '#2e7d32', marginTop: 2}}>R: {q.respuesta}</Text>
                  <Text style={{fontSize: 10, color: '#888', marginTop: 2}}>Estado: {q.estado} - {q.fecha}</Text>
                  {q.estado === 'Pendiente' && (
                    <Pressable onPress={() => simularRespuestaPregunta(q.id)} style={{marginTop: 4}}>
                      <Text style={{fontSize: 10, color: '#1b5e20', textDecorationLine: 'underline'}}>Simular respuesta del tendero</Text>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>

            {/* Recomendaciones Relacionadas */}
            <View style={{marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 8}}>Productos Recomendados</Text>
              {productos.filter(p => p.categoria === selectedProduct.categoria && p.id !== selectedProduct.id && getStockTotal(p) > 0).slice(0, 3).map(rec => (
                <Pressable 
                  key={rec.id} 
                  style={styles.recCard}
                  onPress={() => { setSelectedProduct(rec); setSelectedVariant(null); }}
                >
                  <Text style={{fontWeight: 'bold', fontSize: 13}}>{rec.nombre}</Text>
                  <Text style={{fontSize: 12, color: '#d32f2f'}}>Desde ${Math.min(...rec.variantes.map(v=>v.precioFinal)).toLocaleString()} COP</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {/* VISTA 3: COMPARADOR */}
      {currentScreen === 'compare' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Comparador de Productos (2 a 3 ítems)</Text>
          {compareList.length === 0 ? (
            <Text style={styles.emptyText}>No has seleccionado ningún producto para comparar. Ve al catálogo y presiona el icono ⚖️.</Text>
          ) : (
            <ScrollView horizontal>
              <View style={{flexDirection: 'row', gap: 10, paddingBottom: 20}}>
                {compareList.map(id => {
                  const prod = productos.find(p => p.id === id);
                  if (!prod) return null;
                  return (
                    <View key={prod.id} style={styles.compareCol}>
                      <Text style={{fontSize: 12, color: '#2e7d32', fontWeight: 'bold'}}>{prod.categoria}</Text>
                      <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 6}}>{prod.nombre}</Text>
                      <Text style={{fontSize: 12, color: '#666', marginBottom: 6}}>Marca: {prod.marca}</Text>
                      <Text style={{fontSize: 13, fontWeight: 'bold', color: '#d32f2f', marginBottom: 6}}>
                        Desde ${Math.min(...prod.variantes.map(v=>v.precioFinal)).toLocaleString()}
                      </Text>
                      <Text style={{fontSize: 11, color: '#444', marginBottom: 10}}>Stock total: {getStockTotal(prod)}</Text>
                      <Text style={{fontSize: 11, color: '#555', marginBottom: 10}}>{prod.descripcion}</Text>
                      <Pressable onPress={() => toggleCompare(prod)} style={{backgroundColor: '#ffebee', padding: 6, borderRadius: 4, alignItems: 'center'}}>
                        <Text style={{color: '#d32f2f', fontSize: 11, fontWeight: 'bold'}}>Retirar</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          )}
        </ScrollView>
      )}

      {/* VISTA 4: FAVORITOS */}
      {currentScreen === 'favorites' && (
        <View style={{flex: 1, padding: 16}}>
          <Text style={styles.sectionTitle}>Mis Productos Favoritos</Text>
          <FlatList
            data={productos.filter(p => favorites.includes(p.id))}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text style={styles.productName}>{item.nombre}</Text>
                <Text style={styles.productPrice}>Desde ${Math.min(...item.variantes.map(v=>v.precioFinal)).toLocaleString()} COP</Text>
                <Pressable onPress={() => toggleFavorite(item.id)} style={{marginTop: 6}}>
                  <Text style={{color: 'red', fontSize: 12}}>Quitar de favoritos</Text>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No tienes productos guardados en favoritos. Marca el icono ❤️ en el catálogo.</Text>}
          />
        </View>
      )}

      {/* VISTA 5: DIRECCIONES */}
      {currentScreen === 'addresses' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Libreta de Direcciones de Envío</Text>
          <TextInput style={styles.input} placeholder="Alias (ej. Casa, Oficina)" value={nuevaDir.alias} onChangeText={t=>setNuevaDir({...nuevaDir, alias: t})} />
          <TextInput style={styles.input} placeholder="Municipio (Mosquera, Funza, Madrid)" value={nuevaDir.municipio} onChangeText={t=>setNuevaDir({...nuevaDir, municipio: t})} />
          <TextInput style={styles.input} placeholder="Descripción o referencia (Calle 10 # 5-20)" value={nuevaDir.ref} onChangeText={t=>setNuevaDir({...nuevaDir, ref: t})} />
          
          <Pressable style={styles.mainBtn} onPress={() => {
            if (!nuevaDir.alias || !nuevaDir.ref) {
              Alert.alert('Error', 'Completa el alias y la referencia.');
              return;
            }
            const dId = 'DIR-' + Date.now();
            setDirecciones([...direcciones, { id: dId, ...nuevaDir, principal: false }]);
            setNuevaDir({ alias: '', municipio: 'Mosquera', ref: '' });
            Alert.alert('Éxito', 'Dirección registrada correctamente.');
          }}>
            <Text style={styles.mainBtnText}>Guardar Nueva Dirección</Text>
          </Pressable>

          <Text style={[styles.sectionTitle, {marginTop: 10}]}>Direcciones Registradas</Text>
          {direcciones.map(d => (
            <View key={d.id} style={[styles.card, dirSeleccionada === d.id && {borderColor: '#2e7d32', borderWidth: 2}]}>
              <Text style={styles.productName}>{d.alias} {d.principal ? '⭐ [Principal]' : ''}</Text>
              <Text style={{fontSize: 12, color: '#444'}}>Municipio: {d.municipio}</Text>
              <Text style={{fontSize: 12, color: '#666'}}>{d.ref}</Text>
              
              <View style={{flexDirection: 'row', gap: 10, marginTop: 8}}>
                <Pressable onPress={() => setDirSeleccionada(d.id)} style={[styles.btnAction, dirSeleccionada === d.id && {backgroundColor: '#1b5e20'}]}>
                  <Text style={styles.btnText}>{dirSeleccionada === d.id ? 'Seleccionada' : 'Usar esta dirección'}</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* VISTA 6: CARRITO Y ENVÍOS */}
      {currentScreen === 'cart' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Carrito de Compras</Text>
          {cart.length === 0 ? (
            <Text style={styles.emptyText}>Tu carrito está vacío.</Text>
          ) : (
            <>
              {cart.map(item => (
                <View key={item.cartKey} style={styles.cartItem}>
                  <View style={{flex: 1}}>
                    <Text style={styles.productName}>{item.product.nombre}</Text>
                    <Text style={{fontSize: 11, color: '#2e7d32', fontWeight: 'bold'}}>Variante: {item.variant.etiqueta}</Text>
                    <Text style={styles.productPrice}>${item.variant.precioFinal.toLocaleString()} c/u</Text>
                  </View>
                  <View style={styles.qtyContainer}>
                    <Pressable onPress={() => updateCartQuantity(item.cartKey, -1)} style={styles.qtyBtn}><Text>-</Text></Pressable>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Pressable onPress={() => updateCartQuantity(item.cartKey, 1)} style={styles.qtyBtn}><Text>+</Text></Pressable>
                  </View>
                  <Pressable onPress={() => removeFromCart(item.cartKey)} style={{marginLeft: 10}}>
                    <Text style={{color: 'red', fontWeight: 'bold', fontSize: 14}}>X</Text>
                  </Pressable>
                </View>
              ))}

              <View style={styles.summaryBox}>
                <Text style={{fontWeight: 'bold', marginBottom: 6}}>Modalidad de Envío:</Text>
                <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
                  <Pressable onPress={() => setModalidadEnvio('estandar')} style={[styles.sortBtn, modalidadEnvio==='estandar' && styles.activeSort]}>
                    <Text style={{fontSize: 11}}>Estándar</Text>
                  </Pressable>
                  <Pressable onPress={() => setModalidadEnvio('expres')} style={[styles.sortBtn, modalidadEnvio==='expres' && styles.activeSort]}>
                    <Text style={{fontSize: 11}}>Exprés</Text>
                  </Pressable>
                </View>

                <Text style={styles.summaryRow}>Subtotal: ${subtotal.toLocaleString()} COP</Text>
                <Text style={styles.summaryRow}>Envío Estimado: ${shipping.toLocaleString()} COP</Text>
                <Text style={styles.totalRow}>Total a Pagar: ${total.toLocaleString()} COP</Text>
              </View>

              <Pressable style={styles.mainBtn} onPress={confirmCheckout}>
                <Text style={styles.mainBtnText}>Confirmar Pedido Simulado</Text>
              </Pressable>
            </>
          )}
        </ScrollView>
      )}

      {/* VISTA 7: HISTORIAL Y SEGUIMIENTO */}
      {currentScreen === 'history' && (
        <View style={{flex: 1, padding: 16}}>
          <Text style={styles.sectionTitle}>Historial de Pedidos y Seguimiento</Text>
          <FlatList
            data={history}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.productName}>Pedido: {item.code}</Text>
                  <Text style={[styles.badgeText, item.estado === 'Cancelado' && {backgroundColor: '#ffebee', color: '#d32f2f'}]}>
                    Estado: {item.estado}
                  </Text>
                </View>
                <Text style={{fontSize: 12, color: '#666'}}>Fecha: {item.date}</Text>
                <Text style={{fontSize: 12, color: '#666'}}>Envío a: {item.municipioDestino} ({item.direccionTexto})</Text>
                <Text style={styles.productPrice}>Total: ${item.total.toLocaleString()} COP</Text>

                <View style={{flexDirection: 'row', gap: 8, marginTop: 10}}>
                  {item.estado !== 'Entregado' && item.estado !== 'Cancelado' && (
                    <Pressable style={styles.btnAction} onPress={() => avanzarEstadoPedido(item.code)}>
                      <Text style={styles.btnText}>Simular Avance</Text>
                    </Pressable>
                  )}
                  {(item.estado === 'Confirmado' || item.estado === 'Preparando') && (
                    <Pressable style={[styles.btnAction, {backgroundColor: '#d32f2f'}]} onPress={() => cancelarPedido(item.code)}>
                      <Text style={styles.btnText}>Cancelar</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay pedidos registrados.</Text>}
          />
        </View>
      )}

      {/* VISTA 8: NOTIFICACIONES */}
      {currentScreen === 'notifications' && (
        <View style={{flex: 1, padding: 16}}>
          <Text style={styles.sectionTitle}>Centro de Notificaciones Internas</Text>
          <FlatList
            data={notificaciones}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Pressable 
                style={[styles.card, !item.leida && {borderLeftWidth: 4, borderLeftColor: '#2e7d32'}]}
                onPress={() => {
                  setNotificaciones(notificaciones.map(n => n.id === item.id ? { ...n, leida: true } : n));
                }}
              >
                <Text style={{fontSize: 11, color: '#2e7d32', fontWeight: 'bold'}}>Tipo: {item.tipo}</Text>
                <Text style={{fontSize: 13, color: '#333', marginVertical: 4}}>{item.mensaje || item.message}</Text>
                <Text style={{fontSize: 10, color: '#888'}}>{item.fecha} {item.leida ? '✓ Leída' : '• Sin leer'}</Text>
              </Pressable>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No tienes notificaciones registradas.</Text>}
          />
        </View>
      )}

      {/* VISTA 9: CENTRO DE AYUDA */}
      {currentScreen === 'support' && (
        <ScrollView style={styles.containerPad}>
          <Text style={styles.sectionTitle}>Centro de Ayuda y Solicitudes</Text>
          <TextInput style={styles.input} placeholder="Número de pedido (ej. PED-1234)" value={ticketForm.pedidoId} onChangeText={t=>setTicketForm({...ticketForm, pedidoId: t})} />
          
          <Text style={{fontSize: 12, fontWeight: 'bold', marginBottom: 4}}>Motivo:</Text>
          <View style={{flexDirection: 'row', gap: 6, marginBottom: 10}}>
            {['Entrega', 'Producto', 'Otro'].map(mot => (
              <Pressable key={mot} onPress={() => setTicketForm({...ticketForm, motivo: mot})} style={[styles.sortBtn, ticketForm.motivo === mot && styles.activeSort]}>
                <Text style={{fontSize: 11}}>{mot}</Text>
              </Pressable>
            ))}
          </View>

          <TextInput style={[styles.input, {height: 70}]} placeholder="Descripción (mínimo 15 caracteres)..." multiline value={ticketForm.descripcion} onChangeText={t=>setTicketForm({...ticketForm, descripcion: t})} />

          <Pressable style={styles.mainBtn} onPress={crearTicketSoporte}>
            <Text style={styles.mainBtnText}>Enviar Solicitud de Ayuda</Text>
          </Pressable>

          <Text style={[styles.sectionTitle, {marginTop: 14}]}>Mis Casos de Soporte</Text>
          {supportTickets.map(t => (
            <View key={t.id} style={styles.card}>
              <Text style={styles.productName}>Caso: {t.id} ({t.motivo})</Text>
              <Text style={{fontSize: 12, color: '#666'}}>Pedido: {t.pedidoId}</Text>
              <Text style={{fontSize: 12, color: '#444', marginVertical: 4}}>{t.descripcion}</Text>
              <Text style={{fontSize: 11, fontWeight: 'bold', color: t.estado === 'Abierto' ? '#f57c00' : '#2e7d32'}}>Estado: {t.estado}</Text>
              {t.respuestaFicticia !== '' && <Text style={{fontSize: 11, color: '#1b5e20', marginTop: 4}}>Respuesta: {t.respuestaFicticia}</Text>}
              
              {t.estado === 'Abierto' && (
                <Pressable onPress={() => simularRespuestaSoporte(t.id)} style={{marginTop: 6}}>
                  <Text style={{fontSize: 11, color: '#2e7d32', textDecorationLine: 'underline'}}>Simular respuesta de soporte</Text>
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { padding: 14, backgroundColor: '#2e7d32', alignItems: 'center' },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  brandSlogan: { fontSize: 11, color: '#c8e6c9', marginTop: 2 },
  navBar: { backgroundColor: '#1b5e20', paddingVertical: 8, maxHeight: 45 },
  navBtn: { paddingHorizontal: 12, justifyContent: 'center' },
  activeNav: { borderBottomWidth: 2, borderBottomColor: '#fff' },
  navText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  filterContainer: { padding: 10, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchInput: { backgroundColor: '#f1f1f1', padding: 8, borderRadius: 6, marginBottom: 8, fontSize: 13 },
  miniInput: { backgroundColor: '#f1f1f1', padding: 6, borderRadius: 4, fontSize: 11, width: '30%' },
  resetBtn: { backgroundColor: '#d32f2f', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4, justifyContent: 'center' },
  catScroll: { flexDirection: 'row', marginBottom: 4 },
  catChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e0e0e0', borderRadius: 16, marginRight: 6 },
  activeChip: { backgroundColor: '#2e7d32' },
  catChipText: { fontSize: 11, color: '#333' },
  activeChipText: { color: '#fff', fontWeight: 'bold' },
  sortRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  labelSort: { fontSize: 12, marginRight: 6, color: '#666' },
  sortBtn: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#eee', borderRadius: 4, marginRight: 6 },
  activeSort: { backgroundColor: '#c8e6c9' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 14, margin: 10, marginBottom: 0, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  badgeText: { fontSize: 10, color: '#2e7d32', fontWeight: 'bold', backgroundColor: '#e8f5e9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' },
  productName: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  productDesc: { fontSize: 11, color: '#666', marginBottom: 6 },
  footerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f1f1', paddingTop: 6 },
  productPrice: { fontSize: 13, fontWeight: 'bold', color: '#d32f2f' },
  productStock: { fontSize: 11, color: '#757575' },
  btnAction: { backgroundColor: '#2e7d32', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  btnNotifStock: { backgroundColor: '#f57c00', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 4, marginRight: 4 },
  btnText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#757575', marginTop: 20, fontSize: 13 },
  containerPad: { padding: 16 },
  backBtn: { marginBottom: 10 },
  detailCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8 },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 8, color: '#333' },
  detailPrice: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f', marginBottom: 4 },
  detailStock: { fontSize: 12, color: '#757575', marginBottom: 12 },
  detailDescTitle: { fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 4 },
  detailDesc: { fontSize: 13, color: '#666', marginBottom: 16 },
  variantChip: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#eee', borderRadius: 6, borderWidth: 1, borderColor: '#ccc' },
  activeVariantChip: { backgroundColor: '#2e7d32', borderColor: '#1b5e20' },
  variantText: { fontSize: 11, color: '#333', fontWeight: 'bold' },
  mainBtn: { backgroundColor: '#2e7d32', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  mainBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 6, marginBottom: 8, alignItems: 'center' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  qtyBtn: { paddingHorizontal: 8, paddingVertical: 2, backgroundColor: '#eee' },
  qtyText: { paddingHorizontal: 8, fontSize: 12 },
  summaryBox: { backgroundColor: '#fff', padding: 12, borderRadius: 6, marginTop: 10 },
  summaryRow: { fontSize: 13, color: '#444', marginBottom: 4 },
  totalRow: { fontSize: 15, fontWeight: 'bold', color: '#d32f2f', marginTop: 6, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#ccc', marginBottom: 10, fontSize: 13 },
  compareCol: { width: 220, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  qCard: { backgroundColor: '#f1f1f1', padding: 8, borderRadius: 6, marginTop: 6 },
  recCard: { backgroundColor: '#f9f9f9', padding: 8, borderRadius: 6, marginBottom: 6, borderWidth: 1, borderColor: '#eee' }
});
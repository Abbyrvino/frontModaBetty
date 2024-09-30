const productos = [
    {
        nombre: "Vestido Semi Largo Azul",
        precio: 59.9,
        imagen: "m_01",
        categoria_id: 1,
        id: 1
      },
      {
        nombre: "Vestido Vino Intenso Corto",
        precio: 49.9,
        imagen: "m_02",
        categoria_id: 1,
        id: 2
      },
      {
        nombre: "Vestido Casual de 2 Colores",
        precio: 54.9,
        imagen: "m_03",
        categoria_id: 1,
        id: 3
      },
      {
        nombre: "Top Cafe con Cintillo Manipulable",
        precio: 54.9,
        imagen: "m_04",
        categoria_id: 1,
        id: 4
      },
      {
        nombre: "Conjunto Semi Deportivo Plomo",
        precio: 54.9,
        imagen: "m_05",
        categoria_id: 1,
        id: 5
      },
      {
        nombre: "Falda Con tableado Color Negro",
        precio: 39.9,
        imagen: "m_06",
        categoria_id: 1,
        id: 6
      },
      {
        nombre: "Vestido Azul Marino con Cola Larga",
        precio: 59.9,
        imagen: "m_07",
        categoria_id: 1,
        id: 7
      },
      {
        nombre: "Traje de 2 Piezas para Dama Corte Princesa",
        precio: 59.9,
        imagen: "m_08",
        categoria_id: 1,
        id: 8
      },
      {
        nombre: "Falda con Tablas Largo",
        precio: 49.9,
        imagen: "m_09",
        categoria_id: 1,
        id: 9
      },
      {
        nombre: "Falda Larga Azul Pastel",
        precio: 49.9,
        imagen: "m_10",
        categoria_id: 1,
        id: 10
      },
      {
        nombre: "Blusa Corta Cuello en V",
        precio: 49.9,
        imagen: "m_11",
        categoria_id: 1,
        id: 11
      },
      {
        nombre: "Short con Bolsillos Negro",
        precio: 29.9,
        imagen: "m_12",
        categoria_id: 1,
        id: 12
      },
      {
        nombre: "Sacon Corte Princesa",
        precio: 59.9,
        imagen: "m_13",
        categoria_id: 1,
        id: 13
      },
      {
        nombre: "Blusa Cuello en V Palo de Rosa",
        precio: 59.9,
        imagen: "m_14",
        categoria_id: 1,
        id: 14
      },
      {
        nombre: "Conjunto Jardinerito",
        precio: 39.9,
        imagen: "ne_01",
        categoria_id: 4,
        id: 15
      },
      {
        nombre: "Conjunto Jardinerito Azulado",
        precio: 39.9,
        imagen: "ne_02",
        categoria_id: 4,
        id: 16
      },
      {
        nombre: "Conjunto de 3 piezas Cuadriculado ",
        precio: 19.9,
        imagen: "ne_03",
        categoria_id: 4,
        id: 17
      },
      {
        nombre: "Conjunto Pijama Futbolito ",
        precio: 19.9,
        imagen: "ne_04",
        categoria_id: 4,
        id: 18
      },
      {
        nombre: "Conjunto Deportivo Verde lechuga ",
        precio: 19.9,
        imagen: "ne_05",
        categoria_id: 4,
        id: 19
      },
      {
        nombre: "Conjunto Playero de las bahamas ",
        precio: 19.9,
        imagen: "ne_06",
        categoria_id: 4,
        id: 20
      },
      {
        nombre: "Conjunto Pijama Hola Seca ",
        precio: 19.9,
        imagen: "ne_07",
        categoria_id: 4,
        id: 21
      },
      {
        nombre: "Conjunto Pijama Azul Pastel ",
        precio: 39.9,
        imagen: "ne_08",
        categoria_id: 4,
        id: 22
      },
      {
        nombre: "Conjunto Deportivo Rojo",
        precio: 39.9,
        imagen: "ne_09",
        categoria_id: 4,
        id: 23
      },
      {
        nombre: "Conjunto Deportivo Mickey Mouse",
        precio: 69.9,
        imagen: "ne_10",
        categoria_id: 4,
        id: 24
      },
      {
        nombre: "Conjunto de Verano",
        precio: 39.9,
        imagen: "ne_11",
        categoria_id: 4,
        id: 25
      },
      {
        nombre: "Conjunto de 2 piezas de camisa y pantalón de cuello redondo de color liso",
        precio: 19.9,
        imagen: "ne_12",
        categoria_id: 4,
        id: 26
      },
      {
        nombre: "Traje de baño Cocodrilo",
        precio: 39.9,
        imagen: "ne_13",
        categoria_id: 4,
        id: 27
      },
      {
        nombre: "Conjuntos de ropa Happy",
        precio: 19.9,
        imagen: "ne_14",
        categoria_id: 4,
        id: 28
      },
      {
        nombre: "Conjunto Sudadera con Capucha Tommy",
        precio: 29.9,
        imagen: "p_01",
        categoria_id: 6,
        id: 29
      },
      {
        nombre: "Blusa Liso de manga larga holgada",
        precio: 39.9,
        imagen: "p_02",
        categoria_id: 6,
        id: 30
      },
      {
        nombre: "Mini Vestido de Mezclilla",
        precio: 39.9,
        imagen: "p_03",
        categoria_id: 6,
        id: 31
      },
      {
        nombre: "Falda delgada de gamuza sintética de cintura alta",
        precio: 24.9,
        imagen: "p_04",
        categoria_id: 6,
        id: 32
      },
      {
        nombre: "Chaqueta bomber ligera con cremallera y Cuello alto",
        precio: 39.9,
        imagen: "p_05",
        categoria_id: 6,
        id: 33
      },
      {
        nombre: "Pantalones cortos holgados ",
        precio: 39.9,
        imagen: "p_06",
        categoria_id: 6,
        id: 34
      },
      {
        nombre: "Saco Cuello en V Azul Marino",
        precio: 75.9,
        imagen: "Ropaw_01",
        categoria_id: 2,
        id: 35
      },
      {
        nombre: "Polera Blanco y Negro en Llamas",
        precio: 59.9,
        imagen: "Polera Blanco y Negro en Llamas_02",
        categoria_id: 2,
        id: 36
      },
      {
        nombre: "Polera Vice City",
        precio: 59.9,
        imagen: "Polera Vice City_03",
        categoria_id: 2,
        id: 37
      },
      {
        nombre: "Polera Deportiva Azul",
        precio: 59.9,
        imagen: "Polera Deportiva Azul_04",
        categoria_id: 2,
        id: 38
      },
      {
        nombre: "Polera Vice City2",
        precio: 59.9,
        imagen: "Polera Vice City2_05",
        categoria_id: 2,
        id: 39
      },
      {
        nombre: "Short verde Hoja Seca",
        precio: 69.9,
        imagen: "Shot_06",
        categoria_id: 2,
        id: 40
      },
      {
        nombre: "Bermuda de las Bahamas",
        precio: 49.9,
        imagen: "Bermuda_07",
        categoria_id: 2,
        id: 41
      },
      {
        nombre: "Camisa Cuello Cadete",
        precio: 69.9,
        imagen: "camisa_08",
        categoria_id: 2,
        id: 42
      },
      {
        nombre: "Vestido Gotico Vino",
        precio: 69.9,
        imagen: "a_01",
        categoria_id: 5,
        id: 43
      },
      {
        nombre: "Camiseta corta con Cuello Redondo",
        precio: 49.9,
        imagen: "a_02",
        categoria_id: 5,
        id: 44
      },
      {
        nombre: "Camisseta Gotica",
        precio: 39.9,
        imagen: "a_03",
        categoria_id: 5,
        id: 45
      },
      {
        nombre: "Camiseta con Estampado de Calavera",
        precio: 19.9,
        imagen: "a_04",
        categoria_id: 5,
        id: 46
      },
      {
        nombre: "Pantalón holgado de cintura alta elástica",
        precio: 29.9,
        imagen: "a_05",
        categoria_id: 5,
        id: 47
      },
      {
        nombre: "Pantalón Cargo Frances",
        precio: 29.9,
        imagen: "a_06",
        categoria_id: 5,
        id: 48
      },
      {
        nombre: "Cojunto de 2 piezas Turquesa",
        precio: 69.9,
        imagen: "na_01",
        categoria_id: 3,
        id: 49
      },
      {
        nombre: "Conjunto de 2 piezas Chicle",
        precio: 69.9,
        imagen: "na_02",
        categoria_id: 3,
        id: 50
      },
      {
        nombre: "Vestido Azul Marino",
        precio: 69.9,
        imagen: "na_03",
        categoria_id: 3,
        id: 51
      },
      {
        nombre: "Conjunto de 2 piezas Palo de Rosa",
        precio: 69.9,
        imagen: "na_04",
        categoria_id: 3,
        id: 52
      },
      {
        nombre: "Vestido Coquette Azul Pastel",
        precio: 69.9,
        imagen: "na_05",
        categoria_id: 3,
        id: 53
      },
      {
        nombre: "Conjunto Pijama Salmon",
        precio: 69.9,
        imagen: "na_06",
        categoria_id: 3,
        id: 54
      },
      {
        nombre: "Conjunto Pijama Noche de Luna",
        precio: 69.9,
        imagen: "na_07",
        categoria_id: 3,
        id: 55
      },
      {
        nombre: "Conjunto Bailarina",
        precio: 69.9,
        imagen: "na_08",
        categoria_id: 3,
        id: 56
      },
      {
        nombre: "Conjunto Pijama Unicornio",
        precio: 69.9,
        imagen: "na_09",
        categoria_id: 3,
        id: 57
      },
      {
        nombre: "Conjunto de tres piezas de otoño e invierno de estilo delicado",
        precio: 69.9,
        imagen: "na_10",
        categoria_id: 3,
        id: 58
      },
      {
        nombre: "Nuevo estilo Conjunto de 2 Piezas",
        precio: 69.9,
        imagen: "na_11",
        categoria_id: 3,
        id: 59
      }
]

export {
  productos
}


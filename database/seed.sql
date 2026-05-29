-- ============================================================
--  INGREDIENTES
-- ============================================================
INSERT INTO ingredients (name) VALUES
  -- proteínas
  ('Lomo de res'),
  ('Filete de res'),
  ('Entraña'),
  ('Lomo vetado'),
  ('Costillar de cerdo'),
  ('Pollo de campo'),
  ('Muslo de pato'),
  ('Salmón'),
  ('Corvina'),
  ('Pulpo'),
  ('Calamar'),
  ('Camarones'),
  ('Cangrejo'),
  ('Almejas'),
  ('Langosta'),
  ('Mejillones'),
  -- lácteos y quesos
  ('Queso parmesano'),
  ('Queso mozzarella'),
  ('Mozzarella bufala'),
  ('Queso brie'),
  ('Queso feta'),
  ('Queso azul'),
  ('Queso manchego'),
  ('Mascarpone'),
  ('Crema de leche'),
  ('Leche de coco'),
  ('Mantequilla'),
  ('Clara de huevo'),
  ('Yema de huevo'),
  ('Huevo'),
  -- verduras y hortalizas
  ('Rúcula'),
  ('Lechuga romana'),
  ('Tomate cherry'),
  ('Tomate heirloom'),
  ('Tomate'),
  ('Pepino'),
  ('Espinacas'),
  ('Zapallo butternut'),
  ('Pimiento'),
  ('Cebolla morada'),
  ('Cebolla'),
  ('Chalota'),
  ('Ajo'),
  ('Cebollín'),
  ('Aguacate'),
  ('Edamame'),
  ('Papa'),
  ('Papas nativas'),
  ('Apio'),
  ('Zanahoria'),
  -- frutas
  ('Limón'),
  ('Naranja'),
  ('Manzana'),
  ('Uvas'),
  ('Frutilla'),
  ('Frambuesa'),
  ('Maracuyá'),
  -- hierbas y especias
  ('Albahaca'),
  ('Perejil'),
  ('Cilantro'),
  ('Orégano'),
  ('Tomillo'),
  ('Romero'),
  ('Estragón'),
  ('Lavanda'),
  ('Eneldo'),
  ('Jengibre'),
  ('Azafrán'),
  ('Pimentón ahumado'),
  ('Nuez moscada'),
  ('Canela'),
  -- granos y pastas
  ('Arroz arbóreo'),
  ('Arroz bomba'),
  ('Pasta fresca'),
  ('Fettuccine'),
  ('Linguine'),
  ('Cuscús'),
  ('Pan ciabatta'),
  ('Masa hojaldre'),
  -- condimentos y líquidos
  ('Aceite de oliva'),
  ('Aceite de sésamo'),
  ('Aceite de trufa'),
  ('Vinagre balsámico'),
  ('Salsa de soya'),
  ('Salsa de ostras'),
  ('Salsa ponzu'),
  ('Vino blanco'),
  ('Vino tinto'),
  ('Vino Merlot'),
  ('Cognac'),
  ('Vino Marsala'),
  ('Trufa negra'),
  ('Pesto de albahaca'),
  ('Alcaparras'),
  ('Aceitunas kalamata'),
  ('Miel'),
  ('Nueces'),
  ('Almendras'),
  ('Crutones'),
  -- repostería
  ('Chocolate negro 70%'),
  ('Cacao en polvo'),
  ('Azúcar'),
  ('Azúcar morena'),
  ('Azúcar turbinado'),
  ('Vainilla'),
  ('Gelatina'),
  ('Ladyfingers'),
  -- embutidos
  ('Jamón serrano'),
  ('Salame'),
  -- bebidas base
  ('Pisco quebranta'),
  ('Ron blanco'),
  ('Gin'),
  ('Campari'),
  ('Vermut rojo'),
  ('Aperol'),
  ('Prosecco'),
  ('Tequila blanco'),
  ('Cointreau'),
  ('Whisky bourbon'),
  ('Angostura'),
  ('Agua con gas'),
  ('Agua mineral'),
  ('Café espresso'),
  ('Té verde'),
  ('Té negro'),
  ('Manzanilla'),
  -- misc
  ('Jarabe de goma'),
  ('Sal gruesa'),
  ('Leche');

-- ============================================================
--  RECETAS — CARTA DEL RESTAURANTE
-- ============================================================
INSERT INTO recipes (name, description, image_url, category, price, preparation_time) VALUES

-- ENTRADAS -------------------------------------------------------
('Carpaccio de Res con Rúcula y Parmesano',
 'Finas láminas de lomo de res marinadas en aceite de oliva y limón, con rúcula fresca, virutas de parmesano y alcaparras',
 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&w=600',
 'Entradas', 8990, 15),

('Tártaro de Salmón con Aguacate',
 'Salmón fresco cortado a cuchillo con aguacate, cebolla morada, cilantro y salsa ponzu, servido con chips de wonton crujientes',
 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?auto=format&w=600',
 'Entradas', 9990, 20),

('Bruschetta Tricolor',
 'Trío sobre pan ciabatta tostado: tomate confitado y albahaca, pesto con queso brie fundido, y tapenade de aceitunas kalamata',
 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&w=600',
 'Entradas', 6990, 10),

('Tabla de Embutidos y Quesos Artesanales',
 'Selección de jamón serrano, salame, queso manchego y queso azul, con miel de flores, nueces caramelizadas y uvas frescas',
 'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&w=600',
 'Entradas', 12990, 5),

('Calamares a la Romana con Alioli de Ajo Negro',
 'Anillos de calamar rebozados en tempura crujiente, fritos en aceite de oliva virgen extra, con alioli de ajo negro y limón',
 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&w=600',
 'Entradas', 8490, 15),

-- SOPAS Y CREMAS -------------------------------------------------
('Crema de Zapallo y Jengibre',
 'Crema aterciopelada de zapallo butternut con jengibre fresco, leche de coco y aceite de semillas de zapallo tostado',
 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&w=600',
 'Sopas y Cremas', 5990, 25),

('Minestrone de la Casa',
 'Sopa italiana de verduras de temporada con porotos cannellini, pasta pequeña, parmesano y albahaca fresca al final',
 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&w=600',
 'Sopas y Cremas', 5490, 35),

('Bisque de Mariscos al Cognac',
 'Bisque cremoso de camarones y cangrejo flambeado con cognac, enriquecido con crema de leche y perfumado con estragón fresco',
 'https://images.unsplash.com/photo-1571167530149-c1105da4dfaa?auto=format&w=600',
 'Sopas y Cremas', 7990, 40),

-- ENSALADAS ------------------------------------------------------
('Ensalada César con Pollo Grillado',
 'Lechuga romana, pollo de campo a la plancha, crutones artesanales, virutas de parmesano y aderezo César clásico hecho en casa',
 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&w=600',
 'Ensaladas', 8490, 15),

('Ensalada Mediterránea',
 'Tomate cherry, pepino persa, aceitunas kalamata, queso feta griego, cebolla morada, orégano y aceite de oliva extra virgen',
 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&w=600',
 'Ensaladas', 7990, 10),

('Ensalada Caprese de Temporada',
 'Tomate heirloom y mozzarella di bufala en capas alternas, albahaca fresca y reducción de vinagre balsámico de Módena',
 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&w=600',
 'Ensaladas', 7490, 10),

-- PASTAS Y ARROCES -----------------------------------------------
('Fettuccine al Tartufo Nero',
 'Pasta fresca al huevo con mantequilla de trufa negra, queso parmesano añejo y ralladura de trufa negra fresca de temporada',
 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&w=600',
 'Pastas y Arroces', 13990, 20),

('Linguine alle Vongole',
 'Linguine al dente con almejas frescas salteadas en aceite de oliva, ajo dorado, vino blanco seco y perejil fresco',
 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&w=600',
 'Pastas y Arroces', 14490, 25),

('Ravioli de Langosta en Bisque',
 'Ravioli artesanal relleno de langosta y mascarpone en salsa bisque cremosa con estragón y mantequilla de crustáceos',
 'https://images.unsplash.com/photo-1551183053-bf91798d047b?auto=format&w=600',
 'Pastas y Arroces', 16490, 30),

('Risotto de Champiñones con Aceite de Trufa',
 'Arroz arbóreo cremoso con champiñones silvestres mixtos, queso parmesano, vino blanco y unas gotas de aceite de trufa blanca',
 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&w=600',
 'Pastas y Arroces', 12990, 30),

-- CARNES ---------------------------------------------------------
('Lomo Vetado al Merlot con Puré Trufado',
 'Lomo vetado de 300g sellado y terminado al horno con reducción de Merlot, puré de papa trufado y espárragos a la mantequilla',
 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&w=600',
 'Carnes', 18990, 25),

('Filete de Res con Salsa Bordelesa',
 'Filete de res de 280g al punto solicitado, salsa bordelesa de vino tinto con chalota, tuétano y papas rústicas al tomillo',
 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&w=600',
 'Carnes', 21990, 20),

('Entraña a la Parrilla con Chimichurri',
 'Entraña de res madurada en seco, sellada en parrilla a carbón con chimichurri criollo, papas nativas asadas y limón',
 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&w=600',
 'Carnes', 17490, 20),

('Costillar de Cerdo al Horno con Miel y Mostaza',
 'Costillar braseado 4 horas en fondo oscuro, glasado con miel y mostaza antigua, servido con puré de manzana caramelizada',
 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&w=600',
 'Carnes', 16990, 120),

-- AVES -----------------------------------------------------------
('Pechuga Rellena de Espinacas y Queso Azul',
 'Pechuga de pollo de campo rellena de espinacas salteadas y queso azul, envuelta en jamón serrano con salsa de champiñones',
 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&w=600',
 'Aves', 14990, 30),

('Confit de Pato con Risotto de Champiñones',
 'Muslo de pato confitado 8 horas en su propia grasa hasta lograr piel crocante perfecta, sobre risotto de champiñones porcini',
 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&w=600',
 'Aves', 17490, 45),

('Pollo al Limón con Hierbas Provenzales',
 'Pollo de campo entero al horno con limón asado, tomillo, romero y lavanda provenzal, servido con ratatouille de verduras',
 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&w=600',
 'Aves', 13490, 35),

-- MARISCOS -------------------------------------------------------
('Salmón en Costra de Hierbas con Cuscús de Limón',
 'Filete de salmón atlántico en costra de hierbas finas al horno, sobre cuscús de limón con almendras tostadas y yogur',
 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&w=600',
 'Mariscos', 16990, 25),

('Pulpo a la Gallega con Pimentón de La Vera',
 'Pulpo gallego cocido 2 horas hasta lograr textura perfecta, servido sobre cachelos con pimentón ahumado de La Vera y aceite',
 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&w=600',
 'Mariscos', 18490, 60),

('Corvina al Vapor con Salsa de Ostras y Edamame',
 'Corvina cocinada al vapor con jengibre, rociada con salsa de ostras caliente y aceite de sésamo, edamame y cebollín',
 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?auto=format&w=600',
 'Mariscos', 15990, 20),

('Paella de Mariscos con Azafrán',
 'Arroz bomba con camarones, mejillones, calamar y almejas en fondo de mariscos, azafrán y pimentón — para dos personas',
 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&w=600',
 'Mariscos', 19990, 45),

-- POSTRES --------------------------------------------------------
('Fondant de Chocolate con Helado de Vainilla Bourbon',
 'Coulant de chocolate negro 70% con centro líquido caliente, servido junto a quenelle de helado de vainilla Bourbon artesanal',
 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&w=600',
 'Postres', 6990, 15),

('Crème Brûlée de Lavanda',
 'Crema catalana con infusión de lavanda provenzal, caramelizada al momento con azúcar rubia y frutos rojos frescos',
 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&w=600',
 'Postres', 6490, 45),

('Tiramisú Clásico',
 'Tiramisú tradicional con queso mascarpone, yemas temperadas, café espresso moka, vino Marsala y cacao en polvo',
 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&w=600',
 'Postres', 6990, 30),

('Pannacotta de Maracuyá con Coulis de Frambuesa',
 'Pannacotta suave de crema con maracuyá tropical, desmoldada sobre coulis de frambuesa fresca y hoja de menta',
 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&w=600',
 'Postres', 5990, 20),

('Tarta Tatin de Manzana con Crème Chantilly',
 'Clásica tarta invertida francesa con manzanas caramelizadas en mantequilla y azúcar morena sobre masa hojaldre crujiente',
 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&w=600',
 'Postres', 6490, 50),

-- BEBIDAS --------------------------------------------------------
('Limonada Casera',
 'Limonada artesanal preparada al momento con limón de pica y azúcar de caña. Disponible natural, de frutilla o con menta',
 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&w=600',
 'Bebidas', 3990, 5),

('Jugo Natural de Temporada',
 'Jugo 100% natural de frutas frescas de temporada, sin azúcar agregada ni conservantes. Consulte disponibilidad del día',
 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&w=600',
 'Bebidas', 3490, 5),

('Agua Mineral Premium',
 'Agua mineral de manantial con o sin gas, servida fría a 4°C en vaso con hielo y rodaja de limón',
 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&w=600',
 'Bebidas', 2490, 0),

('Té e Infusiones Artesanales',
 'Selección premium: té verde sencha, earl grey, manzanilla, menta peperina o frutos rojos — con miel y limón',
 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&w=600',
 'Bebidas', 2990, 5),

('Café de Especialidad',
 'Café de origen colombiano de tueste medio. Disponible como espresso, americano, cortado, latte o cappuccino',
 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=600',
 'Bebidas', 3490, 3),

-- CÓCTELES -------------------------------------------------------
('Pisco Sour Clásico',
 'La mezcla perfecta de pisco quebranta, jugo de limón de pica, jarabe de goma, clara de huevo y gotas de Angostura',
 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&w=600',
 'Cócteles', 7490, 5),

('Mojito Artesanal',
 'Ron blanco añejo, menta fresca macerada, jugo de limón, azúcar morena y agua con gas Fever-Tree sobre hielo picado',
 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&w=600',
 'Cócteles', 7990, 5),

('Negroni',
 'El clásico italiano en partes iguales: gin London Dry, Campari y vermut rojo Martini, servido con twist de naranja',
 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&w=600',
 'Cócteles', 8490, 3),

('Aperol Spritz',
 'Aperol, prosecco DOC frío y agua con gas sobre hielo, garnish de rodaja de naranja fresca — el aperitivo perfecto',
 'https://images.unsplash.com/photo-1560508180-03f285f67ded?auto=format&w=600',
 'Cócteles', 7990, 3),

('Margarita de Maracuyá',
 'Tequila blanco Don Julio, Cointreau, jugo de maracuyá natural y limón, servida con borde de sal y rodaja de limón',
 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&w=600',
 'Cócteles', 8490, 5),

('Old Fashioned',
 'Whisky bourbon Buffalo Trace, azúcar turbinado, gotas de Angostura y cáscara de naranja, removido sobre hielo esférico',
 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&w=600',
 'Cócteles', 9490, 5),

-- VINOS ----------------------------------------------------------
('Copa Carménère Reserva',
 'Carménère Reserva del Valle del Maipo. Notas de pimiento rojo maduro, chocolate oscuro y especias. Servido a 16°C',
 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&w=600',
 'Vinos', 6490, 0),

('Copa Chardonnay Reserva',
 'Chardonnay Reserva del Valle del Limarí. Notas de melocotón, mantequilla tostada y vainilla. Servido a 10°C',
 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&w=600',
 'Vinos', 5990, 0),

('Copa Sauvignon Blanc',
 'Sauvignon Blanc del Valle de Casablanca. Fresco y herbáceo con notas de pomelo y maracuyá. Servido a 8°C',
 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&w=600',
 'Vinos', 5990, 0),

('Botella Cabernet Sauvignon Gran Reserva',
 'Cabernet Sauvignon Gran Reserva del Valle del Maipo. Complejo, con notas de cassis y cedro. 18 meses en barrica francesa',
 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&w=600',
 'Vinos', 24990, 0),

('Botella Rosé de Temporada',
 'Blend de Syrah y Garnacha del Valle de Colchagua. Rosa pálido, fresco y frutal con notas de fresa y frambuesa',
 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&w=600',
 'Vinos', 21990, 0);

-- ============================================================
--  RELACIONES RECETA-INGREDIENTE
-- ============================================================

-- Carpaccio de Res
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lomo de res' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Rúcula' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Alcaparras' WHERE r.name = 'Carpaccio de Res con Rúcula y Parmesano';

-- Tártaro de Salmón
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salmón' WHERE r.name = 'Tártaro de Salmón con Aguacate';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aguacate' WHERE r.name = 'Tártaro de Salmón con Aguacate';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cebolla morada' WHERE r.name = 'Tártaro de Salmón con Aguacate';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cilantro' WHERE r.name = 'Tártaro de Salmón con Aguacate';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa ponzu' WHERE r.name = 'Tártaro de Salmón con Aguacate';

-- Bruschetta Tricolor
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pan ciabatta' WHERE r.name = 'Bruschetta Tricolor';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomate cherry' WHERE r.name = 'Bruschetta Tricolor';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pesto de albahaca' WHERE r.name = 'Bruschetta Tricolor';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso brie' WHERE r.name = 'Bruschetta Tricolor';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceitunas kalamata' WHERE r.name = 'Bruschetta Tricolor';

-- Tabla de Embutidos
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Jamón serrano' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salame' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso manchego' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso azul' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Miel' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Nueces' WHERE r.name = 'Tabla de Embutidos y Quesos Artesanales';

-- Calamares a la Romana
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Calamar' WHERE r.name = 'Calamares a la Romana con Alioli de Ajo Negro';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Ajo' WHERE r.name = 'Calamares a la Romana con Alioli de Ajo Negro';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Calamares a la Romana con Alioli de Ajo Negro';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Calamares a la Romana con Alioli de Ajo Negro';

-- Crema de Zapallo
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Zapallo butternut' WHERE r.name = 'Crema de Zapallo y Jengibre';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Jengibre' WHERE r.name = 'Crema de Zapallo y Jengibre';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Leche de coco' WHERE r.name = 'Crema de Zapallo y Jengibre';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Crema de Zapallo y Jengibre';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Nuez moscada' WHERE r.name = 'Crema de Zapallo y Jengibre';

-- Minestrone
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomate' WHERE r.name = 'Minestrone de la Casa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Zanahoria' WHERE r.name = 'Minestrone de la Casa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Apio' WHERE r.name = 'Minestrone de la Casa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Albahaca' WHERE r.name = 'Minestrone de la Casa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Minestrone de la Casa';

-- Bisque de Mariscos
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Camarones' WHERE r.name = 'Bisque de Mariscos al Cognac';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cangrejo' WHERE r.name = 'Bisque de Mariscos al Cognac';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cognac' WHERE r.name = 'Bisque de Mariscos al Cognac';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Bisque de Mariscos al Cognac';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Estragón' WHERE r.name = 'Bisque de Mariscos al Cognac';

-- Ensalada César
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lechuga romana' WHERE r.name = 'Ensalada César con Pollo Grillado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo de campo' WHERE r.name = 'Ensalada César con Pollo Grillado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crutones' WHERE r.name = 'Ensalada César con Pollo Grillado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Ensalada César con Pollo Grillado';

-- Ensalada Mediterránea
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomate cherry' WHERE r.name = 'Ensalada Mediterránea';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pepino' WHERE r.name = 'Ensalada Mediterránea';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceitunas kalamata' WHERE r.name = 'Ensalada Mediterránea';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso feta' WHERE r.name = 'Ensalada Mediterránea';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cebolla morada' WHERE r.name = 'Ensalada Mediterránea';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Orégano' WHERE r.name = 'Ensalada Mediterránea';

-- Ensalada Caprese
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomate heirloom' WHERE r.name = 'Ensalada Caprese de Temporada';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mozzarella bufala' WHERE r.name = 'Ensalada Caprese de Temporada';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Albahaca' WHERE r.name = 'Ensalada Caprese de Temporada';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Ensalada Caprese de Temporada';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vinagre balsámico' WHERE r.name = 'Ensalada Caprese de Temporada';

-- Fettuccine Tartufo
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Fettuccine' WHERE r.name = 'Fettuccine al Tartufo Nero';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Trufa negra' WHERE r.name = 'Fettuccine al Tartufo Nero';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Fettuccine al Tartufo Nero';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Fettuccine al Tartufo Nero';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de trufa' WHERE r.name = 'Fettuccine al Tartufo Nero';

-- Linguine Vongole
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Linguine' WHERE r.name = 'Linguine alle Vongole';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Almejas' WHERE r.name = 'Linguine alle Vongole';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Ajo' WHERE r.name = 'Linguine alle Vongole';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino blanco' WHERE r.name = 'Linguine alle Vongole';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Perejil' WHERE r.name = 'Linguine alle Vongole';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Linguine alle Vongole';

-- Ravioli Langosta
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pasta fresca' WHERE r.name = 'Ravioli de Langosta en Bisque';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Langosta' WHERE r.name = 'Ravioli de Langosta en Bisque';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mascarpone' WHERE r.name = 'Ravioli de Langosta en Bisque';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Ravioli de Langosta en Bisque';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Estragón' WHERE r.name = 'Ravioli de Langosta en Bisque';

-- Risotto Champiñones
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Arroz arbóreo' WHERE r.name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino blanco' WHERE r.name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de trufa' WHERE r.name = 'Risotto de Champiñones con Aceite de Trufa';

-- Lomo Vetado
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lomo vetado' WHERE r.name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino Merlot' WHERE r.name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Papa' WHERE r.name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Trufa negra' WHERE r.name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Lomo Vetado al Merlot con Puré Trufado';

-- Filete Bordelesa
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Filete de res' WHERE r.name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino tinto' WHERE r.name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Chalota' WHERE r.name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomillo' WHERE r.name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Filete de Res con Salsa Bordelesa';

-- Entraña
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Entraña' WHERE r.name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Ajo' WHERE r.name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Perejil' WHERE r.name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Papas nativas' WHERE r.name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Entraña a la Parrilla con Chimichurri';

-- Costillar
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Costillar de cerdo' WHERE r.name = 'Costillar de Cerdo al Horno con Miel y Mostaza';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Miel' WHERE r.name = 'Costillar de Cerdo al Horno con Miel y Mostaza';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Manzana' WHERE r.name = 'Costillar de Cerdo al Horno con Miel y Mostaza';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Romero' WHERE r.name = 'Costillar de Cerdo al Horno con Miel y Mostaza';

-- Pechuga Rellena
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo de campo' WHERE r.name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Espinacas' WHERE r.name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso azul' WHERE r.name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Jamón serrano' WHERE r.name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Pechuga Rellena de Espinacas y Queso Azul';

-- Confit de Pato
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Muslo de pato' WHERE r.name = 'Confit de Pato con Risotto de Champiñones';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Arroz arbóreo' WHERE r.name = 'Confit de Pato con Risotto de Champiñones';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomillo' WHERE r.name = 'Confit de Pato con Risotto de Champiñones';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Confit de Pato con Risotto de Champiñones';

-- Pollo Limón
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo de campo' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomillo' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Romero' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lavanda' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Pollo al Limón con Hierbas Provenzales';

-- Salmón Hierbas
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salmón' WHERE r.name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Eneldo' WHERE r.name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cuscús' WHERE r.name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Almendras' WHERE r.name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Salmón en Costra de Hierbas con Cuscús de Limón';

-- Pulpo Gallega
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pulpo' WHERE r.name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Papa' WHERE r.name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pimentón ahumado' WHERE r.name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Sal gruesa' WHERE r.name = 'Pulpo a la Gallega con Pimentón de La Vera';

-- Corvina
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Corvina' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa de ostras' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Jengibre' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de sésamo' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Edamame' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cebollín' WHERE r.name = 'Corvina al Vapor con Salsa de Ostras y Edamame';

-- Paella
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Arroz bomba' WHERE r.name = 'Paella de Mariscos con Azafrán';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Camarones' WHERE r.name = 'Paella de Mariscos con Azafrán';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mejillones' WHERE r.name = 'Paella de Mariscos con Azafrán';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Almejas' WHERE r.name = 'Paella de Mariscos con Azafrán';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azafrán' WHERE r.name = 'Paella de Mariscos con Azafrán';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pimiento' WHERE r.name = 'Paella de Mariscos con Azafrán';

-- Fondant Chocolate
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Chocolate negro 70%' WHERE r.name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Huevo' WHERE r.name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar' WHERE r.name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vainilla' WHERE r.name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';

-- Crème Brûlée
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Crème Brûlée de Lavanda';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Yema de huevo' WHERE r.name = 'Crème Brûlée de Lavanda';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar' WHERE r.name = 'Crème Brûlée de Lavanda';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lavanda' WHERE r.name = 'Crème Brûlée de Lavanda';

-- Tiramisú
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mascarpone' WHERE r.name = 'Tiramisú Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Café espresso' WHERE r.name = 'Tiramisú Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino Marsala' WHERE r.name = 'Tiramisú Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Ladyfingers' WHERE r.name = 'Tiramisú Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cacao en polvo' WHERE r.name = 'Tiramisú Clásico';

-- Pannacotta
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Gelatina' WHERE r.name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Maracuyá' WHERE r.name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Frambuesa' WHERE r.name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar' WHERE r.name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';

-- Tarta Tatin
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Manzana' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar morena' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Masa hojaldre' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Canela' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema de leche' WHERE r.name = 'Tarta Tatin de Manzana con Crème Chantilly';

-- Limonada
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Limonada Casera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Agua mineral' WHERE r.name = 'Limonada Casera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar' WHERE r.name = 'Limonada Casera';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Frutilla' WHERE r.name = 'Limonada Casera';

-- Jugo Natural
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Naranja' WHERE r.name = 'Jugo Natural de Temporada';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Maracuyá' WHERE r.name = 'Jugo Natural de Temporada';

-- Agua Mineral
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Agua mineral' WHERE r.name = 'Agua Mineral Premium';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Agua Mineral Premium';

-- Té
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Té verde' WHERE r.name = 'Té e Infusiones Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Té negro' WHERE r.name = 'Té e Infusiones Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Manzanilla' WHERE r.name = 'Té e Infusiones Artesanales';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Miel' WHERE r.name = 'Té e Infusiones Artesanales';

-- Café
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Café espresso' WHERE r.name = 'Café de Especialidad';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Leche' WHERE r.name = 'Café de Especialidad';

-- Pisco Sour
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pisco quebranta' WHERE r.name = 'Pisco Sour Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Pisco Sour Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Jarabe de goma' WHERE r.name = 'Pisco Sour Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Clara de huevo' WHERE r.name = 'Pisco Sour Clásico';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Angostura' WHERE r.name = 'Pisco Sour Clásico';

-- Mojito
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Ron blanco' WHERE r.name = 'Mojito Artesanal';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Mojito Artesanal';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar morena' WHERE r.name = 'Mojito Artesanal';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Agua con gas' WHERE r.name = 'Mojito Artesanal';

-- Negroni
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Gin' WHERE r.name = 'Negroni';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Campari' WHERE r.name = 'Negroni';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vermut rojo' WHERE r.name = 'Negroni';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Naranja' WHERE r.name = 'Negroni';

-- Aperol Spritz
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aperol' WHERE r.name = 'Aperol Spritz';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Prosecco' WHERE r.name = 'Aperol Spritz';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Agua con gas' WHERE r.name = 'Aperol Spritz';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Naranja' WHERE r.name = 'Aperol Spritz';

-- Margarita Maracuyá
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tequila blanco' WHERE r.name = 'Margarita de Maracuyá';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cointreau' WHERE r.name = 'Margarita de Maracuyá';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Maracuyá' WHERE r.name = 'Margarita de Maracuyá';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Limón' WHERE r.name = 'Margarita de Maracuyá';

-- Old Fashioned
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Whisky bourbon' WHERE r.name = 'Old Fashioned';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar turbinado' WHERE r.name = 'Old Fashioned';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Angostura' WHERE r.name = 'Old Fashioned';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Naranja' WHERE r.name = 'Old Fashioned';

-- Vinos (sin ingredientes adicionales, solo las uvas base)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino tinto' WHERE r.name = 'Copa Carménère Reserva';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino blanco' WHERE r.name = 'Copa Chardonnay Reserva';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino blanco' WHERE r.name = 'Copa Sauvignon Blanc';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino tinto' WHERE r.name = 'Botella Cabernet Sauvignon Gran Reserva';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Vino tinto' WHERE r.name = 'Botella Rosé de Temporada';

-- ============================================================
--  PASOS DE PREPARACIÓN
-- ============================================================

-- Carpaccio de Res
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Congelar el lomo de res 1 hora para facilitar el corte. Cortar en láminas muy finas con cuchillo afilado o mandolina.', 1 FROM recipes WHERE name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Disponer las láminas en plato frío superponiéndolas ligeramente. Marinar con aceite de oliva y jugo de limón.', 2 FROM recipes WHERE name = 'Carpaccio de Res con Rúcula y Parmesano';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cubrir con rúcula fresca, virutas de parmesano y alcaparras. Salpimentar y servir inmediatamente.', 3 FROM recipes WHERE name = 'Carpaccio de Res con Rúcula y Parmesano';

-- Tártaro de Salmón
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cortar el salmón en cubos pequeños de 5mm con cuchillo bien afilado. Mantener frío.', 1 FROM recipes WHERE name = 'Tártaro de Salmón con Aguacate';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar suavemente con aguacate en cubos, cebolla morada brunoise, cilantro picado y salsa ponzu.', 2 FROM recipes WHERE name = 'Tártaro de Salmón con Aguacate';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Emplatar en aro de presentación. Servir con chips de wonton y rodaja de limón.', 3 FROM recipes WHERE name = 'Tártaro de Salmón con Aguacate';

-- Bruschetta
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cortar el pan ciabatta en rebanadas de 1.5 cm. Tostar en plancha con aceite de oliva hasta dorar ambos lados.', 1 FROM recipes WHERE name = 'Bruschetta Tricolor';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Frotar cada tostada con diente de ajo fresco. Disponer los tres toppings: tomate, pesto+brie y tapenade.', 2 FROM recipes WHERE name = 'Bruschetta Tricolor';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Gratinar las bruschettas de brie 2 minutos bajo grill. Servir calientes, decoradas con albahaca.', 3 FROM recipes WHERE name = 'Bruschetta Tricolor';

-- Tabla Embutidos
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sacar los quesos del refrigerador 30 minutos antes. Cortar en porciones variadas para textura visual.', 1 FROM recipes WHERE name = 'Tabla de Embutidos y Quesos Artesanales';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Disponer en tabla de madera: embutidos en abanico, quesos en secciones, nueces, miel y uvas como garnish.', 2 FROM recipes WHERE name = 'Tabla de Embutidos y Quesos Artesanales';

-- Calamares
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Limpiar el calamar y cortar en anillos de 1 cm. Secar bien con papel absorbente.', 1 FROM recipes WHERE name = 'Calamares a la Romana con Alioli de Ajo Negro';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Pasar por tempura fría. Freír en aceite de oliva a 180°C durante 2 minutos hasta dorar.', 2 FROM recipes WHERE name = 'Calamares a la Romana con Alioli de Ajo Negro';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Escurrir sobre papel. Servir con alioli de ajo negro, rodaja de limón y perejil frito.', 3 FROM recipes WHERE name = 'Calamares a la Romana con Alioli de Ajo Negro';

-- Crema de Zapallo
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Asar el zapallo en horno a 200°C 40 min hasta caramelizar. Retirar la pulpa.', 1 FROM recipes WHERE name = 'Crema de Zapallo y Jengibre';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sofreír jengibre rallado en mantequilla. Agregar pulpa de zapallo y caldo. Cocinar 10 min.', 2 FROM recipes WHERE name = 'Crema de Zapallo y Jengibre';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir leche de coco y mixear hasta obtener crema suave. Tamizar. Servir con aceite de semillas y nuez moscada.', 3 FROM recipes WHERE name = 'Crema de Zapallo y Jengibre';

-- Minestrone
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sofreír en aceite de oliva: cebolla, zanahoria y apio en brunoise. Añadir ajo y tomate concassé.', 1 FROM recipes WHERE name = 'Minestrone de la Casa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar caldo de verduras caliente y porotos cannellini. Cocinar 20 minutos a fuego medio.', 2 FROM recipes WHERE name = 'Minestrone de la Casa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Incorporar la pasta y cocinar al dente. Ajustar sazón y servir con albahaca fresca y parmesano.', 3 FROM recipes WHERE name = 'Minestrone de la Casa';

-- Bisque
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Saltear cáscaras de camarones y cangrejo hasta tostar. Flambear con cognac. Cubrir con agua y cocinar 30 min.', 1 FROM recipes WHERE name = 'Bisque de Mariscos al Cognac';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colar el fondo. Reducir a la mitad. Agregar crema de leche y estragón. Reducir hasta consistencia de bisque.', 2 FROM recipes WHERE name = 'Bisque de Mariscos al Cognac';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Incorporar la carne de camarón y cangrejo. Ajustar sazón. Servir caliente con crema montada.', 3 FROM recipes WHERE name = 'Bisque de Mariscos al Cognac';

-- Ensalada César
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Marinar el pollo con ajo, aceite de oliva y limón. Asar a la plancha 6 min por lado. Dejar reposar y filetear.', 1 FROM recipes WHERE name = 'Ensalada César con Pollo Grillado';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Lavar y centrifugar la lechuga romana. Rasgar en trozos con la mano.', 2 FROM recipes WHERE name = 'Ensalada César con Pollo Grillado';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar con aderezo César casero. Emplatar con pollo, crutones dorados y virutas de parmesano.', 3 FROM recipes WHERE name = 'Ensalada César con Pollo Grillado';

-- Ensalada Mediterránea
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cortar tomate cherry por la mitad, pepino en medias lunas y cebolla morada en plumas finas.', 1 FROM recipes WHERE name = 'Ensalada Mediterránea';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar con aceitunas kalamata y aderezo de aceite de oliva, orégano y sal. Emplatar y cubrir con queso feta desmenuzado.', 2 FROM recipes WHERE name = 'Ensalada Mediterránea';

-- Caprese
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cortar tomate heirloom y mozzarella bufala en rodajas de 1 cm.', 1 FROM recipes WHERE name = 'Ensalada Caprese de Temporada';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Intercalar en plato frío. Salpimentar. Terminar con aceite de oliva extra virgen, reducción balsámica y albahaca fresca.', 2 FROM recipes WHERE name = 'Ensalada Caprese de Temporada';

-- Fettuccine Tartufo
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer los fettuccine en agua con abundante sal. Reservar 1 taza del agua de cocción.', 1 FROM recipes WHERE name = 'Fettuccine al Tartufo Nero';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Fundir mantequilla de trufa en sartén a fuego bajo. Agregar la pasta y emulsionar con agua de cocción.', 2 FROM recipes WHERE name = 'Fettuccine al Tartufo Nero';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Emplatar. Finalizar con parmesano rallado, aceite de trufa y láminas de trufa negra fresca.', 3 FROM recipes WHERE name = 'Fettuccine al Tartufo Nero';

-- Linguine Vongole
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Purgar las almejas en agua fría 1 hora. Saltear ajo en aceite de oliva. Agregar almejas y vino blanco. Tapar.', 1 FROM recipes WHERE name = 'Linguine alle Vongole';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer linguine al dente. Agregar a las almejas con agua de cocción. Montar con aceite de oliva.', 2 FROM recipes WHERE name = 'Linguine alle Vongole';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir en plato hondo con perejil fresco picado y hilo de aceite de oliva extra virgen.', 3 FROM recipes WHERE name = 'Linguine alle Vongole';

-- Ravioli Langosta
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Preparar el relleno: carne de langosta salteada con mantequilla, mezclada con mascarpone frío y estragón.', 1 FROM recipes WHERE name = 'Ravioli de Langosta en Bisque';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Estirar masa fresca en láminas finas. Colocar relleno, sellar con clara de huevo. Cortar ravioli.', 2 FROM recipes WHERE name = 'Ravioli de Langosta en Bisque';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer 3 min en agua con sal. Servir en bisque cremoso caliente con mantequilla de langosta.', 3 FROM recipes WHERE name = 'Ravioli de Langosta en Bisque';

-- Risotto
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Saltear arroz arbóreo en mantequilla hasta nacarar. Añadir vino blanco y absorber completamente.', 1 FROM recipes WHERE name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar caldo caliente cazo a cazo revolviendo constantemente durante 18 minutos.', 2 FROM recipes WHERE name = 'Risotto de Champiñones con Aceite de Trufa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar champiñones salteados. Mantecar con mantequilla fría y parmesano. Servir con aceite de trufa.', 3 FROM recipes WHERE name = 'Risotto de Champiñones con Aceite de Trufa';

-- Lomo Vetado
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sellar el lomo vetado sazonado en sartén muy caliente con mantequilla clarificada. Terminar en horno a 180°C al punto deseado.', 1 FROM recipes WHERE name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Preparar reducción de Merlot con chalota y tomillo. Montar con mantequilla fría fuera del fuego.', 2 FROM recipes WHERE name = 'Lomo Vetado al Merlot con Puré Trufado';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir sobre puré trufado. Napar con la reducción. Acompañar con espárragos a la mantequilla.', 3 FROM recipes WHERE name = 'Lomo Vetado al Merlot con Puré Trufado';

-- Filete Bordelesa
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sellar el filete en sartén de hierro fundido con mantequilla y tomillo. Hornear a 200°C 8 min para término medio.', 1 FROM recipes WHERE name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Reducir vino tinto con chalota, tomillo y tuétano. Montar con mantequilla fría.', 2 FROM recipes WHERE name = 'Filete de Res con Salsa Bordelesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Reposar el filete 5 minutos. Servir con la bordelesa, papas rústicas y tallos de tomillo fresco.', 3 FROM recipes WHERE name = 'Filete de Res con Salsa Bordelesa';

-- Entraña
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Retirar la membrana exterior de la entraña. Sazonar con sal parrillera y dejar 20 minutos a temperatura ambiente.', 1 FROM recipes WHERE name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sellar en parrilla a carbón a fuego vivo 4 min por lado para término jugoso. Reposar 5 minutos.', 2 FROM recipes WHERE name = 'Entraña a la Parrilla con Chimichurri';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cortar en contra de la fibra. Servir con chimichurri fresco, papas nativas asadas y limón.', 3 FROM recipes WHERE name = 'Entraña a la Parrilla con Chimichurri';

-- Costillar
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Marinar el costillar con mostaza, ajo y romero. Brasear en fondo oscuro a 140°C durante 4 horas.', 1 FROM recipes WHERE name = 'Costillar de Cerdo al Horno con Miel y Mostaza';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Glasear con miel y mostaza antigua. Gratinar a 220°C 10 min hasta caramelizar la superficie.', 2 FROM recipes WHERE name = 'Costillar de Cerdo al Horno con Miel y Mostaza';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir sobre puré de manzana caramelizada. Decorar con romero fresco y salsa del brasado reducida.', 3 FROM recipes WHERE name = 'Costillar de Cerdo al Horno con Miel y Mostaza';

-- Pechuga Rellena
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Abrir la pechuga en libro. Rellenar con espinacas salteadas y queso azul. Enrollar y envolver en jamón serrano.', 1 FROM recipes WHERE name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sellar en sartén con mantequilla. Hornear a 180°C por 20 minutos hasta cocción completa.', 2 FROM recipes WHERE name = 'Pechuga Rellena de Espinacas y Queso Azul';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Reposar 5 minutos. Cortar en rodajas y servir con salsa cremosa de champiñones.', 3 FROM recipes WHERE name = 'Pechuga Rellena de Espinacas y Queso Azul';

-- Confit de Pato
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Curar el muslo de pato con sal, tomillo y laurel durante 12 horas en frío. Enjuagar y secar.', 1 FROM recipes WHERE name = 'Confit de Pato con Risotto de Champiñones';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sumergir en grasa de pato a 80°C durante 8 horas. Reservar en la misma grasa hasta el servicio.', 2 FROM recipes WHERE name = 'Confit de Pato con Risotto de Champiñones';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Dorar la piel en sartén caliente hasta crocante. Servir sobre risotto cremoso de porcini.', 3 FROM recipes WHERE name = 'Confit de Pato con Risotto de Champiñones';

-- Pollo Limón
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Marinar el pollo 2 horas con limón, ajo, tomillo, romero y lavanda. Escurrir y secar.', 1 FROM recipes WHERE name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hornear a 200°C 45 minutos con los limones partidos asándose junto al pollo. Bañar con sus jugos cada 15 min.', 2 FROM recipes WHERE name = 'Pollo al Limón con Hierbas Provenzales';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Reposar 10 minutos. Servir con ratatouille de verduras de temporada y sus jugos de cocción.', 3 FROM recipes WHERE name = 'Pollo al Limón con Hierbas Provenzales';

-- Salmón
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cubrir el filete de salmón con mezcla de pan rallado, eneldo, perejil y ralladura de limón. Presionar para adherir.', 1 FROM recipes WHERE name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sellar en sartén con mantequilla 2 min. Terminar en horno a 200°C 8 minutos.', 2 FROM recipes WHERE name = 'Salmón en Costra de Hierbas con Cuscús de Limón';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir sobre cuscús hidratado con caldo de limón y almendras tostadas. Decorar con eneldo fresco.', 3 FROM recipes WHERE name = 'Salmón en Costra de Hierbas con Cuscús de Limón';

-- Pulpo
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Congelar el pulpo 24 horas para romper fibras. Cocer en agua hirviendo con sal y laurel durante 45-60 minutos.', 1 FROM recipes WHERE name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer las papas (cachelos) en el mismo agua. Cortar el pulpo en rodajas con tijeras de cocina.', 2 FROM recipes WHERE name = 'Pulpo a la Gallega con Pimentón de La Vera';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Emplatar en tabla de madera: papas, pulpo encima. Bañar con aceite de oliva generoso, pimentón y sal gruesa.', 3 FROM recipes WHERE name = 'Pulpo a la Gallega con Pimentón de La Vera';

-- Corvina
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sazonar la corvina con jengibre rallado, sal y cebollín. Colocar sobre papel mantequilla en vaporera.', 1 FROM recipes WHERE name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Vaporear 8-10 minutos según grosor. Calentar salsa de ostras y aceite de sésamo por separado.', 2 FROM recipes WHERE name = 'Corvina al Vapor con Salsa de Ostras y Edamame';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar la corvina en plato hondo. Verter la salsa caliente encima. Decorar con edamame y cebollín fino.', 3 FROM recipes WHERE name = 'Corvina al Vapor con Salsa de Ostras y Edamame';

-- Paella
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Calentar aceite en paellera. Sofreír ajo y pimiento. Agregar tomate rallado hasta concentrar.', 1 FROM recipes WHERE name = 'Paella de Mariscos con Azafrán';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Incorporar arroz bomba, sofreír 1 min. Añadir fondo de mariscos caliente con azafrán disuelto.', 2 FROM recipes WHERE name = 'Paella de Mariscos con Azafrán';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Distribuir mariscos sobre el arroz. Cocinar a fuego vivo 10 min, luego bajo 8 min. Reposar tapada 5 min.', 3 FROM recipes WHERE name = 'Paella de Mariscos con Azafrán';

-- Fondant
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Fundir chocolate con mantequilla al baño María. Incorporar huevos, azúcar y harina hasta mezcla homogénea.', 1 FROM recipes WHERE name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Rellenar moldes enmantequillados. Refrigerar mínimo 1 hora. Hornear a 220°C durante exactamente 8 minutos.', 2 FROM recipes WHERE name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Desmoldar inmediatamente en plato caliente. Servir con quenelle de helado de vainilla Bourbon.', 3 FROM recipes WHERE name = 'Fondant de Chocolate con Helado de Vainilla Bourbon';

-- Crème Brûlée
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Infusionar la crema con lavanda 15 min. Colar. Mezclar con yemas y azúcar sin batir en exceso.', 1 FROM recipes WHERE name = 'Crème Brûlée de Lavanda';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hornear en baño María a 150°C durante 35 min hasta que tiemble suavemente en el centro. Enfriar 4 horas.', 2 FROM recipes WHERE name = 'Crème Brûlée de Lavanda';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Al servir, espolvorear azúcar rubia y caramelizar con soplete. Decorar con frutos rojos frescos.', 3 FROM recipes WHERE name = 'Crème Brûlée de Lavanda';

-- Tiramisú
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Batir yemas con azúcar hasta blanquear. Incorporar mascarpone en frío y vino Marsala con movimientos suaves.', 1 FROM recipes WHERE name = 'Tiramisú Clásico';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mojar los ladyfingers en café espresso frío rápidamente. Alternar capas de crema y bizcochos en molde.', 2 FROM recipes WHERE name = 'Tiramisú Clásico';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Refrigerar mínimo 4 horas. Espolvorear cacao en polvo al momento de servir.', 3 FROM recipes WHERE name = 'Tiramisú Clásico';

-- Pannacotta
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hidratar la gelatina en agua fría 5 min. Calentar crema con azúcar sin hervir. Disolver gelatina.', 1 FROM recipes WHERE name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar pulpa de maracuyá. Verter en moldes. Refrigerar 4 horas hasta cuajar completamente.', 2 FROM recipes WHERE name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Desmoldar en plato frío. Bañar con coulis de frambuesa y decorar con menta fresca.', 3 FROM recipes WHERE name = 'Pannacotta de Maracuyá con Coulis de Frambuesa';

-- Tarta Tatin
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Caramelizar azúcar morena con mantequilla en sartén apta para horno. Colocar manzanas peladas y laminadas encima.', 1 FROM recipes WHERE name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cubrir las manzanas con masa hojaldre bien ajustada a los bordes. Hornear 25 min a 200°C.', 2 FROM recipes WHERE name = 'Tarta Tatin de Manzana con Crème Chantilly';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Desmoldar en caliente sobre plato. Servir tibio con crème chantilly montada y polvo de canela.', 3 FROM recipes WHERE name = 'Tarta Tatin de Manzana con Crème Chantilly';

-- Limonada
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Exprimir limones frescos. Mezclar con jarabe de azúcar de caña a gusto en vaso alto con hielo.', 1 FROM recipes WHERE name = 'Limonada Casera';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Rellenar con agua mineral fría. Para frutilla: agregar coulis de frutilla. Para menta: macerar hojas antes. Decorar y servir.', 2 FROM recipes WHERE name = 'Limonada Casera';

-- Jugo Natural
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Seleccionar frutas frescas de temporada del día. Licuar con mínima agua hasta obtener textura suave.', 1 FROM recipes WHERE name = 'Jugo Natural de Temporada';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colar si se prefiere. Servir inmediatamente en vaso frío para preservar vitaminas y frescura.', 2 FROM recipes WHERE name = 'Jugo Natural de Temporada';

-- Agua
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir agua mineral a 4°C en vaso alto con hielo y rodaja de limón.', 1 FROM recipes WHERE name = 'Agua Mineral Premium';

-- Té
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Calentar agua a temperatura correcta según el té: 80°C para verde, 95°C para negro e infusiones.', 1 FROM recipes WHERE name = 'Té e Infusiones Artesanales';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Infusionar el tiempo adecuado. Servir en tetera con miel y limón aparte.', 2 FROM recipes WHERE name = 'Té e Infusiones Artesanales';

-- Café
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Extraer espresso a 9 bares de presión con café molido al momento. Temperatura de agua: 93°C.', 1 FROM recipes WHERE name = 'Café de Especialidad';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir según pedido: espresso solo, americano con agua caliente, o con leche vaporada para latte/cappuccino.', 2 FROM recipes WHERE name = 'Café de Especialidad';

-- Pisco Sour
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar en coctelera: pisco quebranta, jugo de limón de pica, jarabe de goma y clara de huevo. Shaker en seco 15 seg.', 1 FROM recipes WHERE name = 'Pisco Sour Clásico';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar hielo y agitar vigorosamente 20 segundos. Colar en vaso de whisky con hielo grande.', 2 FROM recipes WHERE name = 'Pisco Sour Clásico';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Decorar con 3 gotas de Angostura sobre la espuma. Servir inmediatamente.', 3 FROM recipes WHERE name = 'Pisco Sour Clásico';

-- Mojito
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Macerar hojas de menta fresca con azúcar morena en vaso highball. Agregar jugo de limón.', 1 FROM recipes WHERE name = 'Mojito Artesanal';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir hielo picado y ron blanco. Rellenar con agua con gas. Decorar con ramita de menta y limón.', 2 FROM recipes WHERE name = 'Mojito Artesanal';

-- Negroni
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar en vaso mezclador con hielo: 30ml gin, 30ml Campari y 30ml vermut rojo. Remover 30 segundos.', 1 FROM recipes WHERE name = 'Negroni';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colar en vaso old fashioned con esfera de hielo. Decorar con twist de naranja expresado sobre el vaso.', 2 FROM recipes WHERE name = 'Negroni';

-- Aperol Spritz
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Llenar copa de vino con hielo. Verter prosecco bien frío, luego el Aperol y finalizar con agua con gas.', 1 FROM recipes WHERE name = 'Aperol Spritz';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Remover suavemente. Decorar con rodaja de naranja fresca. Servir inmediatamente.', 2 FROM recipes WHERE name = 'Aperol Spritz';

-- Margarita
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Frotar el borde de la copa con limón y pasar por sal. Llenar la coctelera con hielo.', 1 FROM recipes WHERE name = 'Margarita de Maracuyá';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar tequila, Cointreau, pulpa de maracuyá y jugo de limón. Agitar 15 segundos. Colar y servir.', 2 FROM recipes WHERE name = 'Margarita de Maracuyá';

-- Old Fashioned
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Disolver azúcar turbinado con gotas de Angostura y un chorrito de agua en el vaso.', 1 FROM recipes WHERE name = 'Old Fashioned';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar esfera de hielo y el whisky bourbon. Remover lentamente 20 segundos hasta enfriar.', 2 FROM recipes WHERE name = 'Old Fashioned';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Expresar la cáscara de naranja sobre el vaso para liberar los aceites. Decorar y servir.', 3 FROM recipes WHERE name = 'Old Fashioned';

-- Vinos (servicio)
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir a 16°C en copa de vino tinto. Decantar si tiene más de 5 años de guarda.', 1 FROM recipes WHERE name = 'Copa Carménère Reserva';

INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir a 10°C en copa de vino blanco previamente enfriada. Presentar la botella al cliente antes de servir.', 1 FROM recipes WHERE name = 'Copa Chardonnay Reserva';

INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Servir a 8°C en copa de vino blanco. Ideal para acompañar mariscos y pescados del menú.', 1 FROM recipes WHERE name = 'Copa Sauvignon Blanc';

INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Presentar la botella al cliente para su aprobación. Servir a 16-18°C. Se recomienda decantar 20 minutos.', 1 FROM recipes WHERE name = 'Botella Cabernet Sauvignon Gran Reserva';

INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Presentar la botella al cliente. Servir a 10°C bien frío en copa de vino blanco o rosé.', 1 FROM recipes WHERE name = 'Botella Rosé de Temporada';

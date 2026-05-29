-- Ingredientes
INSERT INTO ingredients (name) VALUES
  ('Pollo'),
  ('Tortillas'),
  ('Queso cheddar'),
  ('Salsa'),
  ('Lechuga'),
  ('Crutones'),
  ('Queso parmesano'),
  ('Aderezo César'),
  ('Fideos'),
  ('Crema'),
  ('Mantequilla'),
  ('Masa'),
  ('Salsa de tomate'),
  ('Queso mozzarella'),
  ('Albahaca'),
  ('Arroz'),
  ('Alga nori'),
  ('Salmón'),
  ('Aguacate'),
  ('Salsa de soya'),
  ('Bistec'),
  ('Sal'),
  ('Pimienta'),
  ('Aceite de oliva'),
  ('Carne molida'),
  ('Pan'),
  ('Tomate'),
  ('Cebolla'),
  ('Mariscos'),
  ('Pimiento'),
  ('Azafrán'),
  ('Pasta de lasagna'),
  ('Salsa bechamel'),
  ('Masa para tarta'),
  ('Manzanas'),
  ('Azúcar'),
  ('Canela');

-- Recetas
INSERT INTO recipes (name, description, link, image_url) VALUES
  ('Tacos de Pollo', 'Tacos rellenos de pollo desmenuzado con queso y salsa', 'https://linktacos.com', 'https://www.hojasanta.es/wp-content/uploads/2024/04/receta-mexicana-de-tacos-de-pollo-1.jpg'),
  ('Ensalada César', 'Ensalada con lechuga romana, crutones y aderezo César', 'https://linkensalada.com', 'https://www.gastrolabweb.com/u/fotografias/m/2023/9/21/f638x638-52578_110745_5050.jpg'),
  ('Pasta Alfredo', 'Pasta con salsa Alfredo cremosa y pollo', 'https://linkpasta.com', 'https://4.bp.blogspot.com/-CAZwMGubmwc/VDGGF6z6IeI/AAAAAAAAB3U/Ex0s3u_fWCI/s1600/Chicken%2BAlfredo%2BSyS2.jpg'),
  ('Pizza Margarita', 'Pizza clásica con salsa de tomate, mozzarella y albahaca fresca', 'https://linkpizza.com', 'https://recetinas.com/wp-content/uploads/2017/09/pizza-de-albahaca-y-tomatitos-cherry-receta.jpg'),
  ('Sushi Roll', 'Rollos de sushi frescos con salmón y aguacate', 'https://linksushi.com', 'https://www.ahumadosdominguez.es/wp-content/uploads/2023/10/makis-de-salmon-ahumado-y-aguacate.jpg'),
  ('Bistec a la Parrilla', 'Bistec de res jugoso cocido a la parrilla con especias', 'https://linkbistec.com', 'https://www.wikihow.com/images_en/thumb/e/eb/Grill-Steak-Step-7-preview-Version-2.jpg/550px-nowatermark-Grill-Steak-Step-7-preview-Version-2.jpg'),
  ('Hamburguesa Clásica', 'Hamburguesa artesanal con carne, lechuga, cebolla, tomate y queso', 'https://linkhamburguesa.com', 'https://img.freepik.com/fotos-premium/hamburguesa-casera-dos-carnes-queso-lechuga-tomate-cebolla_255669-2809.jpg'),
  ('Paella Valenciana', 'Paella tradicional española con mariscos, pollo y azafrán', 'https://linkpaella.com', 'https://www.demoslavueltaaldia.com/sites/default/files/paella-marisco-pollo-mi-amigo-botiquitas.jpg'),
  ('Lasagna Boloñesa', 'Lasagna italiana con carne boloñesa y salsa bechamel', 'https://linklasagna.com', 'https://www.cronica.com.ar/img/2022/03/01/lasagna_jpg_1_crop1646142972363.jpg'),
  ('Tarta de Manzana', 'Tarta dulce casera con relleno de manzana, azúcar y canela', 'https://linktarta.com', 'https://media.mykaramelli.com/galeria/recetas/tarta-de-manzana-con-crumble-de-canela_100_1.jpg');

-- Relaciones receta-ingrediente: Tacos de Pollo
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo' WHERE r.name = 'Tacos de Pollo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tortillas' WHERE r.name = 'Tacos de Pollo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso cheddar' WHERE r.name = 'Tacos de Pollo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa' WHERE r.name = 'Tacos de Pollo';

-- Ensalada César
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lechuga' WHERE r.name = 'Ensalada César';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo' WHERE r.name = 'Ensalada César';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crutones' WHERE r.name = 'Ensalada César';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Ensalada César';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aderezo César' WHERE r.name = 'Ensalada César';

-- Pasta Alfredo
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Fideos' WHERE r.name = 'Pasta Alfredo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Crema' WHERE r.name = 'Pasta Alfredo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mantequilla' WHERE r.name = 'Pasta Alfredo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo' WHERE r.name = 'Pasta Alfredo';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Pasta Alfredo';

-- Pizza Margarita
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Masa' WHERE r.name = 'Pizza Margarita';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa de tomate' WHERE r.name = 'Pizza Margarita';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso mozzarella' WHERE r.name = 'Pizza Margarita';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Albahaca' WHERE r.name = 'Pizza Margarita';

-- Sushi Roll
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Arroz' WHERE r.name = 'Sushi Roll';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Alga nori' WHERE r.name = 'Sushi Roll';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salmón' WHERE r.name = 'Sushi Roll';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aguacate' WHERE r.name = 'Sushi Roll';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa de soya' WHERE r.name = 'Sushi Roll';

-- Bistec a la Parrilla
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Bistec' WHERE r.name = 'Bistec a la Parrilla';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Sal' WHERE r.name = 'Bistec a la Parrilla';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pimienta' WHERE r.name = 'Bistec a la Parrilla';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Aceite de oliva' WHERE r.name = 'Bistec a la Parrilla';

-- Hamburguesa Clásica
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Carne molida' WHERE r.name = 'Hamburguesa Clásica';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pan' WHERE r.name = 'Hamburguesa Clásica';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Lechuga' WHERE r.name = 'Hamburguesa Clásica';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Tomate' WHERE r.name = 'Hamburguesa Clásica';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso cheddar' WHERE r.name = 'Hamburguesa Clásica';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Cebolla' WHERE r.name = 'Hamburguesa Clásica';

-- Paella Valenciana
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Arroz' WHERE r.name = 'Paella Valenciana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pollo' WHERE r.name = 'Paella Valenciana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Mariscos' WHERE r.name = 'Paella Valenciana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pimiento' WHERE r.name = 'Paella Valenciana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azafrán' WHERE r.name = 'Paella Valenciana';

-- Lasagna Boloñesa
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Pasta de lasagna' WHERE r.name = 'Lasagna Boloñesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Carne molida' WHERE r.name = 'Lasagna Boloñesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Salsa bechamel' WHERE r.name = 'Lasagna Boloñesa';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Queso parmesano' WHERE r.name = 'Lasagna Boloñesa';

-- Tarta de Manzana
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Masa para tarta' WHERE r.name = 'Tarta de Manzana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Manzanas' WHERE r.name = 'Tarta de Manzana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Azúcar' WHERE r.name = 'Tarta de Manzana';
INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
SELECT r.id, i.id FROM recipes r JOIN ingredients i ON i.name = 'Canela' WHERE r.name = 'Tarta de Manzana';

-- Pasos: Tacos de Pollo
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocinar el pollo hasta que esté completamente cocido y desmenuzar.', 1 FROM recipes WHERE name = 'Tacos de Pollo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Calentar las tortillas en un sartén a fuego medio.', 2 FROM recipes WHERE name = 'Tacos de Pollo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar el pollo desmenuzado en las tortillas calientes.', 3 FROM recipes WHERE name = 'Tacos de Pollo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar queso cheddar rallado encima del pollo.', 4 FROM recipes WHERE name = 'Tacos de Pollo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir salsa al gusto y servir caliente.', 5 FROM recipes WHERE name = 'Tacos de Pollo';

-- Pasos: Ensalada César
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Lavar y cortar la lechuga romana en trozos medianos.', 1 FROM recipes WHERE name = 'Ensalada César';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocinar el pollo a la plancha con sal y pimienta, luego cortar en tiras.', 2 FROM recipes WHERE name = 'Ensalada César';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar lechuga, pollo, crutones y queso parmesano en un bol grande.', 3 FROM recipes WHERE name = 'Ensalada César';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar el aderezo César y mezclar bien antes de servir.', 4 FROM recipes WHERE name = 'Ensalada César';

-- Pasos: Pasta Alfredo
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer los fideos en agua con sal según las indicaciones del paquete.', 1 FROM recipes WHERE name = 'Pasta Alfredo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'En una sartén, derretir la mantequilla y agregar la crema a fuego medio.', 2 FROM recipes WHERE name = 'Pasta Alfredo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir el queso parmesano rallado y mezclar hasta obtener una salsa homogénea.', 3 FROM recipes WHERE name = 'Pasta Alfredo';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Incorporar el pollo cocido y los fideos escurridos a la salsa. Servir caliente.', 4 FROM recipes WHERE name = 'Pasta Alfredo';

-- Pasos: Pizza Margarita
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Precalentar el horno a 220°C.', 1 FROM recipes WHERE name = 'Pizza Margarita';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Extender la masa en una bandeja engrasada hasta obtener un disco fino.', 2 FROM recipes WHERE name = 'Pizza Margarita';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Distribuir la salsa de tomate sobre la masa dejando los bordes libres.', 3 FROM recipes WHERE name = 'Pizza Margarita';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar el queso mozzarella en rodajas sobre la salsa.', 4 FROM recipes WHERE name = 'Pizza Margarita';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hornear 12-15 minutos, agregar albahaca fresca al sacar y servir.', 5 FROM recipes WHERE name = 'Pizza Margarita';

-- Pasos: Sushi Roll
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocinar el arroz para sushi y sazonar con vinagre de arroz.', 1 FROM recipes WHERE name = 'Sushi Roll';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Extender el alga nori sobre la esterilla de bambú.', 2 FROM recipes WHERE name = 'Sushi Roll';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cubrir el alga con arroz dejando 2 cm libres en el borde superior.', 3 FROM recipes WHERE name = 'Sushi Roll';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar tiras de salmón y aguacate en el centro.', 4 FROM recipes WHERE name = 'Sushi Roll';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Enrollar firmemente con la esterilla, cortar en porciones y servir con salsa de soya.', 5 FROM recipes WHERE name = 'Sushi Roll';

-- Pasos: Bistec a la Parrilla
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sacar el bistec del refrigerador 30 minutos antes de cocinarlo.', 1 FROM recipes WHERE name = 'Bistec a la Parrilla';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Sazonar ambos lados con sal, pimienta y aceite de oliva.', 2 FROM recipes WHERE name = 'Bistec a la Parrilla';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Calentar la parrilla a fuego alto y cocinar 3-4 minutos por lado.', 3 FROM recipes WHERE name = 'Bistec a la Parrilla';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Dejar reposar 5 minutos antes de servir para que los jugos se redistribuyan.', 4 FROM recipes WHERE name = 'Bistec a la Parrilla';

-- Pasos: Hamburguesa Clásica
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar la carne molida con sal y pimienta, formar hamburguesas de 200g.', 1 FROM recipes WHERE name = 'Hamburguesa Clásica';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocinar las hamburguesas en sartén o parrilla 4 minutos por lado.', 2 FROM recipes WHERE name = 'Hamburguesa Clásica';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Tostar el pan en la misma sartén con un poco de mantequilla.', 3 FROM recipes WHERE name = 'Hamburguesa Clásica';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar la hamburguesa sobre el pan y agregar el queso cheddar para que se derrita.', 4 FROM recipes WHERE name = 'Hamburguesa Clásica';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir lechuga, tomate y cebolla al gusto, cubrir con el pan y servir.', 5 FROM recipes WHERE name = 'Hamburguesa Clásica';

-- Pasos: Paella Valenciana
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Calentar aceite de oliva en una paellera y dorar el pollo.', 1 FROM recipes WHERE name = 'Paella Valenciana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Añadir el pimiento cortado y sofreír 3 minutos.', 2 FROM recipes WHERE name = 'Paella Valenciana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Agregar el arroz y sofreír un minuto antes de incorporar el caldo caliente con azafrán.', 3 FROM recipes WHERE name = 'Paella Valenciana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Colocar los mariscos sobre el arroz y cocinar a fuego medio-alto sin remover.', 4 FROM recipes WHERE name = 'Paella Valenciana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Dejar reposar 5 minutos cubierta con papel aluminio y servir directamente en la paellera.', 5 FROM recipes WHERE name = 'Paella Valenciana';

-- Pasos: Lasagna Boloñesa
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Preparar la salsa boloñesa sofriendo cebolla, ajo y carne molida. Añadir tomate y cocinar 20 min.', 1 FROM recipes WHERE name = 'Lasagna Boloñesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Preparar la salsa bechamel con mantequilla, harina y leche hasta obtener consistencia cremosa.', 2 FROM recipes WHERE name = 'Lasagna Boloñesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Cocer las láminas de pasta de lasagna según indicaciones y escurrir.', 3 FROM recipes WHERE name = 'Lasagna Boloñesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Alternar capas de pasta, bolonesa y bechamel en un molde. Terminar con bechamel y queso.', 4 FROM recipes WHERE name = 'Lasagna Boloñesa';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hornear a 180°C por 35 minutos hasta que la superficie esté dorada.', 5 FROM recipes WHERE name = 'Lasagna Boloñesa';

-- Pasos: Tarta de Manzana
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Precalentar el horno a 180°C y forrar un molde con la masa para tarta.', 1 FROM recipes WHERE name = 'Tarta de Manzana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Pelar y cortar las manzanas en láminas finas.', 2 FROM recipes WHERE name = 'Tarta de Manzana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Mezclar las manzanas con azúcar y canela, distribuir sobre la masa.', 3 FROM recipes WHERE name = 'Tarta de Manzana';
INSERT INTO steps (recipe_id, description, step_order)
SELECT id, 'Hornear 40 minutos hasta que la masa esté dorada. Dejar enfriar antes de servir.', 4 FROM recipes WHERE name = 'Tarta de Manzana';

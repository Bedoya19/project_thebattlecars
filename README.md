# project_thebattlecars
The Battle Cars: Proyecto personal de un juego de cartas en la web

## Que es "The Battle Cars"

Un proyecto sencillo de un juego de cartas sobre una pelea de carros usando armas y poderes absurdos.

## REGLAS DEL JUEGO
Las reglas del juego pueden cambiar un poco entre mas avance el desarrollo del juego, sin embargo, se prioritizara el desarrollo de las reglas de juego estandares sin poderes. En otras palabras, la configuracion por defecto sin cartas de poder. En un futuro, se quera cambiar que sea las reglas estadares *con poderes*, pero para el funcionamiento basico del juego y que las cartas de poder son mucho mas complejas, se hara por ahora sin poderes.

Lo que sigue son las **Reglas Estándares Normales** (sin poderes) de la Categoría 1.

### Introducción
En este juego de cartas de carros, tú no usas los carros para carreras, las usas para pelear. Tendrás que usar los carros más lujosos, más únicos, de más alta gama, obras maestras de ingeniería, para destruir los carros enemigos, igual de lujosos que los tuyos. Esto lo harás mediante armas de última generación hechas para demoler todo lo que tenga al frente. También vas a poder pelear con cacharros que se desbaratan a los 50km/h usando bazucas hechas de cartón y goma.

Lo que tendrás que usar para conseguir tu victoria será todavía más absurdo y exagerado que lo anterior, pero lo absurdo sigue teniendo reglas, aunque no lo parezca. Lo bizarro puede ser descifrado, podrás encontrar orden, organizar la ridiculez, y conseguir la victoria, manteniendo tus carros en pie y los de tu enemigo hechas pedazos.

### Resumen general de las reglas estándares normales
En este juego de cartas, tu objetivo es destruir todos los carros del enemigo antes de que te destruyan los tuyos. Tendrás un tablero en donde podrás poner 3 carros al mismo tiempo. En tu ronda, podrás, junto con poner carros, ponerles armas, atacar con esas armas, potenciar los carros para que sean mejores usando nitro proporcionado, mejorar las armas usando materiales, y si se te permite, usar poderes para causar un sinfín de efectos en el campo de batalla automovilístico. Tu objetivo es destruir todos y cada uno de los carros de tu enemigo antes de que destruya todos y cada uno de los tuyos.

### Componentes
Existen 6 categorías de rango de cartas. Siendo la Categoría 1 la categoría más básica y común, y la Categoría 6 la más avanzada, poderosa y rara. Las cartas que tendrás a tu disposición entre más avancen las categorías serán menos, pero te permitirán hacer muchas más cosas. También las reglas del juego cambiarán un poco entre más avancen las categorías, pero el ciclo general del juego será idéntico en cada categoría. Este documento será para las reglas estándares normales (sin poderes) de la Categoría 1, aunque el ciclo sería bastante similar entre cada una.

Junto con las seis categorías, las cartas en sí tienen 4 tipos distintos de uso:

#### Carta de carro
El corazón del juego. Las cartas de carro serán tus cartas principales y lo que te puede dar la victoria o la derrota. Cada carta de carro tiene estos elementos:
- **Vida**: La vida del carro
- **Capacidad**: La cantidad de armas que puede tener el carro
- **Aumento de ataque**: El valor que puede incrementar el ataque de todas las armas del carro (este valor también puede ser negativo y reducir el ataque)
- **Capacidad de nitro**: El valor de nitro necesario para activar el nitro del carro
- **Duración del nitro**: La cantidad de turnos que dura el nitro activado
- Cuando el nitro está activado, el carro recibe estas propiedades:
  - **Resistencia**: El valor que reduce todos los ataques que recibe
  - **Incremento de ataque**: El valor que estrictamente incrementa el ataque de todas las armas (no sobrescribe el aumento de ataque, se suma con él).

En las reglas estándares de poderes, es común que todas estas propiedades sean modificadas de forma temporal o permanente en un carro, pero en el modo estándar normal, estas propiedades no son modificables en ninguna circunstancia.

##### Tipos de carros
Los carros pueden ser de distintos tipos, que pueden servir para dar "paridad" al juego original de las cartas. Los tipos de carros son:
- **Normal**: El tipo de carro normal, nada que agregar.
- **Eléctrico**: No tiene nitro. Se recarga automáticamente a medida que avanzan los turnos, y se activa y desactiva automáticamente. En vez de la capacidad de nitro, la carta indica la cantidad de turnos que tarda en cargarse, y la duración indica la cantidad de turnos que dura activo. Empieza a cargarse en el instante en que se coloca en el tablero, y avanza al final de la ronda, igual que la duración del nitro. Tiene la ventaja de no depender de los valores de nitro: esto ayuda a tener mejoras automáticas sin la necesidad de gastar valores, y ayuda bastante en modos en donde se da poco nitro. Pero tiene la desventaja de que puede ser activado y desactivado en momentos de poca utilidad.
- **Moto**: Su nitro se activa igual que el de un carro normal, gastando su capacidad de nitro, pero no tiene duración: cuando se le activa el nitro, dura hasta que sea destruida la moto. La ventaja es evidente, una mejora permanente a la moto. Pero tiene la desventaja de que, más allá de que requiere bastante nitro en primer lugar (evitando activar el nitro en otros carros que tal vez lo necesiten de manera más urgente), puede ser gravemente penalizada si llega a ser destruida sin haber aprovechado la mejora del nitro.
- **Todoterreno**: Puede ser colocado en el tablero, ponerle un arma y atacar con tan solo uno de poder. El arma tiene que salir de la mano; no puede ser sacada de la pila en ese momento. No es obligatorio hacer las tres cosas, pero es la razón de ser del todoterreno. Después de atacar, no puede volver a atacar hasta que pasen los turnos de espera que indica la carta. Durante ese tiempo se puede hacer todo con él excepto atacar, y después actúa como un carro normal (sujeto a pruebas). La ventaja es obvia, 3 acciones con tan solo uno de poder. Se puede dar un ataque, generalmente fuerte, sin que el jugador enemigo pueda prepararse. La desventaja es que queda inútil por algunos turnos, haciéndolo un blanco fácil para contraataques, y en general haciéndolo una carga en el tablero.

En un futuro podrán existir otros atributos especiales, como que sean resistentes (o vulnerables) a los otros tipos de ataque, pero para esta versión del juego será así.

#### Carta de arma
Las cartas de arma son las que te permiten atacar y destruir tus carros enemigos. También son usados por tu enemigo para destruir los tuyos. Para poder ser usados, tienen que ser colocados alrededor del carro. De esta forma, se convierte en el arma del nombre del carro. Un carro solo puede tener máximo la capacidad que tiene la carta de carro. El arma también será influenciada por el valor del aumento de ataque en todos y cada uno de sus ataques hechos, y por el valor de incremento cuando el nitro del carro este activado. Los elementos de cada carta de arma es la siguiente:
- **Ataques**: Cada arma tendrá mínimo 3 listas de 6 números. Cada lista son los ataques posibles en cada nivel del arma, y el ataque se define con un dado que da el valor de carga (se explica en [Atacar](#acciones-disponibles)).
- **Energía**: La cantidad de veces que puede ser usado el arma.
- **Material necesario**: Los materiales específicos y cada respectiva cantidad necesario para mejorar.

##### Tipos de ataques
Cada arma también puede tener distintos tipos de ataques, que son los siguientes:
- **Normal**: Lo mismo, el tipo normal, nada que agregar.
- **Explosivo**: Hace un ataque explosivo, es decir, el mismo ataque puede dañar a varios carros. El tipo de explosión y el daño de explosivo pueden cambiar con cada nivel del arma.
  - **Tipo de explosión**:
    - *Explosión pequeña*: Les hace daño a dos carros: al carro atacado y a uno de sus vecinos. Si el carro atacado está en un extremo, le hace daño a su único vecino. Si está en el centro, la carta indica si tiene prioridad a la izquierda o a la derecha. Si el carro atacado está aislado, no le hace daño a ningún otro carro.
    - *Explosión grande*: Les hace daño a los tres carros del enemigo.
  - **Daño de explosivo**: El daño a los otros carros se calcula sobre el ataque completo (carga, aumento de ataque e incremento por nitro). Después, cada carro afectado resta su propia resistencia, si tiene el nitro activado.
    - *25%*: El daño que se le hace a los otros carros será el 25% del ataque principal, redondeado al suelo. Es decir, si el valor reducido no llega a 1, simplemente no hace daño de explosivo a otro carro.
    - *50%*: El daño que se le hace a los otros carros será reducido a la mitad del ataque principal, redondeado al entero más cercano (un .5 se redondea hacia arriba). Causando más ataque en algunos casos.
    - *75%*: El daño que se le hace a los otros carros será reducido un 25%, esta vez redondeado al techo. Esto causará más ataque en la mayoría de los casos.
    - *100%*: El daño será el mismo que el principal para los carros afectados. Salvo alguna arma especial, ninguna arma tendrá este valor en su primer nivel.
  - Si la explosión destruye varios carros, el jugador atacante recibe las 3 unidades de nitro por cada carro destruido.
- **Fuego**: Causa daño al carro cada turno. Cuando el ataque le hace daño al carro, además del daño normal, el carro queda en llamas. Si el ataque no le hace daño, no se prende el fuego (sujeto a pruebas). El daño del fuego es un valor fijo de la carta, separado del ataque, y la duración del fuego también aparece en la carta, dentro del ataque. El fuego quema al principio de la ronda del jugador afectado. Si un carro que ya está en llamas vuelve a ser prendido, se reinicia la duración del fuego. Si el fuego destruye un carro, el jugador dueño del arma recibe las 3 unidades de nitro.
  - **Tipos de fuego**:
    - *Fuego normal*: El fuego normal, solo hace daño cada turno. Su daño sí es reducido por la resistencia del nitro.
    - *Fuego amarillo*: El daño que causa el fuego no es reducido por la resistencia del nitro.
    - *Fuego azul*: Junto con lo anterior, es permanente. Es decir, dura hasta ser apagado por algún poder o hasta que el carro sea destruido.

En las siguientes categorías, un arma podrá ser explosiva y de fuego a la vez.

#### Carta de material
Las cartas de material son cartas de soporte que te permiten mejorar las armas a mejores propiedades (o al menos esa es la idea con la mayoría de las armas). No es obligatorio para ganar la partida, pero si mejoras de forma inteligente tus armas, tendrás una ventaja indiscutible con tu enemigo. Cada vez que mejoras, también recargarás la energía del arma, entonces también es la forma perfecta de mantener atacando por más tiempo un arma en específico. Los elementos que se encuentran en una carta de material son los siguientes:
- **Cantidad**: La cantidad del material por carta. Puede ser x1, x3, x5 o x10.
- **Créditos**: Los créditos que gasta la carta para poder crear un mazo. No influye en la partida, solo en la creación del mazo.

Puede haber cartas especiales con cantidades especiales. Pero serán raras y difíciles de encontrar. Ten ojo.

En las reglas estándares de poderes, no existirán poderes que te agreguen cartas de material directamente, pero sí podrán ayudarte a mejorarlas con más facilidad.

#### Carta de poder
Las cartas de poder son las que causan un sinfín de efectos en el campo de batalla automovilístico. Solo se usan en las reglas estándares de poderes, entonces su explicacion quedara para otro momento.

### Preparación
Para las reglas estándares de 5 carros por jugador, es necesario que se tenga en tu mazo, y por separado, las siguientes cartas (todas tienen que ser de la misma categoría de forma obligatoria):
- 5 cartas de carros
- 40 cartas de armas (libertad de colocar lo que se desee)
- 60 cartas de material (600 créditos máximo)
- 20 cartas de poder (Para las reglas estándares de poderes, no permitido en las reglas estándares normales).

Cada carta de material tiene créditos, usados solamente para la construcción del mazo. Sumando todos los créditos de las 60 cartas de material no pueden superar los 600 créditos. Los créditos no tienen efecto en la partida.

Después de tener listo el mazo con las cartas respectivas separadas, para poder empezar la partida, se tienen que colocar las pilas de cartas de armas y materiales boca abajo y por separado, y las cartas de carros se ponen al frente tuyo, justo al lado del tablero, de forma que el otro jugador las pueda ver con facilidad. Al inicio, la mano de cada jugador tiene solamente sus 5 cartas de carro; no se reparte ninguna otra carta. Para decidir quién empieza, se tira el dado. El de mayor puntuación empieza la partida.

En el tablero, te corresponden las 3 casillas de carros (azul) junto con las 8 casillas de armas alrededor de ella (gris) que están de tu lado.

### Estructura del turno
En cada turno, van a haber 2 rondas, una jugada por cada jugador. El turno lo empieza el que comenzó la partida. Al principio de cada turno (a excepción del primero) se le otorga a cada jugador 1 unidad de nitro acumulable, y en cada ronda cada jugador tendrá exactamente una acción que podrá hacer. Esto es llamado **poder**, y cada jugador tiene la libertad de usar su poder como guste, ya que no existen límites específicos de qué hacer a medida que avanzan los turnos. También puedes formar tu estrategia con paciencia, ya que no existen límites de turnos disponibles. Las acciones, intuitivamente, deben ser legales; las acciones legales serán descritas después. Pero sí existen limitantes. El jugador obligatoriamente tiene que gastar su poder en algo, y un jugador no puede pasar 3 turnos completos sin tener un carro en el tablero (contando desde el inicio de la partida). En el tercer turno, debe obligatoriamente colocar cualquiera que tenga en su mano de carros.

Al final de la ronda, el jugador tiene que restarle 1 a la duración de todos sus carros que tengan el nitro activado (a excepción del carro al que se le activó el nitro en esa misma ronda). Si esa duración llega a 0, su nitro queda desactivado. Más detalles vendrán después.

Cuando el segundo jugador termina su ronda, se sigue al siguiente turno, en el que se le otorga el valor de nitro a cada jugador, y se repite el ciclo.

### Acciones disponibles
Cada jugador en su respectiva ronda tiene un poder que puede usar en una serie de cosas. Este poder no se debe confundir con las cartas de poder: el poder es la acción que tienes en tu ronda (y, en las reglas estándares de poderes, también lo que gastas para usar esas cartas).

- **Colocar carro**: Lo principal que puede hacer es colocar una carta de carro en las casillas de carro que te corresponden. Solo puedes tener 3 carros al mismo tiempo, e intenta tener por lo mínimo un carro en todo momento en el tablero. Si no tienes un carro en el tablero por 3 turnos, en el tercero se te obligará a poner uno.
- **Colocar arma**: Si tienes un carro con capacidad disponible, puedes colocarle una carta de arma, que la puedes colocar libremente en alguna de las 8 casillas que están alrededor del carro correspondiente. La posicion no afecta las propiedades de la carta.
- **Sacar cartas**: Si tienes cartas disponibles en las pilas, puedes sacar cartas de las pilas de armas y materiales. Puedes sacar 1 carta de arma o 5 cartas de material por poder. Estas cartas son de visualización privada, y no las debería ver el otro jugador. Se mantienen en la mano, pero en un lugar aparte de las cartas de carros. No hay límite de cartas en la mano: puedes sacar todas las que quieras mientras queden cartas en las pilas. Como ya gastaste tu poder en sacarlas, no las puedes usar en esa misma ronda, sino a partir de tu siguiente ronda.
- **Activar el nitro de un carro**: Si tienes el nitro necesario, puedes gastar la cantidad que diga la "Capacidad de nitro" del carro para activar su nitro. Cuando un carro está en este efecto, todos los ataques que haga en las siguientes rondas aumentan y tiene una resistencia a todos los ataques que reciba. Este efecto dura la cantidad de turnos dicha en "Duración del nitro". No se puede activar el nitro de un carro que ya lo tiene activado.
- **Mejorar un arma**: Si se cumple con la cantidad de materiales dichos en "Material necesario", se pueden gastar esas cartas de material para subir de nivel el arma. Cuando un arma se mejora, su energía será recargada a su valor por defecto y ahora atacará con los valores dichos en el nuevo nivel. El último nivel que muestra la carta es el nivel máximo. Las cartas de material gastadas se devuelven a la pila de cartas de material, y la pila se baraja.
- **Atacar**: Esta acción es la crucial para darte la victoria.

#### Atacar
Si decides atacar, primero que todo, tienes que tirar el dado. El resultado del dado es la **carga** que hará el arma con la que decidas atacar. El ataque que haga el arma dependerá de la carga. Tirar el dado para sacar la carga NO es un compromiso para atacar. Si se tira el dado y se consigue una carga no favorable, se puede hacer cualquier otra acción y no es obligatorio atacar. El dado solo se puede tirar una vez por ronda.

Al conseguir la carga y decidir atacar, se selecciona el arma que se quiere usar y el carro enemigo al que se ataca. El daño que sufrirá el carro atacado se calcula así:

```
Daño = Ataque de la carga + Aumento de ataque + Incremento por nitro – Resistencia
```

- **Ataque de la carga**: Busca la lista de ataques del nivel actual del arma. La carga indica qué posición de esa lista se usa, contando de izquierda a derecha: carga 1 es el primer número de la lista, y carga 6 es el sexto.
- **Aumento de ataque**: Súmale el "Aumento de ataque" del carro que ataca. Si es negativo, se resta.
- **Incremento por nitro**: Solo si el carro que ataca tiene el nitro activado, súmale su "Incremento de ataque".
- **Resistencia**: Solo si el carro atacado tiene el nitro activado, réstale su "Resistencia".

Si el resultado es 0 o menor que 0, el carro atacado no sufre daño alguno, pero el poder del atacante igualmente se gasta. Si no, al carro atacado se le resta ese daño de su vida.

> **Ejemplo**: un arma en nivel 2 tiene la lista de ataques (2, 3, 4, 5, 6, 7), y la carga es 4. El cuarto número de la lista es 5. El carro que ataca tiene un aumento de ataque de 1, entonces el ataque sube a 6. Además, tiene el nitro activado con un incremento de ataque de 1, entonces sube a 7. El carro atacado tiene el nitro activado con una resistencia de 2, entonces el daño final es 5. El carro atacado pierde 5 de vida.

Si el carro atacado llega a ser destruido, se tiene que quitar inmediatamente del tablero, las cartas de armas que tenía se le regresan a la mano del jugador afectado, y el carro termina siendo descartado de la partida. No puede volver a ser usado en la partida. También, el jugador atacante será recompensado con 3 unidades de nitro.

Después de atacar, se reduce en uno el valor de la energía del arma que se usó. Si la energía llega a 0, la carta es removida del tablero y es descartada de la partida. No puede volver a ser usada.

### Condiciones de victoria
Si un jugador llega a destruir las 5 cartas de carros del otro jugador, la partida inmediatamente acaba y el jugador que sigue teniendo cartas de carros será considerado el ganador. Esto también significa que, si un jugador ya no tiene carros ni en el tablero ni en la mano, pierde la partida.

El único caso en el que se puede declarar un empate es si los dos jugadores, por la razón que sea, se quedan sin armas para poder atacar: ninguna arma con energía en el tablero, en la mano o en la pila. Este y solo este caso se podrá declarar empate bajo las reglas estándares.

### Variaciones
Estas variaciones no son las establecidas por las reglas estándares, pero sí pueden ser modificadas si se prefiere un tipo de experiencia distinto. Las variaciones que se vayan a usar se acuerdan antes de empezar la partida y aplican durante toda la partida.

- **Máxima cantidad de turnos**: Si se quiere tener una partida corta o con un límite establecido para hacer una partida más ofensiva, se puede establecer una cantidad máxima de turnos que la partida no puede superar. Si se llega al turno máximo y ninguno de los jugadores ha conseguido destruir los carros del otro jugador, se decide como ganador el que más carros tenga disponibles o, mejor dicho, el jugador al que menos carros se le han destruido. Si ambos tienen la misma cantidad de carros, se declara empate.
- **Método de carga**: Se puede cambiar la forma en la que se saca la carga para el ataque. El método estándar es el *Informado individual*, descrito en [Atacar](#atacar): cada jugador tira el dado en su ronda antes de decidir si ataca, y puede no atacar si la carga no le conviene. Las alternativas son las siguientes:
  - *Aleatorio*: Se tira el dado en el instante que se vaya a atacar. Es decir, cuando se decida el arma y a qué carro atacar. El valor que saque el dado es la carga que se hará, y no puede ser modificada ni el jugador atacante puede retractarse.
  - *Informado dual*: Solo se tira el dado una vez por turno. El primer jugador lo tira cuando empieza su ronda, y esa carga, visible para los dos jugadores, será exactamente la misma que tendrá el segundo jugador en su ronda. El segundo jugador no tira el dado.
  - *Guionizado*: Antes de la partida, se acuerda y se escribe una lista de cargas, de la longitud que se desee y visible para los dos jugadores. Cada jugador recorre la lista por su cuenta, y solo avanza cuando ataca: su primer ataque usa la primera carga, su segundo ataque la segunda, y así sucesivamente. Cuando un jugador llega al final de la lista, vuelve a empezar desde la primera carga.
- **Sin mejoras**: Si se decide no jugar con mejoras de armas, las cartas de material quedan prohibidas y no se incluyen en el mazo, y correspondientemente, no se podrá mejorar ningún arma. Al sacar cartas, solo se podrán sacar cartas de armas.
- **Recargar arma después de mejorar**: Se puede decidir que, cuando se mejora un arma, se sume la energía por defecto a la energía actual del arma, en vez de llevar la energía al valor predeterminado sin importar su valor anterior. Por ejemplo, si un arma tiene 2 de energía y su energía por defecto es 4, después de mejorarla quedará con 6. La energía no tiene tope, por lo que se puede acumular sin límite.
- **Cambios en las unidades de nitro**: Se pueden cambiar las unidades de nitro que se entregan en cada turno (1 por defecto) y la cantidad con la que se recompensa por destruir un carro (3 por defecto). Se pueden cambiar a los valores que se desee, pero se recomienda no poner un numero muy alto de nitro por turno para evitar una saturacion del nitro. Cualquiera de los valores puede ser 0, es decir, que no se entregue nitro al pasar de turno o destruir un carro. Si los dos valores son 0, el nitro no queda necesariamente "desactivado", pero es imposible activarlo bajo reglas estandares.

## LO QUE SE TIENE QUE HACER
El objetivo definitivo "ultimate" es tener un juego con algo de progreso, pero va a tomar mucho tiempo eso.
El objetivo mas aterrizado a tierra es tener un juego que se pueda jugar o en solitario con una IA (mas un bot con algoritmos) o local con dos jugadores (online queda extremadamente fuera de juego para esto), que PRINCIPALMENTE tiene que tener lo siguiente:

- Una "serie" de cartas son: 5 carros, 3 armas y 2 poderes.
- Las categorias tendran que tener lo siguiente:
    - Categoria 1: 6 series
    - Categoria 2: 5 series
    - Categoria 3: 4 series
    - Categoria 4: 3 series
    - Categoria 5: 2 series
    - Categoria 6: 1 serie

Mi sueño es algun dia tener POR LO MENOS esto logrado. Al menos que solo sea jugable localmente con dos jugadores.

Tambien, el primer modo que se va a lograr es sin poderes, pero el objetivo sera hacer el modo con poderes. Y despues en los dos estan de que si el ataque es aleatorio en el momento de atacar, o ya se sabe el numero antes de atacar. Vamos viendo como se hacen los modos.

### Pasos a corto plazo
#### Minimum Viable Product
El minimum viable producto ya fue, en un sentido tecnico,  logrado. Si se agregan mas cartas, el juego es perfectamente jugable. AHORA MISMO ya es perfectamente jugable. El tema es que sin mas carros es medio tedioso.

#### battle-phantasm
Este es el ultimo paso para darle "paridad" al juego fisico. Agregar los tipos carros, y los tipos de ataques. Asi, el juego fisico con el digital funcionarian de la exactama misma forma. 

battle-phantasm, como su ultimo paso, sera agregar el kit inicial azul y rojo. Sera 2 series extra que tendra el jugador 1 y jugador 2 respectivamente. Despues de terminar lo anterior de battle-phantasm, este proceso solo sera en dibujar las cartas, sin tocar nada del codigo.



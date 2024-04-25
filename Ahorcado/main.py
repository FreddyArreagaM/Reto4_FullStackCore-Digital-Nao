import random

IMÁGENES_AHORCADO = ['''      
  +---+
      |      
      |      
      |      
     ===''', '''      
  +---+      
  O   |
      |      
      |      
     ===''', '''      
  +---+      
  O   |      
  |   |      
      |      
     ===''', '''      
  +---+      
  O   |      
 /|   |      
      |      
     ===''', '''      
  +---+      
  O   |      
 /|\  |      
      |      
     ===''', '''      
  +---+      
  O   |      
 /|\  |      
 /    |      
     ===''', '''      
  +---+      
  O   |      
 /|\  |      
 / \  |      
     ===''']

palabras = {'Animales': 'murcielago oso gato pantera perro burro pato pez rana cabra leon lagarto mono alce raton nutria buho panda'.split()}


def obtenerPalabraAlAzar(diccionarioDePalabras):
    return random.choice(diccionarioDePalabras['Animales']), 'Animales'


def mostrarTablero(letrasIncorrectas, letrasCorrectas, palabraSecreta):
    print(IMÁGENES_AHORCADO[len(letrasIncorrectas)])
    print()
    print('Letras incorrectas:', end=' ')
    for letra in letrasIncorrectas:
        print(letra, end=' ')
    print()
    espaciosVacíos = '_' * len(palabraSecreta)

    for i in range(len(palabraSecreta)):
        if palabraSecreta[i] in letrasCorrectas:
            espaciosVacíos = espaciosVacíos[:i] + palabraSecreta[i] + espaciosVacíos[i + 1:]

    for letra in espaciosVacíos:
        print(letra, end=' ')
    print()


def obtenerIntento(letrasProbadas):
    while True:
        print('Adivina una letra.')
        intento = input().lower()
        if len(intento) != 1:
            print('Por favor, introduce una letra.')
        elif intento in letrasProbadas:
            print('Ya has probado esa letra. Elige otra.')
        elif intento not in 'abcdefghijklmnñopqrstuvwxyz':
            print('Por favor ingresa una LETRA.')
        else:
            return intento


def jugarDeNuevo():
    print('¿Quieres jugar de nuevo? (sí o no)')
    return input().lower().startswith('s')


print('A H O R C A D O')

letrasIncorrectas = ''
letrasCorrectas = ''
palabraSecreta, conjuntoSecreto = obtenerPalabraAlAzar(palabras)
juegoTerminado = False

while True:
    print('La palabra secreta pertenece al conjunto: ' + conjuntoSecreto)
    mostrarTablero(letrasIncorrectas, letrasCorrectas, palabraSecreta)

    intento = obtenerIntento(letrasIncorrectas + letrasCorrectas)

    if intento in palabraSecreta:
        letrasCorrectas += intento
        encontradoTodasLasLetras = all(letra in letrasCorrectas for letra in palabraSecreta)
        if encontradoTodasLasLetras:
            print('¡Sí! ¡La palabra secreta es "' + palabraSecreta + '"! ¡Has ganado!')
            juegoTerminado = True
    else:
        letrasIncorrectas += intento
        if len(letrasIncorrectas) == len(IMÁGENES_AHORCADO) - 1:
            mostrarTablero(letrasIncorrectas, letrasCorrectas, palabraSecreta)
            print('¡Te has quedado sin intentos!\nDespués de ' +
                  str(len(letrasIncorrectas)) + ' intentos fallidos y ' +
                  str(len(letrasCorrectas)) + ' aciertos, ' +
                  'la palabra era "' + palabraSecreta + '"')
            juegoTerminado = True

    if juegoTerminado:
        if jugarDeNuevo():
            letrasIncorrectas = ''
            letrasCorrectas = ''
            juegoTerminado = False
            palabraSecreta, conjuntoSecreto = obtenerPalabraAlAzar(palabras)
        else:
            break


#Función
def numero_palabras(numero):

    # Validamos que el número sea 0
    if(numero == 0):
        return 'Cero'
    
    elif (numero >= 0):

        palabras = ''

        # Unidades de los digitos en palabras
        unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
           #         0    1      2      3        4         5        6       7        8       9   
        decenas = ['', 'dieci', 'veinti', 'treinta y', 'cuarenta y', 'cincuenta y ', 'sesenta y ', 'setenta y ', 'ochenta y ', 'noventa y']
           #              10       20         30            40            50            60             70            80            90    
        centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatroscientos', 'quinientos', 'seiscientos', 'setescientos', 'ochoscientos', 'novescientos']
           #               100         200           300             400             500            600            700             800             900 
           
        # Se convierte el número a str asegurando que siempre tenga tres digitos
        numero = '0' * (3 - len(str(numero))) + str(numero)

        # Convertimos cada digito a numero 
        unidad = int(numero[-1])
        decena = int(numero[-2])
        centena = int(numero[-3])

        palabras = '{} {} {}'.format(centenas[centena], decenas[decena], unidades[unidad]).strip()

        # print(palabras)

        # Casos especiales de escritura

        palabras = palabras.replace('dieciuno', 'one')
        palabras = palabras.replace('diecidos', 'doce')
        palabras = palabras.replace('diecitres', 'trece')
        palabras = palabras.replace('diecicuatro', 'catorce')
        palabras = palabras.replace('diecicinco', 'quince')

        # Validación para corregir las palabras cuando el valor de la centena es 0
        if palabras.endswith('dieci'):
            palabras = palabras.replace('dieci', 'diez')
        elif palabras.endswith('veinti'):
            palabras = palabras.replace('veinti', 'veinte')
        elif palabras.endswith(' y '):
            palabras = palabras[:-2]
        elif palabras.endswith('ciento'):
            palabras = palabras.replace('ciento', 'cien')

        return palabras.capitalize()
    
# Solicita un número por consola
numero = int(input("Ingrese un número de hasta 3 digitos: "))

print(numero_palabras(numero))
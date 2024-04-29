saldo = 100 

def consultar_saldo():
    print("Tu saldo actual es: $" + str(saldo))

def recargar_saldo():
    global saldo
    print("Introduce el monto a recargar:")
    while True:
        monto = input()
        if monto.isdigit():
            monto = float(monto)
            break
        else:
            print("Por favor, introduce solo números.")
    saldo += monto
    print("\nRecargaste $", monto, "correctamente")
    print("Saldo actual: $" + str(saldo))

def transferir_saldo():
    global saldo
    print("\nIntroduce el número de teléfono del destinatario:")
    while True:
        destinatario = input()
        if destinatario.isdigit() and len(destinatario) == 10:
            break
        else:
            print("El número de teléfono debe tener 10 dígitos. Por favor, inténtalo nuevamente.")
    print("Introduce el monto a transferir:")
    while True:
        monto = input()
        if monto.isdigit():
            monto = float(monto)
            break
        else:
            print("Por favor, introduce solo números.")
    if monto <= saldo:
        saldo -= monto
        print("Has transferido $", monto, " al número", destinatario, ". Saldo restante: $" + str(saldo))
    else:
        print("Saldo insuficiente.")

def menu():
    while True:
        print("\nMenú USSD:")
        print("1. Consultar saldo")
        print("2. Recargar saldo")
        print("3. Transferir saldo")
        print("4. Salir")

        opcion = input("\nSelecciona una opción: ")

        if opcion == "1":
            consultar_saldo()
        elif opcion == "2":
            recargar_saldo()
        elif opcion == "3":
            transferir_saldo()
        elif opcion == "4":
            print("Gracias por usar nuestro servicio CLARO USSD. ¡Hasta luego!")
            break
        else:
            print("Opción inválida. Por favor, selecciona una opción válida.")

if __name__ == "__main__":
    menu()

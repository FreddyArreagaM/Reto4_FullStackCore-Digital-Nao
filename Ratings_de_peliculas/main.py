import requests
import json

#Url API 
url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTVlZjk0NjM5NThlMDEwZjVlZjU3MzFhYjkwZTliOSIsInN1YiI6IjY2MjVjNzcxYjlhMGJkMDE2MWQ1NTA3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7jDALoVHchsueYs6VRicaknjB6wPwrMG4m6cC4dn-Xk"
}

response = requests.get(url, headers=headers)

 # Verifica si la solicitud fue exitosa antes de imprimir el JSON
if response.status_code == 200:
    # Carga la respuesta JSON en un diccionario
    data = response.json()
    # Imprime el JSON con formato
    #print(json.dumps(data, indent=4))

    for movie in data['results']:
        # Imprime el título y la puntuación de cada película
        print("Título:", movie['title'])
        print("Top rated:", movie['vote_average'])
        print()
else:
    print("Error al obtener la respuesta:", response.status_code)

from flask import Flask, render_template

app = Flask(__name__)

# Ruta para la página de inicio y el formulario de inicio de sesión
@app.route("/")
def start():
    return render_template("index.html")

@app.route("/paint")
def paint():
    return render_template("paint.html")

if __name__ == "__main__":
    app.run(debug=True)

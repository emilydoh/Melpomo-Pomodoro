from flask import Flask, render_template, url_for
import time

app = Flask("Melpomo")

#landing page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/movies')
def movies():
    index = 0
    
    # Read movie data from JSON file
    with open('movies.json', 'r') as json_file:
        all_movies = json.load(json_file)
    
    # Ensure index is within bounds
    if index < 0 or index >= len(all_movies):
        return "Index out of bounds", 400

    # Retrieve movie data at the specified index
    movie_data = all_movies[index]

    # Return JSON response
    return jsonify(movie_data)

if __name__ == '__main__':
    app.run(debug=True)



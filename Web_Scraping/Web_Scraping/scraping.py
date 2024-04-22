from typing import List
import requests

from bs4 import BeautifulSoup
import reflex as rx
import requests as rq
import json

# Define names as a global variable
names = ["FreddyArreagaM", "FontalvoJ", "Dranceer", "BernardoParrales", "BernardoParralesG"]

# Definición del ruteo la url y el title de esa pagina
@rx.page(route="/web", title="Web Scraping")

# Definición del metodo 
def main() -> rx.Component:
    data = [scrape_github_user(name) for name in names]
    save_data_to_json(data, "github_users.json")

def scrape_github_user(username: str) -> dict:
    """Scrapes a GitHub user's profile data."""
    url = f"https://api.github.com/users/{username}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def save_data_to_json(data: List[dict], file_path: str):
    """Saves data to a JSON file."""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)
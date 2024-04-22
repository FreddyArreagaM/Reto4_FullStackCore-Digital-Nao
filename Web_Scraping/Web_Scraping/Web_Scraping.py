
from rxconfig import config

import reflex as rx

class State(rx.State):
    """The app state."""

def index() -> rx.Component:
    return rx.center(
        #rx.theme_panel(),
        rx.vstack(
            rx.heading("Web Scraping!", size="9"),
            rx.button(
                "Iniciemos!",
                on_click=lambda: rx.redirect('/web'),
                size="4",
            ),
            align="center",
            spacing="7",
            font_size="2em",
        ),
        height="100vh",
    )

app = rx.App()
app.add_page(index)

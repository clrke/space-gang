import requests
from PIL import Image
from io import BytesIO
import json


TOKEN_BASE_URI = 'https://shinji.xyz/api/unit-00/nft/'


def get_bottom_left_pixel(id):
    token_uri = f"{TOKEN_BASE_URI}{id}"
    metadata = requests.get(token_uri).json()
    image_url = metadata['image']

    response = requests.get(image_url)

    image = Image.open(BytesIO(response.content))
    pixels = image.load()
    width, height = image.size
    pixel = pixels[0, height-1]
    print(pixel)
    return pixel


pixels = [get_bottom_left_pixel(id) for id in range(6077, 9000)]
with open("pixels.json", "w") as f:
    json.dump(pixels, f)

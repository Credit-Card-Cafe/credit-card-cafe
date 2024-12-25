import json
import os
from PIL import Image, ImageDraw, ImageFont

# Load JSON file
with open('cards.json') as f:
    data = json.load(f)

# Set dimensions
width, height = 289, 181

# Optional: Load a custom font (uncomment the following line if you have a font file)
# font = ImageFont.truetype("path/to/your/font.ttf", 20)
font = ImageFont.load_default()  # Default PIL font

# Loop through each card in the JSON array
for card in data:
    # Get card details
    card_url = card.get("card_url", "")
    card_color = card.get("card_color", "#FFFFFF")  # Default color if not specified
    card_name = card.get("card_name", "Unknown Name")
    card_bank = card.get("card_bank", "Unknown Bank")

    # Define the filename for the JPEG image
    filename = f"{card_url}.jpeg"

    # Check if the file already exists
    if os.path.exists(filename):
        print(f"{filename} already exists, skipping.")
        continue

    # Create a new image with the specified color and dimensions
    try:
        # Convert hex color to RGB
        if card_color.startswith('#'):
            card_color = card_color[1:]
        color = tuple(int(card_color[i:i+2], 16) for i in (0, 2, 4))

        # Create image and draw object
        image = Image.new("RGB", (width, height), color)
        draw = ImageDraw.Draw(image)

        # Define text positions
        name_position = (10, 10)  # Top-left for the name
        bank_position = (10, 40)  # Below the name for the bank

        # Draw text onto the image
        draw.text(name_position, card_name, fill="black", font=font)
        draw.text(bank_position, card_bank, fill="black", font=font)

        # Save the image as a JPEG
        image.save(filename, "JPEG")
        print(f"Created {filename} with name '{card_name}' and bank '{card_bank}'")

    except ValueError as e:
        print(f"Error creating {filename}: {e}")

from PIL import Image, ImageDraw, ImageOps

def create_circular_image(input_path, output_path, border_width=10, border_color=(255, 0, 0)):
    """
    Crops an image into a circle and adds a colored border.
    
    :param input_path: Path to the source image.
    :param output_path: Path where the result will be saved.
    :param border_width: Thickness of the border in pixels.
    :param border_color: Tuple (R, G, B) or (R, G, B, A) for the border color.
    """
    # 1. Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Ensure the image is square
    width, height = img.size
    min_dim = min(width, height)
    img = ImageOps.fit(img, (min_dim, min_dim), centering=(0.5, 0.5))
    size = img.size[0]

    # 2. Create the circular mask for the image crop
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply the mask to the image (Circular Crop)
    circular_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    circular_img.paste(img, (0, 0), mask=mask)

    # 3. Create a new canvas for the border
    # The new size will be the original size + double the border width
    new_size = size + (border_width * 2)
    final_img = Image.new("RGBA", (new_size, new_size), (0, 0, 0, 0))
    
    # Draw the colored border circle
    draw_border = ImageDraw.Draw(final_img)
    draw_border.ellipse((0, 0, new_size, new_size), fill=border_color)
    
    # 4. Paste the circular image onto the border background
    # We center the image by offsetting it by the border_width
    final_img.paste(circular_img, (border_width, border_width), mask=circular_img)

    # 5. Save the result
    final_img.save(output_path, "PNG")
    print(f"Success! Image saved to {output_path}")

# --- Configuration ---
if __name__ == "__main__":
    # Replace 'input.jpg' with your actual filename
    input_filename = "mtr_train1.png" 
    output_filename = "circular_bordered_image.png"
    
    # Customize these values:
    b_width = 15
    b_color = (60, 179, 113)  # Medium Sea Green (RGB)

    try:
        create_circular_image(input_filename, output_filename, b_width, b_color)
    except FileNotFoundError:
        print("Error: The input file was not found. Please check the path.")
    except Exception as e:
        print(f"An error occurred: {e}")

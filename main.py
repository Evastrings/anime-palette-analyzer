from color_extractor import extract_dominant_colors
from color_data import rgb_to_hex
from visualize_palette import visualize_palette
from palette_generator import save_palette_to_file


def main():
    image_path = "./images/horikita.jpg"
    n_colors = 5
    
    colors, percentages = extract_dominant_colors(image_path, n_colors)
    
    hex_codes = [rgb_to_hex(color) for color in colors]
   
    visualize_palette(colors, percentages, hex_codes, output_path="output/horikitav1palete.png")
    
    save_palette_to_file(hex_codes, "output/horikitacode.txt")
    
    print("Anime Palette extraction complete!")

if __name__ == "__main__":
    main()
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io

from services.color_extractor import extract_dominant_colors
from services.color_data import rgb_to_hex


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


@app.get("/yeah")
def check():
    return "Yeah I can see you"

@app.get("/api/analyze")
async def test_endpoint():
    return {"message": 'Yay this is running'}


@app.post("/api/analyze")
async def analyze_image(file: UploadFile = File(...)):
    '''
    Docstring for analyze_image
    
    :file: takes file from ram that user uploads 
    :type file: UploadFile
    
    Returns:
    image_stream: file read from bytes
    '''
    #takes an image in ram
    image_content = await file.read()

    #creates a file from bytes
    image_stream = io.BytesIO(image_content)

    colors, percentages = extract_dominant_colors(image_stream)

    hex_list = []
    rgb_list = []
    for color in colors:
        hex, rgb_intt = rgb_to_hex(color)
        hex_list.append(hex)
        rgb_list.append(rgb_intt)

    keys = ["hex", "rgb", "percentage"]
    extracted_colors = [dict(zip(keys, f_colors)) for f_colors in zip(hex_list, rgb_list, percentages)]
    
    return {"d_colors": extracted_colors}

# import json

# # Data for 5 individuals
# names = ["Alice", "Jon", "Jane", "Vic", "Nelson"]
# ids = [101, 102, 103, 104, 105]
# cities = ["New York", "London", "Paris", "Berlin", "Tokyo"]

# # 1. Define the keys once
# keys = ["name", "id", "city"]

# # 2. Use zip in a list comprehension to create a list of dictionaries
# # Each iteration of zip(names, ids, cities) creates a tuple like ("Alice", 101, "New York")
# data_list = [dict(zip(keys, person_data)) for person_data in zip(names, ids, cities)]

# # 3. Convert the entire list to a formatted JSON string
# json_output = json.dumps(data_list, indent=4)
# print(json_output)


# from services.color_extractor import extract_dominant_colors
# from services.color_data import rgb_to_hex
# from services.visualize_palette import visualize_palette
# from services.palette_generator import save_palette_to_file


# def main():
#     image_path = "./images/megumi.jpg"
#     n_colors = 5
    
#     colors, percentages = extract_dominant_colors(image_path, n_colors)
    
#     hex_codes = [rgb_to_hex(color) for color in colors]
   
#     visualize_palette(colors, percentages, hex_codes, output_path="output/megumi_palete.png")
    
#     save_palette_to_file(hex_codes, "output/hexcodes/megumicode.txt")
    
#     print("Anime Palette extraction complete!")

# if __name__ == "__main__":
#     main()
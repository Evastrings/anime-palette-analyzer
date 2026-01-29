from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io

from app.services.color_extractor import extract_dominant_colors
from app.services.color_data import rgb_to_hex


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["https://anime-palette-analyzer.vercel.app/", "http://localhost:5173"],
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
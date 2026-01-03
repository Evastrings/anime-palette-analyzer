#this file is responsible for extracting color from the Image
from PIL import Image
im = Image.open("./images/2b.jpg")

print(im.format, im.size, im.mode)
im.show()
#this file is responsible for extracting color from the Image
from PIL import Image
import numpy as np

im = Image.open("./images/2b.jpg")

print(im.format, im.size, im.mode)

#converting image to an array
im_array = np.asarray(im)

#resize image to 100 by 100
im_resize = im.resize(size=(100,100))
im_resize.show()
print(im_resize)

#convert resized image to an array
im_array2 = np.asarray(im_resize)

#now changing the shape of 3d array to 2d
h,w,rgb = im_array.shape
im_array_2d = im_array.reshape((h*w, rgb))
print(im_array_2d.shape)

#resized image to 2d
h,w,rgb = im_array2.shape
im_array2_2d = im_array2.reshape((h*w, rgb))
print(im_array2_2d.shape)
print(im_array2_2d.ndim)
print(im_array2_2d.size)
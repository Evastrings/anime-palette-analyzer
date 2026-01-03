#this file is responsible for extracting color from the Image
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


im = Image.open("./images/levi.webp")

print(im.format, im.size, im.mode)

#converting image to an array
im_array = np.asarray(im)

#resize image to 100 by 100
im_resize = im.resize(size=(100,100))
#im_resize.show()
#print(im_resize)

#convert resized image to an array
im_array2 = np.asarray(im_resize)

#now changing the shape of 3d array to 2d
# h,w,rgb = im_array.shape
# im_array_2d = im_array.reshape((h*w, rgb))
# print(im_array_2d.shape)

#resized image to 2d
h,w,rgb = im_array2.shape
print(rgb)
im_array2_2d = im_array2.reshape((h*w, rgb))
# print(im_array2_2d.shape)
# print(im_array2_2d.ndim)
# print(im_array2_2d.size)
# print(np.ones(5))

#using K-means to group the image arrays into clusters
im_ressize_kmeans = KMeans(n_clusters=5, random_state=0, n_init="auto").fit(im_array2_2d)
# print(im_ressize_kmeans)
# print(im_ressize_kmeans.labels_)
# print(im_ressize_kmeans.predict)
# print(im_ressize_kmeans.cluster_centers_)
d_colors = im_ressize_kmeans.cluster_centers_
# print(d_colors.shape)

#visualizing it with matplotlib
color_im = d_colors/255

plt.figure(figsize=(10,2))
plt.bar(range(5), np.ones(5), color=color_im, width=1)
plt.title("Anime Image Color Palletes")
plt.axis('off')


plt.show()

#color.plot()

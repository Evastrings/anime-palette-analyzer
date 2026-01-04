#this file is responsible for extracting color from the Image
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


im = Image.open("./images/akari.png")

print(im.format, im.size, im.mode)

#converting image to an array
im_array = np.asarray(im)

#resize image to 100 by 100
im_resize = im.resize(size=(100,100))


#convert resized image to an array
im_array2 = np.asarray(im_resize)

#resized image to 2d
h,w,rgb = im_array2.shape
im_array2_2d = im_array2.reshape((h*w, rgb))


#using K-means to group the image arrays into clusters
im_ressize_kmeans = KMeans(n_clusters=5, random_state=0, n_init="auto").fit(im_array2_2d)

d_colors = im_ressize_kmeans.cluster_centers_
im_labels = im_ressize_kmeans.labels_
print(im_labels)
print(len(im_labels))
pal_group = np.bincount(im_labels)
print(pal_group)
print(pal_group[3])

pal_cent = (pal_group*100)/len(im_labels)
print(pal_cent)


# print(percent_pallete(pal_group))

#visualizing it with matplotlib
color_im = d_colors/255

# plt.figure(figsize=(10,2))
plt.bar(range(5), np.ones(5), color=color_im, width=1)
plt.title("Anime Image Color Palletes")
#plt.axis('off')
for i in range(5):
    plt.text(x=i, y=0.5, s=f'{pal_cent[i]:.1f}%', ha='center', fontsize=10, color='white')

plt.xlabel('Color percentage and Hex codes')
plt.ylabel('X axis')


plt.show()
#plt.savefig("output/akarrri_palette.png")

#view percentage of each color cluster

# for i in range(5):
#     plt.text(x=i, y=0.5, s=f'{pal_cent[i]:.1f}%', ha='center', fontsize=10, color='white')
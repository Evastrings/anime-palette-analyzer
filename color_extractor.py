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

#Printing out he HEXCODES by converting them first
# After you calculate pal_cent (around line 38)

# Step 1: Convert ONE color to hex first (test it!)
print(d_colors)
for i in range(5):
    print(d_colors[i])
# Pick the first color: d_colors[0]
# for i in range(3):
#     r,g,b

d_colors2 = d_colors.astype(int)

hex_codes_v1 = []
for i in range(5):
    print(d_colors2[i])
    cat2 = '#'
    for j in range(3):
        cat2 = cat2 + format(d_colors2[i][j], 'x')
    hex_codes_v1.append(cat2)

print(hex_codes_v1)

r,g,b = d_colors2[0][0], d_colors2[0][1], d_colors2[0][2]
# Extract R, G, B values
# Convert each to hex
print(f'rgb:{r:x}, {g:x}, {b:x}')
#hex_string = format(number, 'x')
# r = format(r, 'x')
# print(type(r))

cat = '#'
for i in r,g,b:
    cat = cat + format(i, 'x')
print(cat)
# Combine with '#'
# Print it to verify

# Step 2: Once that works, loop through all 5 colors

# print(percent_pallete(pal_group))

#visualizing it with matplotlib
color_im = d_colors/255

# plt.figure(figsize=(10,2))
plt.bar(range(5), np.ones(5), color=color_im, width=1)
plt.title("Anime Image Color Palletes")
#plt.axis('off')
for i in range(5):
    plt.text(x=i, y=0.5, s=f'{pal_cent[i]:.1f}%', ha='center', fontsize=10, color='black')
    plt.text(x=i, y=0.3, s=f'{hex_codes_v1[i]}', ha='center', fontsize=10, color='black')

plt.xlabel('Color percentage and Hex codes')
plt.ylabel('X axis')


plt.show()
#plt.savefig("output/akarrri_palette.png")

#view percentage of each color cluster


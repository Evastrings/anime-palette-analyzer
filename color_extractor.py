#this file is responsible for extracting color from the Image
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


def extract_dominant_colors(image_path, n_colors=5, resize_dim=(100, 100)):
    """
    Extract dominant colors from an image arrays using K-means clustering.
    
    Parameters:
    image_path: path to the image file
    n_colors: number of dominant colors to extract
    resize_dim: tuple (width, height) to resize image
    
    Returns:
    colors: array of RGB colors
    percentages: array of percentages for each color
    """
    # Your code from lines 8-39 goes here
    im = Image.open(image_path)
    
    # resize the image
    size = resize_dim
    im2 = im.resize(size)

    # Convert resized image to array
    im2_array = np.asarray(im2)

    # Convert resized image array to 2D array
    h,w,rgb = im2_array.shape
    im2_array_2d = im2_array.reshape((h*w, rgb))

    #using K-means to group the image arrays into clusters
    im2_resize_kmeans = KMeans(n_clusters=n_colors, random_state=0, n_init="auto").fit(im2_array_2d)

    my_colors = im2_resize_kmeans.cluster_centers_
    im2_labels = im2_resize_kmeans.labels_
    color_group = np.bincount(im2_labels)
    color_percent = (color_group*100)/len(im2_labels)

    return my_colors, color_percent

d_colors, pal_cent = extract_dominant_colors("./images/pfp.jpg")



#Printing out the HEXCODES by converting them first

# d_colors2 = d_colors.astype(int)
# print(f'I AM D_COLORS2 {d_colors2[2]}')

def rgb_to_hex(rgb_color):
    """
    Convert an RGB color to HEX format.
    
    Parameters:
    rgb_color: array with [R, G, B] values (0-255)
    
    Returns:
    string: HEX color code like '#FF5733'
    """
    # Your existing hex conversion logic here
    r, g, b = rgb_color
    cat2 = '#'
    for value in [r, g, b]:
        cat2 = cat2 + format(int(value), '02x')
    return cat2


hex_codes_v1 = []
for i in range(5):
    hex_codes_v1.append(rgb_to_hex(d_colors[i]))

print(hex_codes_v1)

#writing out hexcodes into a file
def save_palette_to_file(hex_codes, output_path):
    """
    Save color palette HEX codes to a text file.
    
    Parameters:
    hex_codes: list of HEX color codes
    output_path: path where to save the file
    """
    # Your file writing code from lines 65-70
    with open(output_path, "w") as file:
        for c_olors in hex_codes:
            file.write(f'{c_olors}\n')


file_path = "output/pfpp_hexcode.txt"
save_palette_to_file(hex_codes_v1, file_path)



#visualizing it with matplotlib
color_im = d_colors/255

# plt.figure(figsize=(10,2))
plt.bar(range(5), np.ones(5), color=color_im, width=1)
plt.title("Anime Image Color Palettes")
#plt.axis('off')
for i in range(5):
    plt.text(x=i, y=0.5, s=f'{pal_cent[i]:.1f}%', ha='center', fontsize=10, color='black')
    plt.text(x=i, y=0.3, s=f'{hex_codes_v1[i]}', ha='center', fontsize=10, color='black')

plt.xlabel('Color percentage and Hex codes')
plt.ylabel('X axis')


plt.show()
#plt.savefig("output/akarrri_palette.png")




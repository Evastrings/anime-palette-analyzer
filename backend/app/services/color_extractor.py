#this file is responsible for extracting color from the Image
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans

def extract_dominant_colors(image_stream, n_colors=5, resize_dim=(100, 100)):
    """
    Extract dominant colors from an image arrays using K-means clustering.
    
    Parameters:
    image_stream: image file from bytes
    n_colors: number of dominant colors to extract
    resize_dim: tuple (width, height) to resize image
    
    Returns:
    colors: array of RGB colors
    percentages: array of percentages for each color
    """
    im = Image.open(image_stream)
    
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



import matplotlib.pyplot as plt

def visualize_palette(colors, percentages, hex_codes, output_path=None):
    """
    Create a bar chart visualization of the color palette.
    
    Parameters:
    colors: array of RGB colors
    percentages: array of percentages
    hex_codes: list of HEX codes
    output_path: where to save (if None, will show instead)
    """
    
    color_im2 = colors/255

    plt.bar(range(5), [1,1,1,1,1], color=color_im2, width=1)
    plt.title("Anime Image Color Palettes")

    for i in range(5):
        plt.text(x=i, y=0.7, s=f'{percentages[i]:.2f}%', ha='center', fontsize=10, color='black')
        plt.text(x=i, y=0.2, s=f'{hex_codes[i]}', ha='center', fontsize=10, color='black')
    plt.xlabel('Color percentage and Hex codes')
    plt.ylabel('X axis')

    plt.savefig(output_path)
    
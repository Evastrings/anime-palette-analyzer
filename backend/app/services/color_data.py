def rgb_to_hex(rgb_color):
    """
    Convert an RGB color to HEX format.
    
    Parameters:
    rgb_color: array with [R, G, B] values (0-255)
    
    Returns:
    string: HEX color code like '#FF5733'
    """
    r, g, b = rgb_color
    cat2 = '#'
    rgb_int = []
    for value in [r, g, b]:
        cat2 = cat2 + format(int(value), '02x')
        rgb_int.append(int(value))
    return cat2, rgb_int

#print(rgb_to_hex([[123.45, 67.89, 234.56], [245.4, 5.7, 99]]))
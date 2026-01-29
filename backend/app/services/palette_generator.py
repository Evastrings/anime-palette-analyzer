def save_palette_to_file(hex_codes, output_path):
    """
    Save color palette HEX codes to a text file.
    
    Parameters:
    hex_codes: list of HEX color codes
    output_path: path where to save the file
    """
    
    with open(output_path, "w") as file:
        for c_olors in hex_codes:
            file.write(f'{c_olors}\n')


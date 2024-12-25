import json
import csv
import sys
import os

SPECIFIED_KEYS = [
    'card_name', 'card_bank', 'card_brand', 'card_network', 'card_type', 
    'card_url', 'card_link', 'card_af', 'card_ftf', 'card_btf', 'card_apr', 
    'card_caf', 'card_lpf', 'card_chip', 'card_embossed', 'card_material', 
    'card_il', 'card_ttp', 'card_weight', 'card_color', 'card_redemption', 
    'card_caapr', 'card_btapr', 'card_lpapr', 'card_subv', 'card_subq', 
    'card_subt', 'card_auc'
]

def json_to_csv(json_file_path, csv_file_path=None):
    # Validate input file
    if not os.path.exists(json_file_path):
        raise FileNotFoundError(f"JSON file not found: {json_file_path}")
    
    # Read JSON file
    with open(json_file_path, 'r', encoding='utf-8') as json_file:
        try:
            data = json.load(json_file)
        except json.JSONDecodeError:
            raise ValueError(f"Invalid JSON format in file: {json_file_path}")
    
    # Determine output file path
    if csv_file_path is None:
        csv_file_path = os.path.splitext(json_file_path)[0] + '.csv'
    
    # Filter data to only include specified keys
    filtered_data = []
    for item in data:
        filtered_item = {k: item.get(k, '') for k in SPECIFIED_KEYS}
        filtered_data.append(filtered_item)
    
    # Write to CSV
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=SPECIFIED_KEYS, restval='')
        writer.writeheader()
        writer.writerows(filtered_data)
    
    return csv_file_path

def main():
    if len(sys.argv) < 2:
        print("Usage: python json_to_csv.py <input_json_file> [output_csv_file]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    try:
        output_path = json_to_csv(input_file, output_file)
        print(f"Conversion successful. CSV file created: {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
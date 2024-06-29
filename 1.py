import json

# Load the JSON files
with open('./kong/_annotations.coco.json', 'r') as f:
    data1 = json.load(f)
with open('test_1.json', 'r') as f:
    data2 = json.load(f)
with open('test_2.json', 'r') as f:
    data3 = json.load(f)

# Initialize merged data
merged_data = {
    
    "info": data1["info"], 
    "licenses": data1["licenses"],
    "categories": data1["categories"],  # Assuming all files share the same categories
    "images": [],
    "annotations": [],
    
}

# Merge images and annotations
merged_data["images"].extend(data1["images"])
merged_data["images"].extend(data2["images"])
merged_data["images"].extend(data3["images"])

merged_data["annotations"].extend(data1["annotations"])
merged_data["annotations"].extend(data2["annotations"])
merged_data["annotations"].extend(data3["annotations"])

# Save the merged data into a new JSON file
with open('merged_file.json', 'w') as f:
    json.dump(merged_data, f)

print("Merging completed successfully.")

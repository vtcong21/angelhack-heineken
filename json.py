# import json
# import os

# name1 = "khoa"
# name2 = "kong"
# name3 = "demo"

    
# for i in [name1,name2,name3]:   
#     with open(os.path.join(os.getcwd(),i,"train/_annotations.coco.json"), 'r') as f:
#         dataset = json.load(f)
#         print(dataset['images'])
#         for j in dataset["categories"]:
#             if(j['id'] != 0):
#                 pass
#     print("//")

import json
import os
name1 = "khoa"
name2 = "kong"
name3 = "demo"

# Load the first dataset
with open(os.path.join(os.getcwd(),name1,"train/_annotations.coco.json"), 'r') as f:
    coco1 = json.load(f)

# Load the second dataset
with open(os.path.join(os.getcwd(),name2,"train/_annotations.coco.json"), 'r') as f:
    coco2 = json.load(f)

# Load the third dataset
with open(os.path.join(os.getcwd(),name3,"train/_annotations.coco.json"), 'r') as f:
    coco3 = json.load(f)
    
# Collect all categories
categories1 = {category['name']: category['id'] for category in coco1['categories']}
categories2 = {category['name']: category['id'] for category in coco2['categories']}
categories3 = {category['name']: category['id'] for category in coco3['categories']}

# Create a unified list of categories
unified_categories = list(set(categories1.keys()) | set(categories2.keys()) | set(categories3.keys()))
unified_categories.sort()  # Ensure a consistent order

# Create a unified category mapping
unified_category_mapping = {name: idx + 1 for idx, name in enumerate(unified_categories)}

# Create mappings from original category IDs to unified category IDs
id_mapping1 = {categories1[name]: unified_category_mapping[name] for name in categories1}
id_mapping2 = {categories2[name]: unified_category_mapping[name] for name in categories2}
id_mapping3 = {categories3[name]: unified_category_mapping[name] for name in categories3}

# Collect all categories
categories1 = {category['name']: category['id'] for category in coco1['categories']}
categories2 = {category['name']: category['id'] for category in coco2['categories']}
categories3 = {category['name']: category['id'] for category in coco3['categories']}

# Create a unified list of categories
unified_categories = list(set(categories1.keys()) | set(categories2.keys()) | set(categories3.keys()))
unified_categories.sort()  # Ensure a consistent order

# Create a unified category mapping
unified_category_mapping = {name: idx + 1 for idx, name in enumerate(unified_categories)}

# Create mappings from original category IDs to unified category IDs
id_mapping1 = {categories1[name]: unified_category_mapping[name] for name in categories1}
id_mapping2 = {categories2[name]: unified_category_mapping[name] for name in categories2}
id_mapping3 = {categories3[name]: unified_category_mapping[name] for name in categories3}

# Offset for new IDs to avoid conflicts
image_id_offset1 = 0
image_id_offset2 = max(image['id'] for image in coco1['images']) + 1
image_id_offset3 = max(image['id'] for image in coco1['images'] + coco2['images']) + 1

annotation_id_offset1 = 0
annotation_id_offset2 = max(annotation['id'] for annotation in coco1['annotations']) + 1
annotation_id_offset3 = max(annotation['id'] for annotation in coco1['annotations'] + coco2['annotations']) + 1

# Update image and annotation IDs in coco2
for image in coco2['images']:
    image['id'] += image_id_offset2

for annotation in coco2['annotations']:
    annotation['id'] += annotation_id_offset2
    annotation['image_id'] += image_id_offset2

# Update image and annotation IDs in coco3
for image in coco3['images']:
    image['id'] += image_id_offset3

for annotation in coco3['annotations']:
    annotation['id'] += annotation_id_offset3
    annotation['image_id'] += image_id_offset3

# Merge images and annotations
merged_images = coco1['images'] + coco2['images'] + coco3['images']
merged_annotations = coco1['annotations'] + coco2['annotations'] + coco3['annotations']

# Create the merged dataset with unified categories
merged_coco = {
    'images': merged_images,
    'annotations': merged_annotations,
    'categories': [{'id': unified_category_mapping[name], 'name': name} for name in unified_categories]
}

# Save the merged dataset
with open('merged_dataset.json', 'w') as f:
    json.dump(merged_coco, f)
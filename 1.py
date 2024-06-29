import json

# Đường dẫn đến hai tệp JSON cần merge
file1_path = '1.json'
file2_path = '2.json'

# Đọc nội dung từ hai tệp JSON
with open(file1_path, 'r') as file1:
    data1 = json.load(file1)

with open(file2_path, 'r') as file2:
    data2 = json.load(file2)

# Merge phần images
merged_images = data1['images'] + data2['images']

# Merge phần annotations
# Điều chỉnh image_id của annotations của file2 để tránh trùng lặp với file1
max_image_id_file1 = max(image['id'] for image in data1['images'])
for annotation in data2['annotations']:
    annotation['image_id'] += max_image_id_file1

merged_annotations = data1['annotations'] + data2['annotations']

# Tạo dữ liệu merge mới
merged_data = {
    'images': merged_images,
    'annotations': merged_annotations
}

# Ghi lại dữ liệu đã merge vào một tệp JSON mới
merged_file_path = '1.json'
with open(merged_file_path, 'w') as merged_file:
    json.dump(merged_data, merged_file, indent=4)

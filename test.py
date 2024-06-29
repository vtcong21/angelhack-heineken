import json

def update_json_ids(input_filename, output_filename):
    with open(input_filename, 'r') as f:
        data = json.load(f)

    if 'images' in data and 'annotations' in data:
        # Đánh lại ID của "images"
        start_id = 672
        for idx, image in enumerate(data['images']):
            image['id'] = start_id + idx
        
        # Tạo bản đồ ánh xạ từ old image_id sang new image_id
        id_mapping = {image['id']: new_id for new_id, image in enumerate(data['images'], start=start_id)}
        
        # Ánh xạ lại "image_id" trong "annotations"
        for annotation in data['annotations']:
            old_image_id = annotation['image_id']
            if old_image_id in id_mapping:
                annotation['image_id'] = id_mapping[old_image_id]
        
        # Lưu lại file JSON với các thay đổi
        with open(output_filename, 'w') as outfile:
            json.dump(data, outfile, indent=4)
        
        print("Đã cập nhật thành công các ID trong file JSON.")
    else:
        print("File JSON không chứa mảng 'images' hoặc 'annotations'.")

# Example usage:
input_filename = './binh/train/_annotations.coco.json'
output_filename = 'updated_json_file.json'
update_json_ids(input_filename, output_filename)

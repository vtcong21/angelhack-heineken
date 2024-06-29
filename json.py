import json
import os

with open(os.path.join(os.getcwd(),"khoa/test/_annotations.coco.json"), 'r') as f:
    dataset = json.load(f)
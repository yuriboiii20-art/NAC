import os
import glob
from PIL import Image

try:
    import pytesseract
    has_ocr = True
except ImportError:
    has_ocr = False

assets_dir = r"c:\Users\yaqub ahmed\Desktop\nac\NAC\assets"

for i in range(1, 13):
    img_path = os.path.join(assets_dir, f"student{i}.jpg")
    print(f"--- student{i}.jpg ---")
    if os.path.exists(img_path):
        img = Image.open(img_path)
        print(f"Size: {img.size}")
        if has_ocr:
            try:
                text = pytesseract.image_to_string(img)
                print(f"OCR Text:\n{text.strip()}")
            except Exception as e:
                print(f"OCR Error: {e}")
        else:
            print("pytesseract not installed")
    else:
        print("File not found")

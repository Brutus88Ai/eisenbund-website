import shutil
import os

source_dir = r"C:\Users\pasca\.gemini\antigravity\brain\0ae30653-277b-460e-9924-8de22a0cabb3"
target_dir = r"c:\Users\pasca\Desktop\Eisenbund Website\public\assets\shop"

files = [
    ("uploaded_image_0_1768816910830.jpg", "mug_wrench.jpg"),
    ("uploaded_image_3_1768816910830.png", "mug_black.png"),
    ("uploaded_image_4_1768816910830.jpg", "keychain_metal.jpg")
]

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

print(f"Target Directory: {target_dir}")

for src_name, dest_name in files:
    src_path = os.path.join(source_dir, src_name)
    dest_path = os.path.join(target_dir, dest_name)
    
    if os.path.exists(src_path):
        try:
            shutil.copy2(src_path, dest_path)
            print(f"SUCCESS: Copied {src_name} -> {dest_name}")
            print(f"  Size: {os.path.getsize(dest_path)} bytes")
        except Exception as e:
            print(f"ERROR copying {src_name}: {e}")
    else:
        print(f"MISSING SOURCE: {src_path}")

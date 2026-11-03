import subprocess
import os
import json
import urllib.request
import re

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = r"C:\Users\priya\lowkeydevsnewsite\qa_output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

viewports = [
    ("desktop_1440", 1440, 900),
    ("tablet_768", 768, 1024),
    ("mobile_375", 375, 812),
]

# 1. Take multi-viewport screenshots
for name, w, h in viewports:
    shot_path = os.path.join(OUTPUT_DIR, f"{name}.png")
    cmd = [
        CHROME,
        "--headless=new",
        f"--window-size={w},{h}",
        f"--screenshot={shot_path}",
        "--virtual-time-budget=2000",
        "http://localhost:4321/"
    ]
    try:
        subprocess.run(cmd, capture_output=True, timeout=15)
        print(f"Captured {name} screenshot ({os.path.getsize(shot_path)} bytes)")
    except Exception as e:
        print(f"Error capturing {name}: {e}")

# 2. Extract live computed styles using dump-dom or CDP
cmd = [
    CHROME,
    "--headless=new",
    "--dump-dom",
    "http://localhost:4321/"
]
res = subprocess.run(cmd, capture_output=True, text=True)
html = res.stdout

print(f"DOM length: {len(html)} chars")
# Check presence of key sections
sections = [
    ('header', 'site-header'),
    ('hero', 'hero'),
    ('swoosh', 'hero__swoosh'),
    ('ticker', 'ticker'),
    ('work', 'work'),
    ('drawer', 'case-drawer'),
    ('wins', 'wins'),
    ('smile arch', 'wins__arch'),
    ('clients', 'clients'),
    ('confessions', 'confessions'),
    ('footer', 'footer'),
    ('physics canvas', 'physics-canvas'),
]

for label, identifier in sections:
    found = identifier in html
    print(f"Section check: {label} ({identifier}) -> {'FOUND' if found else 'MISSING'}")


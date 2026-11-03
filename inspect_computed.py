import subprocess
import time
import json
import urllib.request
import urllib.parse
import os

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    CHROME,
    "--headless=new",
    "--remote-debugging-port=9222",
    "--window-size=1440,900",
    "about:blank"
])

time.sleep(1.5)

try:
    # Query list of targets
    targets = json.loads(urllib.request.urlopen("http://localhost:9222/json").read())
    ws_url = targets[0]["webSocketDebuggerUrl"]
    print("CDP Connected:", ws_url)
    
    # We can use simple websocket client or python websocket-client if available
except Exception as e:
    print("CDP Target error:", e)
finally:
    proc.terminate()


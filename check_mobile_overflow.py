import subprocess
import time
import json
import urllib.request
import socket
import base64
import os

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
proc = subprocess.Popen([
    CHROME,
    "--headless=new",
    "--remote-debugging-port=9223",
    "--window-size=375,812",
    "http://localhost:4321/"
])

time.sleep(2.5)

try:
    targets = json.loads(urllib.request.urlopen("http://localhost:9223/json").read())
    page_target = next(t for t in targets if t.get("type") == "page")
    ws_url = page_target["webSocketDebuggerUrl"]
    
    ws_path = ws_url.split("9223")[1]
    s = socket.create_connection(("localhost", 9223))
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    handshake = (
        f"GET {ws_path} HTTP/1.1\r\n"
        f"Host: localhost:9223\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n\r\n"
    )
    s.sendall(handshake.encode('utf-8'))
    resp = s.recv(4096).decode('utf-8', errors='ignore')
    
    def send_cdp(method, params, req_id):
        payload = json.dumps({"id": req_id, "method": method, "params": params}).encode('utf-8')
        length = len(payload)
        frame = bytearray([0x81])
        if length <= 125:
            frame.append(0x80 | length)
        elif length <= 65535:
            frame.extend([0x80 | 126, (length >> 8) & 0xFF, length & 0xFF])
        else:
            frame.extend([0x80 | 127] + list(length.to_bytes(8, 'big')))
        mask = os.urandom(4)
        frame.extend(mask)
        masked_payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
        frame.extend(masked_payload)
        s.sendall(frame)

    def recv_cdp():
        raw = s.recv(65536)
        if len(raw) < 2: return None
        length = raw[1] & 0x7F
        idx = 2
        if length == 126:
            length = int.from_bytes(raw[2:4], 'big')
            idx = 4
        elif length == 127:
            length = int.from_bytes(raw[2:10], 'big')
            idx = 10
        data = raw[idx:idx+length]
        try:
            return json.loads(data.decode('utf-8', errors='ignore'))
        except:
            return None

    # Check document scroll width vs client width (overflow test)
    overflow_script = """
    (() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const bodyW = document.body.scrollWidth;
      
      // Find any element wider than window
      const overflowing = [];
      document.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > winW + 2) {
          overflowing.push({
            tag: el.tagName,
            cls: el.className,
            id: el.id,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth
          });
        }
      });

      return {
        winW,
        docW,
        bodyW,
        hasOverflow: docW > winW,
        overflowCount: overflowing.length,
        overflowing: overflowing.slice(0, 10)
      };
    })()
    """

    send_cdp("Runtime.evaluate", {"expression": overflow_script, "returnByValue": True}, 1)
    
    start_time = time.time()
    while time.time() - start_time < 5:
        msg = recv_cdp()
        if msg and msg.get("id") == 1:
            res = msg["result"]["result"]["value"]
            print("Mobile (375w) Overflow Analysis:")
            print(json.dumps(res, indent=2))
            break
        time.sleep(0.05)

except Exception as e:
    print("Mobile QA error:", e)
finally:
    proc.terminate()


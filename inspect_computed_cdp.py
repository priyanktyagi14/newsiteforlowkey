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
    "--remote-debugging-port=9222",
    "--window-size=1440,900",
    "http://localhost:4321/"
])

time.sleep(2.5)

try:
    targets = json.loads(urllib.request.urlopen("http://localhost:9222/json").read())
    page_target = next(t for t in targets if t.get("type") == "page")
    ws_url = page_target["webSocketDebuggerUrl"]
    print("Connecting to:", ws_url)
    
    ws_path = ws_url.split("9222")[1]
    s = socket.create_connection(("localhost", 9222))
    key = base64.b64encode(os.urandom(16)).decode('utf-8')
    handshake = (
        f"GET {ws_path} HTTP/1.1\r\n"
        f"Host: localhost:9222\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n\r\n"
    )
    s.sendall(handshake.encode('utf-8'))
    resp = s.recv(4096).decode('utf-8', errors='ignore')
    if "101" not in resp:
        print("Handshake failed:", resp)
        exit(1)
        
    print("WebSocket Handshake successful!")
    
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

    eval_script = """
    (() => {
      const getStyles = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const c = window.getComputedStyle(el);
        return {
          fontFamily: c.fontFamily,
          fontSize: c.fontSize,
          fontWeight: c.fontWeight,
          lineHeight: c.lineHeight,
          color: c.color,
          backgroundColor: c.backgroundColor,
          padding: c.padding,
          margin: c.margin,
          width: c.width,
          height: c.height,
          aspectRatio: c.aspectRatio,
          clipPath: c.clipPath
        };
      };

      return {
        body: getStyles('body'),
        hero_tagline: getStyles('.hero__tagline'),
        hero_swoosh: getStyles('.hero__swoosh'),
        ticker_item: getStyles('.ticker__item'),
        case_item: getStyles('.case-item'),
        case_thumb: getStyles('.case-item__thumbnail'),
        case_title: getStyles('.case-item__title'),
        wins_title: getStyles('.wins__title'),
        win_card: getStyles('.win-card'),
        confession_card_white: getStyles('.confession-card.--white'),
        confession_card_red: getStyles('.confession-card.--red'),
        sf_manifesto: getStyles('.sf__manifesto'),
        btn_mask: getStyles('.btn-mask')
      };
    })()
    """

    send_cdp("Runtime.evaluate", {"expression": eval_script, "returnByValue": True}, 1)
    
    start_time = time.time()
    while time.time() - start_time < 5:
        msg = recv_cdp()
        if msg and msg.get("id") == 1:
            computed = msg["result"]["result"]["value"]
            print("Extracted Computed Styles:")
            print(json.dumps(computed, indent=2))
            with open(r"c:\Users\priya\lowkeydevsnewsite\local_computed_styles.json", "w") as f:
                json.dump(computed, f, indent=2)
            break
        time.sleep(0.05)

except Exception as e:
    print("Error:", e)
finally:
    proc.terminate()

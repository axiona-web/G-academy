# Pomocný skript: extrakcia textu z Apple Pages (.iwa / snappy) dokumentu
import re, sys

def snappy_dec(data):
    """Miniatúrny čistý-Python snappy dekompresor."""
    i = 0
    while data[i] & 0x80:
        i += 1
    i += 1
    out = bytearray()
    n = len(data)
    while i < n:
        tag = data[i]
        typ = tag & 3
        if typ == 0:  # literal
            ln = (tag >> 2) + 1
            i += 1
            if ln > 60:
                extra = ln - 60
                ln = int.from_bytes(data[i:i+extra], 'little') + 1
                i += extra
            out += data[i:i+ln]
            i += ln
        else:
            if typ == 1:
                ln = ((tag >> 2) & 7) + 4
                off = ((tag >> 5) << 8) | data[i+1]
                i += 2
            elif typ == 2:
                ln = (tag >> 2) + 1
                off = int.from_bytes(data[i+1:i+3], 'little')
                i += 3
            else:
                ln = (tag >> 2) + 1
                off = int.from_bytes(data[i+1:i+5], 'little')
                i += 5
            for _ in range(ln):
                out.append(out[-off])
    return bytes(out)

raw = open(sys.argv[1], 'rb').read()
out = b''
i = 0
while i < len(raw):
    ln = int.from_bytes(raw[i+1:i+4], 'little')
    i += 4
    chunk = raw[i:i+ln]
    i += ln
    try:
        out += snappy_dec(chunk)
    except Exception:
        pass

txt = out.decode('utf-8', 'ignore')
pat = r'[ -~À-ſ€–—„“\n\t]{10,}'
strs = re.findall(pat, txt)
best = max(strs, key=len)
print(best[:8000])

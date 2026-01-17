"""QR-Code Generator for the project website.

Usage:
  python3 make_qr.py

Edits:
  - Change WEBSITE_URL below to your published URL.
  - The output overwrites: assets/qr-share.png
"""

from pathlib import Path

import qrcode

# TODO: Replace with your real URL once the site is online.
WEBSITE_URL = "https://example.com/ethik-auf-raedern/"

OUT_PATH = Path(__file__).resolve().parent / "assets" / "qr-share.png"


def main() -> None:
    qr = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(WEBSITE_URL)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    img.save(OUT_PATH)
    print(f"Saved QR to: {OUT_PATH}")
    print(f"URL encoded: {WEBSITE_URL}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Generador de código QR para la carta digital de MagicGourmet.

Uso:
    python generate_qr.py [URL] [archivo_salida.png]

Ejemplos:
    python generate_qr.py
    python generate_qr.py http://localhost:3000
    python generate_qr.py https://magicgourmet.cl carta_qr.png

Dependencias:
    pip install qrcode[pil]
"""

import sys
import os


def check_dependencies() -> bool:
    try:
        import qrcode  # noqa: F401
        from PIL import Image  # noqa: F401
        return True
    except ImportError:
        print("=" * 60)
        print("  ERROR: Dependencias faltantes")
        print("=" * 60)
        print("  Instala con:")
        print("    pip install qrcode[pil]")
        print("=" * 60)
        return False


def generate_qr(url: str, output_path: str = "carta_qr.png") -> None:
    import qrcode

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Preview ASCII en consola
    print()
    print("  Vista previa del QR (invertido):")
    print()
    qr.print_ascii(invert=True)

    # Guardar imagen PNG
    img = qr.make_image(fill_color="#1a0040", back_color="white")
    img.save(output_path)

    abs_path = os.path.abspath(output_path)
    print()
    print("=" * 60)
    print("  QR generado exitosamente")
    print("=" * 60)
    print(f"  URL      : {url}")
    print(f"  Archivo  : {abs_path}")
    print("=" * 60)
    print()
    print("  Escanea el QR con la cámara de tu teléfono")
    print("  o imprime el archivo PNG en la mesa del restaurante.")
    print()


def main() -> None:
    default_url    = "http://localhost:3000"
    default_output = "carta_qr.png"

    url    = sys.argv[1] if len(sys.argv) > 1 else default_url
    output = sys.argv[2] if len(sys.argv) > 2 else default_output

    if not check_dependencies():
        sys.exit(1)

    generate_qr(url, output)


if __name__ == "__main__":
    main()

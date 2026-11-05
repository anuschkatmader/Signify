#!/bin/bash
# Saves the stock photos into this folder. Run once: bash images/download-photos.sh
cd "$(dirname "$0")" || exit 1
curl -fsSL -o hero-city.jpg "https://images.pexels.com/photos/9920643/pexels-photo-9920643.jpeg?auto=compress&cs=tinysrgb&w=2600" && echo "hero-city.jpg"
curl -fsSL -o hero-stadium.jpg "https://images.pexels.com/photos/776805/pexels-photo-776805.jpeg?auto=compress&cs=tinysrgb&w=2600" && echo "hero-stadium.jpg"
curl -fsSL -o hero-offices.jpg "https://images.pexels.com/photos/28715052/pexels-photo-28715052.jpeg?auto=compress&cs=tinysrgb&w=2600" && echo "hero-offices.jpg"
curl -fsSL -o tile-products.jpg "https://images.pexels.com/photos/1163109/pexels-photo-1163109.jpeg?auto=compress&cs=tinysrgb&w=1600" && echo "tile-products.jpg"
curl -fsSL -o tile-applications.jpg "https://images.pexels.com/photos/36631701/pexels-photo-36631701.jpeg?auto=compress&cs=tinysrgb&w=1600" && echo "tile-applications.jpg"
curl -fsSL -o mosaic-smart-city.jpg "https://images.pexels.com/photos/16705973/pexels-photo-16705973.jpeg?auto=compress&cs=tinysrgb&w=1600" && echo "mosaic-smart-city.jpg"
curl -fsSL -o mosaic-retail-atrium.jpg "https://images.pexels.com/photos/33803366/pexels-photo-33803366.jpeg?auto=compress&cs=tinysrgb&w=1000" && echo "mosaic-retail-atrium.jpg"
curl -fsSL -o mosaic-facade.jpg "https://images.pexels.com/photos/33357681/pexels-photo-33357681.jpeg?auto=compress&cs=tinysrgb&w=1000" && echo "mosaic-facade.jpg"
curl -fsSL -o mosaic-modern-interior.jpg "https://images.pexels.com/photos/34686219/pexels-photo-34686219.jpeg?auto=compress&cs=tinysrgb&w=1000" && echo "mosaic-modern-interior.jpg"
curl -fsSL -o mosaic-home.jpg "https://images.pexels.com/photos/34726411/pexels-photo-34726411.jpeg?auto=compress&cs=tinysrgb&w=1000" && echo "mosaic-home.jpg"

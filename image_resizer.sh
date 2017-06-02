#!/bin/bash
# image_resizer

if [ $# -lt  2 ]; then 
  echo 1>&2 "$0: not enough arguments"
  echo "First Arg is the the orginal image file"
  echo "Second Arg is the name of the new image. It will be saved in ./_assets/images/ as a png (no need to add extension)"
  exit 2
fi

echo Converting Image...

convert $1 -gravity center -crop 1080x617+0+0 -resize 700x400 ./_assets/images/$2.png

open ./_assets/images/$2.png

echo Your image is ready!
echo Drop this line in the post markdown:
echo ""
echo "{% img $2 alt="$2" %}"
echo ""

import fontforge
import os
import subprocess
import tempfile
import json
import copy

SCRIPT_PATH = os.path.dirname(os.path.abspath(__file__))
BLANK_PATH = os.path.join(SCRIPT_PATH, 'blank.svg')
INPUT_SVG_DIR = os.path.join(SCRIPT_PATH, '..', '..', 'src/core/icons/svg')
OUTPUT_FONT_DIR = os.path.join(SCRIPT_PATH, '..', '..', 'src/core/icons/font')
AUTO_WIDTH = True
KERNING = 15

f = fontforge.font()
f.encoding = 'UnicodeFull'
f.design_size = 24
f.em = 24
f.ascent = 448
f.descent = 64

# Add lookup table
f.addLookup("ligatable","gsub_ligature",(),(("liga",(("latn",("dflt")),)),))
f.addLookupSubtable("ligatable","ligatable1")

# Import base characters
for char in "0123456789abcdefghijklmnopqrstuvwzxyz_- ":
  glyph = f.createChar(ord(char))
  glyph.importOutlines(BLANK_PATH)
  glyph.width = 0

font_name = 'framework7-core-icons';

for dirname, dirnames, filenames in os.walk(INPUT_SVG_DIR):
  for filename in filenames:
    name, ext = os.path.splitext(filename)
    filePath = os.path.join(dirname, filename)
    size = os.path.getsize(filePath)
    if ext in ['.svg', '.eps']:
      if ext in ['.svg']:
        # hack removal of <switch> </switch> tags
        svgfile = open(filePath, 'r+')
        tmpsvgfile = tempfile.NamedTemporaryFile(suffix=ext, delete=False)
        svgtext = svgfile.read()
        svgfile.seek(0)

        # replace the <switch> </switch> tags with 'nothing'
        svgtext = svgtext.replace('<switch>', '')
        svgtext = svgtext.replace('</switch>', '')

        bytes = svgtext.encode(encoding='UTF-8')
        tmpsvgfile.file.write(bytes)

        svgfile.close()
        tmpsvgfile.file.close()

        filePath = tmpsvgfile.name
        # end hack

      glyph = f.createChar(-1, name)
      glyph.importOutlines(filePath)

      # Add ligatures
      ligature = [];
      for c in name:
        if (c == '_'):
          c = "underscore"
        if (c == '-'):
          c = "hyphen"
        if (c == ' '):
          c = "space"
        ligature.append(c)
      glyph.addPosSub('ligatable1', ligature)

      # if we created a temporary file, let's clean it up
      if tmpsvgfile:
        os.unlink(tmpsvgfile.name)

      # set glyph size explicitly or automatically depending on autowidth
      if AUTO_WIDTH:
        glyph.left_side_bearing = glyph.right_side_bearing = 0
        glyph.round()

    # resize glyphs if autowidth is enabled
    if AUTO_WIDTH:
      f.autoWidth(0, 0, 512)

fontfile = '%s/framework7-core-icons' % (OUTPUT_FONT_DIR)
print(fontfile);

f.fontname = font_name
f.familyname = font_name
f.fullname = font_name

f.generate(fontfile + '.ttf')

# Hint the TTF file
subprocess.call('ttfautohint -s -f -n ' + fontfile + '.ttf ' + fontfile + '-hinted.ttf > /dev/null 2>&1 && mv ' + fontfile + '-hinted.ttf ' + fontfile + '.ttf', shell=True)

# WOFF2 Font
subprocess.call('woff2_compress ' + fontfile + '.ttf', shell=True)

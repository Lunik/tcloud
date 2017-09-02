import Avi from './avi.svg'
import Css from './css.svg'
import Dir from './dir.svg'
import File from './file.svg'
import Html from './html.svg'
import Iso from './iso.svg'
import Jpg from './jpg.svg'
import Js from './js.svg'
import Json from './json.svg'
import Mkv from './mkv.svg'
import Mp3 from './mp3.svg'
import Mp4 from './mp4.svg'
import Pdf from './pdf.svg'
import Png from './png.svg'
import Txt from './txt.svg'
import Xml from './xml.svg'
import Zip from './zip.svg'

function getFromExtension (extension) {
  switch (extension.toLowerCase()) {
    case 'avi':
      return Avi
    case 'css':
      return Css
    case 'dir':
    case 'folder':
      return Dir
    case '':
    default:
      return File
    case 'html':
    case 'htm':
      return Html
    case 'iso':
      return Iso
    case 'jpg':
    case 'jpeg':
      return Jpg
    case 'js':
    case 'jsx':
      return Js
    case 'json':
      return Json
    case 'mkv':
      return Mkv
    case 'mp3':
      return Mp3
    case 'mp4':
      return Mp4
    case 'pdf':
      return Pdf
    case 'png':
      return Png
    case 'txt':
      return Txt
    case 'xml':
      return Xml
    case 'zip':
    case 'rar':
    case 'gz':
    case 'tar':
    case 'tar.gz':
    case 'tgz':
      return Zip
  }
}
export {
  getFromExtension,
  Avi,
  Css,
  Dir,
  File,
  Html,
  Iso,
  Jpg,
  Js,
  Json,
  Mkv,
  Mp3,
  Mp4,
  Pdf,
  Png,
  Txt,
  Xml,
  Zip
}

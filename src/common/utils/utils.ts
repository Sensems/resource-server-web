// 统一文件类型
export const getFileType = (extname: string) => {
  let type = ''
  if (extname) type = extname.split('.')[1];

  if (['jpg', 'png', 'jpeg', 'gif'].includes(type)) {
    return 'image'
  }
  if (['mp4', 'avi', 'rmvb', 'rm', 'flv', 'mkv'].includes(type)) {
    return 'video'
  }
  if (['mp3', 'wav', 'ogg', 'ape', 'flac'].includes(type)) {
    return 'voice'
  }
  if (['doc', 'docx'].includes(type)) {
    return 'word'
  }
  if (['xls', 'xlsx'].includes(type)) {
    return 'excel'
  }
  if (['ppt', 'pptx'].includes(type)) {
    return 'ppt'
  }
  if (['pdf'].includes(type)) {
    return 'pdf'
  }
  if (['txt'].includes(type)) {
    return 'txt'
  }
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(type)) {
    return 'compress'
  }
  if (['exe'].includes(type)) {
    return 'exe'
  }
  if (['wps'].includes(type)) {
    return 'wps'
  }
  if (['config'].includes(type)) {
    return 'config'
  }
  if (['db', 'sql'].includes(type)) {
    return 'database'
  }
  return 'unknow'
}
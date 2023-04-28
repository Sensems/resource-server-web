import { FunctionComponent } from "react";

import compress from '../../assets/icon/compress.png';
import config from '../../assets/icon/config.png';
import database from '../../assets/icon/database.png';
import excel from '../../assets/icon/excel.png';
import exe from '../../assets/icon/exe.png';
import folder from '../../assets/icon/folder.png';
import gif from '../../assets/icon/gif.png';
import image from '../../assets/icon/image.png';
import pdf from '../../assets/icon/pdf.png';
import ppt from '../../assets/icon/ppt.png';
import txt from '../../assets/icon/txt.png';
import unknow from '../../assets/icon/unknow.png';
import video from '../../assets/icon/video.png';
import voice from '../../assets/icon/voice.png';
import word from '../../assets/icon/word.png';
import wps from '../../assets/icon/wps.png';

let icons = {
  compress,
  config,
  database,
  excel,
  exe,
  folder,
  gif,
  image,
  pdf,
  ppt,
  txt,
  unknow,
  video,
  voice,
  word,
  wps
}

interface IconProps {
  size?: number;
  name: keyof typeof icons;
}

const Icon: FunctionComponent<IconProps> = (props: IconProps) => {
  const { size = 50, name } = props;

  return (<img style={{ width: `${size}px` }} src={icons[name]} alt="" />);
}

export default Icon;
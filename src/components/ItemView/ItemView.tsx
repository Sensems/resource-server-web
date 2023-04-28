import { FunctionComponent, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useClickAway } from 'ahooks';
import { API } from '../../common/api/api.d';
import { Image } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { getFileType } from '../../common/utils/utils';
import Icon from '../Icon/Icon';
import Menu from '../ItemMenu/ItemMenu';
import OperationModel from '../OperationModel/OperationModel';
import '../../assets/css/transition.css'


export interface ItemViewProps extends API.Response.ItemDetail { }

const ItemView: FunctionComponent<ItemViewProps> = (props) => {

  const { path } = useParams()
  const navigate = useNavigate()
  const { type, name, modified_at, extname, url } = props;
  const menuRef = useRef(null);
  const operationRef = useRef(null);
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showOperation, setshowOperation] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [itemMenuPosition, setItemMenuPosition] = useState({ x: 0, y: 0 });
  const [imagePreview, setImagePreview] = useState(false);

  useClickAway(() => {
    setShowMenu(false)
  }, ref);

  useClickAway(() => {
    setShowMenu(false)
  }, ref, 'contextmenu');

  // 点击操作按钮
  const operationClick = () => {
    setItemMenuPosition({ x: 100, y: 40 });
    setShowMenu(true);
  }

  // 右击打开菜单
  const handleRightClick = (e: any) => {
    const { layerX, layerY } = e.nativeEvent
    setItemMenuPosition({ x: layerX, y: layerY });
    setShowMenu(true);
    e.preventDefault();
  }

  // 双击事件
  const handleDoubleClick = () => {
    console.log('type', type)
    if (type === 'folder') {
      folderOperation()
    } else {
      fileOperation()
    }
  }

  const folderOperation = () => {
    if (path) {
      let pathArr = path.split('|')
      pathArr.push(name)
      navigate('/' + pathArr.join('|'))
    } else {
      navigate('/' + name)
    }
  }

  // 文件操作
  const fileOperation = () => {
    const type = getFileType(extname)
    switch (type) {
      case 'image':
        setImagePreview(true)
        break;
      case 'video':

        break;
      default:
        break;
    }
  }

  // 重命名
  const fileRename = () => {
    setShowRenameModal(true)
  }

  const judgeIcon = () => {
    if (type === 'folder') {
      return <Icon size={100} name='folder'></Icon>
    } else {
      if (getFileType(extname) === 'image') {
        return <Image
          height={100}
          src={url}
          preview={{
            visible: imagePreview,
            src: url,
            onVisibleChange: (value) => {
              setImagePreview(value);
            },
          }}
        />
      } else {
        return <Icon size={100} name={getFileType(extname)}></Icon>
      }
    }
  }

  return (
    <div id="resourcesWrap" className='flex justify-center w-full py-2' title={name}>
      <div ref={ref} onDoubleClick={handleDoubleClick} onContextMenu={handleRightClick} onMouseEnter={() => setshowOperation(true)} onMouseLeave={() => setshowOperation(false)} className='file-item w-[140px] rounded-lg hover:bg-[#f5f5f6] flex flex-col items-center p-2 box-border relative transition duration-200'>
        <CSSTransition nodeRef={operationRef} timeout={300} unmountOnExit classNames='alert' in={showOperation}>
          <div ref={operationRef} onClick={operationClick} className='z-50 cursor-pointer w-8 h-8 flex justify-center items-center text-xs text-gray-300 bg-white rounded-lg absolute right-2 top-2 hover:text-gray-500 transition duration-200'>•••</div>
        </CSSTransition>
        <div className='icon-wrap text-[50px]'>
          {judgeIcon()}
        </div>
        <div className='label text-sm ellipsis_two my-3'>{name}</div>
        <div className='time text-xs text-zinc-500'>{new Date(modified_at).toLocaleString()}</div>
        <CSSTransition nodeRef={menuRef} timeout={300} unmountOnExit classNames='alert' in={showMenu}>
          <Menu position={itemMenuPosition} ref={menuRef} type={type} ItemDetail={props} onRename={fileRename} onMenuClick={() => setShowMenu(false)} />
        </CSSTransition>

        <OperationModel show={showRenameModal} type='rename' onOk={() => setShowRenameModal(false)} onCancel={() => setShowRenameModal(false)} renameItem={judgeIcon()} itemDetail={props} />
      </div>
    </div>

  );
}

export default ItemView;
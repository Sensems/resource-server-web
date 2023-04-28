import { useState, forwardRef, useEffect } from "react";
import { message, App } from 'antd'
import { API } from '../../common/api/api.d';
import { deleteFile, deleteFolder } from '../../common/api/api.ts'
import { getResourseList } from "../../store/index.store.ts";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getFileType } from "../../common/utils/utils.ts";

interface MenuProps {
  type: 'folder' | 'file';
  position: {
    x: number;
    y: number;
  },
  ItemDetail: API.Response.ItemDetail;
  onMenuClick?: (item: string) => void;
  onRename?: () => void;
}


const Menu = forwardRef<HTMLDivElement, MenuProps>((props: MenuProps, ref) => {
  const { type, ItemDetail, onMenuClick, onRename } = props;
  const [fileMenu, setFileMenu] = useState(['下载', '重命名', '复制链接', '删除'])
  const [folderMenu] = useState(['重命名', '删除'])
  const { path } = useParams()
  const [getParams] = useSearchParams()
  const dispatch = useDispatch();
  const { modal } = App.useApp()

  useEffect(() => {
    if (['ppt', 'word', 'excel'].includes(getFileType(ItemDetail.extname))) {
      setFileMenu(['打开', '下载', '重命名', '复制链接', '删除', '预览'])
    }
  }, [])

  const contextMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const getResourseData = () => {
    let dir = ''
    if (path) {
      dir = path.split('|').join('/')
    }
    dispatch(getResourseList({
      page: Number(getParams.getAll('page')[0]) || 1,
      limit: Number(getParams.getAll('limit')[0]) || 50,
      search: getParams.getAll('search')[0] || '',
      dir: `/${dir}`
    }) as any)
  }

  // 复制链接
  const copyTextToClipboard = (val: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard 向剪贴板写文本
      message.success('复制成功')
      return navigator.clipboard.writeText(val)
    } else {
      // 创建text area
      const textArea = document.createElement('textarea')
      textArea.value = val
      // 使text area不在viewport，同时设置不可见
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      message.success('复制成功')
      return new Promise((res, rej) => {
        // 执行复制命令并移除文本框
        document.execCommand('copy') ? res({}) : rej()
        textArea.remove()
      })
    }
  }

  // 删除文件
  const handleDeleteFile = () => {
    deleteFile({
      files: ItemDetail.path
    }).then(() => {
      message.success('删除文件成功')
      getResourseData()
    })
  }

  // 删除文件夹
  const handleDeleteFolder = () => {
    deleteFolder({
      name: ItemDetail.path
    }).then(() => {
      message.success('删除文件夹成功')
      getResourseData()
    })
  }

  // 文件菜单点击事件
  const fileMenuClick = (item: string) => {
    switch (item) {
      case '打开':
        window.open(`https://view.officeapps.live.com/op/view.aspx?src=${ItemDetail.url}&wdOrigin=BROWSELINK`)
        break;
      case '下载':
        window.open(ItemDetail.url)
        break;
      case '重命名':
        onRename && onRename()
        break;
      case '复制链接':
        copyTextToClipboard(ItemDetail.url)
        break;
      case '移动':
        console.log('移动');
        break;
      case '删除':
        modal.confirm({
          title: '提示',
          content: `确定删除文件 ${ItemDetail.name} 吗？`,
          icon: <ExclamationCircleFilled />,
          onOk: () => {
            handleDeleteFile()
          }
        })
        break;
      default:
        break;
    }
    if (onMenuClick !== undefined) onMenuClick(item) as any
  }

  // 文件夹菜单点击事件
  const folderMenuClick = (item: string) => {
    switch (item) {
      case '重命名':
        onRename && onRename()
        break;
      case '删除':
        modal.confirm({
          title: '警告',
          content: `确定删除文件夹 ${ItemDetail.name} 吗？这将会把文件夹下的所有文件一并删除`,
          icon: <ExclamationCircleFilled />,
          onOk: () => {
            handleDeleteFolder()
          }
        })
        break;
      default:
        break;
    }
    if (onMenuClick !== undefined) onMenuClick(item) as any
  }

  return (
    <div ref={ref} onContextMenu={contextMenu} className='menu p-1 rounded-xl absolute bg-white drop-shadow-lg z-10' style={{
      left: props.position.x + 'px',
      top: props.position.y + 'px'
    }}>
      {type === 'file' ? fileMenu.map((item, index) => {
        return <div key={index} onClick={() => fileMenuClick(item)} className='menu-item cursor-pointer px-2 w-[100px] h-8 leading-8 text-stone-900 rounded-lg text-sm hover:bg-[#f5f5f6]'>{item}</div>
      }) : folderMenu.map((item, index) => {
        return <div key={index} onClick={() => folderMenuClick(item)} className='menu-item cursor-pointer px-2 w-[100px] h-8 leading-8 text-stone-900 rounded-lg text-sm hover:bg-[#f5f5f6]'>{item}</div>
      })}
    </div>
  );
})

export default Menu;
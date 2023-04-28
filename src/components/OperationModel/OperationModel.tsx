import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { Modal, Input, message } from 'antd'
import Icon from "../Icon/Icon";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getResourseList } from "../../store/index.store";
import { createFolder, renameFile, renameFolder } from "../../common/api/api";
import Upload from "../Upload/Upload";
import { API } from "../../common/api/api.d";

interface OperationModelProps {
  show: boolean;
  type: 'rename' | 'newFolder' | 'upload';
  renameItem?: ReactNode;
  itemDetail?: API.Response.ItemDetail
  onCancel?: () => void;
  onOk?: () => void;
}

const OperationModel: FunctionComponent<OperationModelProps> = (props) => {

  const { show, type, onCancel, onOk, renameItem, itemDetail } = props
  const [folderName, setFoldName] = useState('新建文件夹')
  const [rename, setRename] = useState('')
  const [modalTitle, setModalTitle] = useState('新建文件夹')
  const [currentDir, setCurrentDir] = useState('/')
  const { path } = useParams()
  const [getParams] = useSearchParams()
  const dispatch = useDispatch();

  useEffect(() => {

    if (path) setCurrentDir(path.split('|').join('/'))

    if (type === 'rename') setRename(itemDetail?.name || '')

    switch (type) {
      case 'newFolder':
        setModalTitle('新建文件夹')
        break;
      case 'rename':
        setModalTitle('重命名')
        break;
      case 'upload':
        setModalTitle('上传文件')
        break;
      default:
        break;
    }
  }, [type])

  // 获取资源列表
  const getResourseData = () => {
    dispatch(getResourseList({
      page: Number(getParams.getAll('page')[0]) || 1,
      limit: Number(getParams.getAll('limit')[0]) || 50,
      search: getParams.getAll('search')[0] || '',
      dir: `/${currentDir}`
    }) as any)
  }

  // 对话框确定
  const modalOk = () => {
    if (type === 'newFolder') {
      createNewFolder()
    } else if (type === 'rename') {
      if (itemDetail?.type === 'folder') {
        folderRename()
      } else {
        fileRename()
      }
    }
  }

  // 创建新文件夹
  const createNewFolder = () => {
    createFolder({
      name: `${currentDir}/${folderName}`
    }).then(() => {
      getResourseData()
      onOk && onOk()
    })
  }

  // 上传文件
  const uploadChange = (info: any) => {
    const { status, response } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
    } else if (status === 'error') {
      console.log('response', response)
      message.error(response.message || `${info.file.name} 文件上传失败.`);
    }
  }

  // 文件重命名
  const fileRename = () => {
    renameFile({
      old_name: `/${currentDir}/${itemDetail?.name}`,
      new_name: `/${currentDir}/${rename}`
    }).then(() => {
      getResourseData()
      onOk && onOk()
    })
  }

  // 文件夹重命名
  const folderRename = () => {
    renameFolder({
      old_name: `/${currentDir}/${itemDetail?.name}`,
      new_name: `/${currentDir}/${rename}`
    }).then(() => {
      getResourseData()
      onOk && onOk()
    })
  }

  const handleClick = (e: any) => {
    // 阻止事件穿透
    e.stopPropagation();
    e.preventDefault();
  }

  // 重命名组件
  const Rename = (
    <div className="flex flex-col justify-center items-center">
      {renameItem}
      <Input onInput={(e: any) => setRename(e.target.value)} style={{ marginTop: '30px' }} placeholder="重命名" value={rename} />
    </div>
  )

  // 新建文件夹组件
  const newFolder = (
    <div className="flex flex-col justify-center items-center">
      <Icon name="folder" size={150}></Icon>
      <Input onInput={(e: any) => setFoldName(e.target.value)} style={{ marginTop: '30px' }} placeholder="新建文件夹" value={folderName} />
    </div>
  )

  return (
    <Modal destroyOnClose cancelButtonProps={{ style: { display: 'none' } }} width={400} title={modalTitle} open={show} onCancel={() => onCancel && onCancel()} onOk={() => modalOk()}>
      <div onDoubleClick={handleClick}>
        {type === 'newFolder' && newFolder}
        {type === 'rename' && Rename}
        {type === 'upload' && <Upload data={{ dir: currentDir }} onChange={uploadChange} multiple maxCount={10} action={`${import.meta.env.VITE_API_BASE_URL}/upload`} name="files" />}
      </div>
    </Modal>
  );
}

export default OperationModel;
import { FunctionComponent, useEffect, useState, useRef } from "react";
import { API } from "../../common/api/api.d"
import ItemView from "../../components/ItemView/ItemView";
import { Empty, Pagination, Spin } from 'antd';
import OperationBar from "../../components/OperationBar/OperationBar";
import MainMenu from "../../components/MainMenu/MainMenu";
import { CSSTransition } from 'react-transition-group';
import '../../assets/css/transition.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getResourseList } from '../../store/index.store'
import { useParams, useSearchParams } from 'react-router-dom'
import OperationModel from "../../components/OperationModel/OperationModel";

const Home: FunctionComponent = () => {

  let location = useLocation();
  const { path } = useParams()
  const [getParams] = useSearchParams()
  const dispatch = useDispatch();
  const resourceData = useSelector((state: any) => state.counter.resourceData);
  const navigate = useNavigate();
  const mainMenuRef = useRef(null);
  const resourceWrapRef = useRef<HTMLDivElement>(null);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'rename' | 'newFolder' | 'upload'>('newFolder');
  const [MainMenuPosition, setMainMenuPosition] = useState({} as any);
  const [pageOptions, setPageOptions] = useState({
    page: 1,
    limit: 50,
    dir: '',
    search: ''
  })

  // 获取资源列表
  useEffect(() => {
    let dir = ''
    if (path) {
      dir = path.split('|').join('/')
    }
    setLoading(true)

    let obj = {
      ...pageOptions,
      page: Number(getParams.getAll('page')[0]) || pageOptions.page,
      limit: Number(getParams.getAll('limit')[0]) || pageOptions.limit,
      search: getParams.getAll('search')[0] || pageOptions.search,
      dir: `/${dir}`
    }
    setPageOptions(obj)
    dispatch(getResourseList(obj) as any).then(() => {
      setLoading(false)
    })
  }, [pageOptions.page, pageOptions.limit, pageOptions.search, pageOptions.dir, location]);


  // 点击分页
  const pageChange = (page: number, pageSize: number) => {
    setPageOptions({
      ...pageOptions,
      page: page,
      limit: pageSize
    })
    navigate(`/${path}?page=${page}&limit=${pageSize}`, { replace: true })
  }

  // 右键菜单
  const handleRightClick = (e: any) => {
    const { layerX, layerY } = e.nativeEvent
    if (e.target.id === 'resourcesWrap') {
      setMainMenuPosition({ left: layerX, top: layerY });
      setShowMainMenu(true);
    } else {
      setShowMainMenu(false);
    }
    e.preventDefault();
  }

  // 搜索
  const onSearch = (value: string) => {
    setPageOptions({
      ...pageOptions,
      search: value
    })
    navigate(`/${path}?page=${pageOptions.page}&limit=${pageOptions.limit}&search=${value}`, { replace: true })
  }

  // 点击添加按钮
  const onAdd = () => {
    setMainMenuPosition({ top: 0, right: 20 })
    setShowMainMenu(true);
  }

  // 新建文件夹
  const NewFolder = async () => {
    setModalType('newFolder')
    setShowModal(true)
  }

  // 上传文件
  const uploadFile = () => {
    setModalType('upload')
    setShowModal(true)
  }


  return (
    <div className="home p-5">
      <OperationBar onSearch={onSearch} onAdd={onAdd} />
      <div ref={resourceWrapRef} className="min-h-[500px] relative" onContextMenu={handleRightClick} onClick={() => setShowMainMenu(false)}>
        {loading && <div className="z-50 bg-opacity-60 bg-white absolute w-full h-full flex items-center justify-center"><Spin size="large" /></div>}
        {
          resourceData.items.length === 0 ?
            <Empty style={{ height: '100%' }} /> :
            // <Spin size="large" /> :
            <div id="resourcesWrap" className="resource-wrap w-full">
              {
                (resourceData as API.Response.Resources).items.map((item) => {
                  return <ItemView key={item.modified_at} {...item} />
                })
              }
            </div>
        }
        <CSSTransition nodeRef={mainMenuRef} timeout={300} unmountOnExit classNames='alert' in={showMainMenu}>
          <MainMenu position={MainMenuPosition} ref={mainMenuRef} onNewFolder={NewFolder} onUpload={uploadFile}></MainMenu>
        </CSSTransition>
      </div>

      <div className="footer flex justify-center pb-10">
        <Pagination showQuickJumper defaultCurrent={pageOptions.page} current={pageOptions.page} pageSize={pageOptions.limit} total={resourceData.totalItems} onChange={pageChange} />
      </div>

      <OperationModel show={showModal} type={modalType} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)}></OperationModel>
    </div>
  );
}

export default Home;
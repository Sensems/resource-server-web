import { FunctionComponent, useState, useEffect } from "react";
import { Button, Input, Breadcrumb, Avatar, Popconfirm, Modal } from 'antd';
import { PlusOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API } from "../../common/api/api.d";
import { logout } from "../../common/api/api";
import UserManage from "../UserManage/UserManage";

interface OperationBarProps {
  onSearch?: (value: string) => void;
  onAdd?: () => void;
}

const OperationBar: FunctionComponent<OperationBarProps> = (props) => {
  const { onSearch, onAdd } = props;
  const [searchValue, setSearchValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [breadcrumb, setBreadcrumb] = useState<Array<{ title: string, href?: string }>>([])
  const { path } = useParams()
  const location = useLocation()
  const [getParams] = useSearchParams()
  const userInfo = useSelector<{}, API.Response.UserInfo>((state: any) => state.user.userInfo);
  const navigate = useNavigate();

  // 设置面包屑
  useEffect(() => {
    if (path) {
      const pathSplitArr = path?.split('|')
      let arr = pathSplitArr!.map((item: string, index) => {

        // 在当前路径下，不需要跳转
        if (index === pathSplitArr!.length - 1) {
          return {
            title: item,
            href: undefined as any
          }
        }

        // 生成面包屑路径
        let _arr = JSON.parse(JSON.stringify(pathSplitArr))
        _arr.splice(index + 1, _arr.length - index - 1)
        console.log('_arr', _arr)
        return {
          title: item,
          href: `/view/${_arr.join('|')}`
        }
      })
      setBreadcrumb([{ title: '根目录', href: '/' }].concat(arr))
    }
    setSearchValue(getParams.getAll('search')[0] || '')
  }, [location])

  // 输入框输入
  const inputChange = (e: any) => {
    setSearchValue(e.target.value)
  }

  // 输入框回车
  const inputKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      onSearch ? onSearch(searchValue) : ''
    }
  }

  // 退出登录
  const userLogout = () => {
    logout().then(() => {
      localStorage.removeItem("userInfo")
      navigate('/login', { replace: true })
    })
  }

  const userBar = (
    <div className="ml-3 flex items-center">
      {userInfo.role == 'admin' && <Button className="mr-2" onClick={() => setIsModalOpen(!isModalOpen)} type="primary" shape="circle" icon={<TeamOutlined />} />}
      <Popconfirm
        title="退出登录"
        onConfirm={userLogout}
        okText="确认"
        cancelText="取消"
      >
        <Avatar alt={userInfo.username} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', cursor: 'pointer' }}>
          {userInfo.username.slice(0, 1)}
        </Avatar>
      </Popconfirm>
    </div>
  )

  return (
    <div className="operation-bar flex items-center justify-between px-5">
      <div>
        <Breadcrumb
          items={breadcrumb}
        />
      </div>
      <div className="flex items-center">
        <Input value={searchValue} onInput={inputChange} onKeyUp={inputKeyUp} placeholder="请输入文件/文件后缀/文件夹名称" style={{ width: '300px' }} prefix={<SearchOutlined className="text-gray-500" />} />
        <Button onClick={() => onSearch ? onSearch(searchValue) : ''} className="m-2" type="primary" shape="circle" icon={<SearchOutlined />} />
        <Button onClick={() => onAdd ? onAdd() : ''} type="primary" shape="circle" icon={<PlusOutlined />} />
        {userInfo.username && userBar}
      </div>

      <Modal title="用户管理" onCancel={() => setIsModalOpen(false)} footer={null} open={isModalOpen} width="800px">
        <UserManage />
      </Modal>
    </div>
  );
}

export default OperationBar;
import { FunctionComponent, useState, useEffect } from "react";
import { Button, Input, Breadcrumb } from 'antd';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useParams, useLocation, useSearchParams } from 'react-router-dom'

interface OperationBarProps {
  onSearch?: (value: string) => void;
  onAdd?: () => void;
}

const OperationBar: FunctionComponent<OperationBarProps> = (props) => {
  const { onSearch, onAdd } = props;
  const [searchValue, setSearchValue] = useState('')
  const [breadcrumb, setBreadcrumb] = useState<Array<{ title: string, href?: string }>>([])
  const { path } = useParams()
  const location = useLocation()
  const [getParams] = useSearchParams()

  // 设置面包屑
  useEffect(() => {
    console.log('location', location)
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

  return (
    <div className="operation-bar flex items-center justify-between px-5">
      <div>
        <Breadcrumb
          items={breadcrumb}
        />
      </div>
      <div>
        <Input value={searchValue} onInput={inputChange} onKeyUp={inputKeyUp} placeholder="请输入文件/文件后缀/文件夹名称" style={{ width: '300px' }} prefix={<SearchOutlined className="text-gray-500" />} />
        <Button onClick={() => onSearch ? onSearch(searchValue) : ''} className="m-2" type="primary" shape="circle" icon={<SearchOutlined />} />
        <Button onClick={() => onAdd ? onAdd() : ''} type="primary" shape="circle" icon={<PlusOutlined />} />
      </div>
    </div>
  );
}

export default OperationBar;
import { Table, Tag, Space, Input, Select, Button } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import { UserAddOutlined } from "@ant-design/icons";
import { userList, addUser, deleteUser } from "../../common/api/api";

interface UserManageProps {

}

interface DataType {
  key?: string | number;
  name: string;
  password: string;
  role: string;
  isAdd?: boolean;
}

const UserManage: FunctionComponent<UserManageProps> = () => {

  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: (name, record, index) => {
        if (record.isAdd) {
          return <Input placeholder="请填写用户名" value={name} onInput={(e: any) => nameInput(e, index)} />
        }
        return <a>{name}</a>
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (password, record, index: number) => {
        if (record.isAdd) {
          return <Input.Password placeholder="请填写密码" value={password} onInput={(e: any) => passwordInput(e, index)} style={{ width: '150px' }} />
        }
        return <Input.Password readOnly bordered={false} value={password} style={{ width: '150px' }} styles={{ input: { textAlign: 'right' } }} />
      }
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role',
      render: (role, record, index) => {
        let color = role === 'admin' ? 'geekblue' : 'green';
        if (record.isAdd) {
          return (
            <Select
              style={{ width: 120 }}
              onChange={(value: string) => roleChange(value, index)}
              placeholder="请选择角色"
              options={[{ value: 'admin', label: '管理员' }, { value: 'user', label: '普通用户' }]}
            />
          )
        }
        return (<Tag color={color} key={role}>
          {role.toUpperCase()}
        </Tag>)
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record, index: number) => (
        <Space size="middle">
          <a onClick={() => userDelete(index)}>删除</a>
          {record.isAdd && <a onClick={() => userAddConfirm(index)}>确认添加</a>}
        </Space>
      ),
    },
  ];
  const [userData, setUserData] = useState<DataType[]>([])

  // 获取用户列表
  useEffect(() => {
    getUserList()
  }, [])

  const getUserList = () => {
    userList().then(res => {
      res.data = res.data.reverse()
      setUserData(res.data.map(item => {
        return {
          name: item.username,
          key: item.username,
          password: item.password,
          role: item.role,
        }
      }))
    })
  }

  // 添加用户
  const userAddHandle = () => {
    setUserData((prev) => {
      prev.splice(0, 0, { name: '', password: '', role: '', isAdd: true, key: new Date().getTime() })
      return [...prev]
    })
  }

  // 用户名输入
  const nameInput = (e: any, index: number) => {
    setUserData((prev) => {
      prev[index].name = e.target.value;
      return [...prev]
    })
  }

  // 密码输入
  const passwordInput = (e: any, index: number) => {
    setUserData((prev) => {
      prev[index].password = e.target.value;
      return [...prev]
    })
  }

  // 角色选择
  const roleChange = (value: string, index: number) => {
    setUserData((prev) => {
      prev[index].role = value;
      return [...prev]
    })
  }

  // 确认添加用户
  const userAddConfirm = (index: number) => {
    const user = userData[index];
    addUser({
      username: user.name,
      password: user.password,
      role: user.role
    }).then(() => {
      getUserList()
    })
  }

  const userDelete = (index: number) => {
    const user = userData[index];
    deleteUser({
      username: user.name,
    }).then(() => {
      getUserList()
    })
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <Button onClick={userAddHandle} type="primary" icon={<UserAddOutlined />}>添加用户</Button>
      </div>
      <Table pagination={{ hideOnSinglePage: true }} columns={columns} dataSource={userData} />
    </div>
  );
}

export default UserManage;
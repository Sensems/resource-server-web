import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload as AntdUpload } from 'antd';

const { Dragger } = AntdUpload;

interface interfaceUploadProps extends UploadProps { }

const Upload: React.FC<interfaceUploadProps> = (props: interfaceUploadProps) => (



  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">单击或将文件拖到此区域以上传</p>
    <p className="ant-upload-hint p-4">支持单次或批量上传。严禁上传公司数据或其他禁止的文件.</p>
  </Dragger>
);

export default Upload;
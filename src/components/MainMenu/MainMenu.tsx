import { useState, forwardRef } from "react";

interface MainMenuProps {
  position: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  },
  onNewFolder?: () => void
  onUpload?: () => void
}

const MainMenu = forwardRef<HTMLDivElement, MainMenuProps>((props: MainMenuProps, ref) => {

  const { onNewFolder, onUpload } = props
  const [menu] = useState(['上传文件', '新建文件夹'])

  // 主菜单点击
  const mainMenuClick = (item: string) => {
    switch (item) {
      case '上传文件':
        onUpload ? onUpload() : ''
        break;
      case '新建文件夹':
        onNewFolder ? onNewFolder() : ''
        break;
      default:
        break;
    }
  }

  return (
    <div ref={ref} className='menu p-1 rounded-xl absolute bg-white drop-shadow-lg z-10' style={{
      left: props.position.left + 'px',
      top: props.position.top + 'px',
      right: props.position.right + 'px',
      bottom: props.position.bottom + 'px'
    }}>
      <div className="text-gray-400 text-xs p-2 leading-1">添加到文件夹</div>
      {menu.map((item, index) => {
        return <div key={index} onClick={() => mainMenuClick(item)} className='menu-item cursor-pointer px-2 w-[140px] h-8 leading-8 text-stone-600 rounded-lg text-sm hover:bg-[#f5f5f6]'>{item}</div>
      })}
    </div>
  );
})

export default MainMenu;
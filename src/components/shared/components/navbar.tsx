import { BarsOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd"


export const NavBar = ()=> {

  const items: MenuProps['items'] = [
    {
      label: <a>Agregar nuevo gasto</a>,
      key: '0',
    },
    {
      label: <a>2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];
  //TODO change this dropdown for a full nav bar when on desktop
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
    <Dropdown menu={{items}} trigger={['click']} overlayStyle={{alignContent: 'left'}}>
      <a href="" onClick={(e) => e.preventDefault()}>
      <Space>
        <BarsOutlined style={{fontSize: '26px'}}/>
      </Space>
    </a>
    </Dropdown>

    </div>
  )
}
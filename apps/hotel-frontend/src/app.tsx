// 运行时配置
import './global.less'; // 确保引入全局样式

import { history, RequestConfig, useModel } from '@umijs/max';
import toggleSvg from './assets/images/toggle.svg'


import { Tooltip } from 'antd';
import Footer from './components/Footer';
import { getCurrentAccount } from './utils/account';
import { errorConfig } from './requestConfig';
import AvatarDropdown from './components/RightContent/AvatarDropdown';
import { Server_API } from './utils/serverApi';
export async function getInitialState(): Promise<any> {
  return getCurrentAccount();
}

export const layout = () => {
    // // 处理树节点的点击事件
    // const navigate = useNavigate();
    const { initialState, setInitialState } = useModel('@@initialState');

  return {
    logo: '/logo/logo.png',
    navTheme: 'light',
    colorPrimary: '#1B499B',
    layout: initialState?.layout || 'top', // 这里动态读取 layout 状态
    contentWidth: 'Fluid',
    siderWidth:340,
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    title: 'Hilton',
    pwa: false,
    pure: false,
    iconfontUrl: '/logo/logo.png',
    menu: {
      locale: false,
    },

    // footerRender: () => <Footer />,
    rightContentRender: () => <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Switch layout" color = "#87d068">
      <img
        src={toggleSvg}
        alt=""
        onClick={() => {
          const newLayout = initialState?.layout === 'side' ? 'top' : 'side';
          setInitialState({ ...initialState, layout: newLayout });
        }}
        style={{ marginRight: 16, cursor: 'pointer' }}
      />
    </Tooltip>
    <AvatarDropdown />
  </div>,
    onPageChange: (location: any) => {
      // const { location } = history
      const currentAccount =  getCurrentAccount()
      if(!currentAccount){
           history.push('/login')
           return
      }
      
    }
       
    
  };
};


// === Base URL ===
console.log('Current API_ENV:', process.env.API_ENV);
const apiEnv = process.env.API_ENV as string; // 获取环境
const baseURL = Server_API[apiEnv];
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL,
  withCredentials: true,
   ...errorConfig
};


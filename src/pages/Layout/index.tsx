// 测试oken是否成功注入
import { request } from '@/utils'
import { useEffect } from 'react'

function Layout() {
  useEffect(() => {
    request.get('/user/profile')
  }, [])
  return <div>Layout</div>
}

export default Layout

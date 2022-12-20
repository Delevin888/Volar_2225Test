import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// TODO: 抽离路由配置
const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'External',
    component: () => import('@/views/otherView.vue'),
    meta: {
      behindCode: 'External',
      title: '404'
    }
  }
]

const routes: Array<RouteRecordRaw> = [...adminRoutes]

function ExpandRouter(routerRecords: Array<RouteRecordRaw>) {
  if (!routerRecords || !routerRecords.length) {
    return null
  }
  const result = [] as { code?: string; name: string }[]

  for (let index = 0; index < routerRecords.length; index++) {
    const element = routerRecords[index]
    result.push({
      code: element.meta?.behindCode as string,
      name: element.name as string
    })
    if (element.children) {
      const childs = ExpandRouter(element.children)
      if (childs && childs.length) {
        result.push(...childs)
      }
    }
  }
  return result
}

export const allRouter = ExpandRouter(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false

  if (process.env.NODE_ENV === 'development') {
    isAuthenticated = true
  }

  if (to.meta.icon) {
    const link = document.querySelector("[rel='icon']")
    link?.setAttribute('href', (to.meta.icon as string) || `/commons/images/favicon.png`)
  }

  if (to.name !== 'login' && !isAuthenticated) {
    location.href = `/login?redirect=${encodeURIComponent(to.fullPath)}`
  } else {
    next()
  }
})

// router.afterEach((to) => {

// })

export default router

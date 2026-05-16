import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ─── Public ──────────────────────────────────────────────────────────
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { requiresAuth: false },
    },

    // ─── Protected (CRM shell) ────────────────────────────────────────────
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/crm/dashboard/DashboardView.vue'),
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('@/views/crm/clients/ClientsView.vue'),
        },
        {
          path: 'clients/:id',
          name: 'client-detail',
          component: () => import('@/views/crm/clients/ClientDetailView.vue'),
          props: true,
        },
        {
          path: 'agenda',
          name: 'agenda',
          component: () => import('@/views/crm/agenda/AgendaView.vue'),
        },
        {
          path: 'kanban',
          name: 'kanban',
          component: () => import('@/views/crm/kanban/KanbanView.vue'),
        },
      ],
    },

    // ─── Catch-all ────────────────────────────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' },
    },
  ],
})

// ─── Navigation Guard ─────────────────────────────────────────────────────────
// Checks authentication before entering any protected route.
router.beforeEach((to) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router

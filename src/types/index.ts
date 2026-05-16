// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'mediator'
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

// ─── Client ───────────────────────────────────────────────────────────────────
export type ClientStatus = 'active' | 'inactive' | 'prospect'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  status: ClientStatus
  assignedTo: string // user id
  createdAt: string
  notes?: string
}

// ─── Agenda ───────────────────────────────────────────────────────────────────
export type AppointmentType = 'meeting' | 'call' | 'reminder'

export interface Appointment {
  id: string
  title: string
  description?: string
  date: string        // ISO 8601
  duration: number    // minutes
  type: AppointmentType
  clientId?: string
  userId: string
}

// ─── Kanban ───────────────────────────────────────────────────────────────────
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface KanbanTask {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assignedTo?: string
  userId: string
  clientId?: string
  dueDate?: string
  tags: string[]
}

export interface KanbanColumn {
  id: TaskStatus
  label: string
  tasks: KanbanTask[]
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string
  code: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

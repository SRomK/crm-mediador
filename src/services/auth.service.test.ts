import { describe, expect, it } from 'vitest'
import { authService } from './auth.service'

describe('authService', () => {
  it('returns a mock token for valid demo credentials', async () => {
    const response = await authService.login({
      email: 'demo@crm.com',
      password: 'demo1234',
    })

    expect(response.token).toBe('mock-jwt-token')
    expect(response.user.role).toBe('mediator')
  })

  it('rejects invalid credentials', async () => {
    await expect(
      authService.login({
        email: 'wrong@crm.com',
        password: 'bad-password',
      }),
    ).rejects.toThrow('Credenciales incorrectas')
  })
})

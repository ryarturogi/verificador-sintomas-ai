import { ConsultationSession } from '@/types/consultation'

const STORAGE_KEY = 'vitalcheck_consultation_history'

/**
 * Service for managing consultation history with localStorage persistence
 */
export class ConsultationHistoryService {
  /**
   * Get all consultation sessions from localStorage
   */
  static getHistory(): ConsultationSession[] {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []

      const parsed = JSON.parse(stored)
      // Convert date strings back to Date objects
      return parsed.map((session: Record<string, unknown>) => ({
        ...session,
        startTime: new Date(session.startTime as string),
        endTime: session.endTime ? new Date(session.endTime as string) : undefined,
        messages: (session.messages as Record<string, unknown>[]).map((msg: Record<string, unknown>) => ({
          ...msg,
          timestamp: new Date(msg.timestamp as string)
        }))
      }))
    } catch (error) {
      console.error('Error loading consultation history:', error)
      return []
    }
  }

  /**
   * Save a consultation session to localStorage
   */
  static saveSession(session: ConsultationSession): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const existingIndex = history.findIndex(s => s.id === session.id)
      
      if (existingIndex >= 0) {
        // Update existing session
        history[existingIndex] = session
      } else {
        // Add new session
        history.unshift(session) // Add to beginning
      }

      // Limit to last 50 sessions to prevent localStorage bloat
      const limitedHistory = history.slice(0, 50)
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory))
    } catch (error) {
      console.error('Error saving consultation session:', error)
    }
  }

  /**
   * Update an existing session
   */
  static updateSession(sessionId: string, updates: Partial<ConsultationSession>): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const sessionIndex = history.findIndex(s => s.id === sessionId)
      
      if (sessionIndex >= 0) {
        history[sessionIndex] = { ...history[sessionIndex], ...updates }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      }
    } catch (error) {
      console.error('Error updating consultation session:', error)
    }
  }

  /**
   * Add a message to an existing session
   */
  static addMessage(sessionId: string, message: ConsultationSession['messages'][0]): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const sessionIndex = history.findIndex(s => s.id === sessionId)
      
      if (sessionIndex >= 0) {
        history[sessionIndex].messages.push(message)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      }
    } catch (error) {
      console.error('Error adding message to session:', error)
    }
  }

  /**
   * Complete a session (set endTime and status)
   */
  static completeSession(sessionId: string, summary?: string, recommendations?: string[]): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const sessionIndex = history.findIndex(s => s.id === sessionId)
      
      if (sessionIndex >= 0) {
        history[sessionIndex] = {
          ...history[sessionIndex],
          endTime: new Date(),
          status: 'completed',
          summary: summary || history[sessionIndex].summary,
          recommendations: recommendations || history[sessionIndex].recommendations
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      }
    } catch (error) {
      console.error('Error completing session:', error)
    }
  }

  /**
   * Cancel a session
   */
  static cancelSession(sessionId: string): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const sessionIndex = history.findIndex(s => s.id === sessionId)
      
      if (sessionIndex >= 0) {
        history[sessionIndex] = {
          ...history[sessionIndex],
          endTime: new Date(),
          status: 'cancelled'
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      }
    } catch (error) {
      console.error('Error cancelling session:', error)
    }
  }

  /**
   * Delete a session from history
   */
  static deleteSession(sessionId: string): void {
    if (typeof window === 'undefined') return

    try {
      const history = this.getHistory()
      const filteredHistory = history.filter(s => s.id !== sessionId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory))
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  /**
   * Clear all consultation history
   */
  static clearHistory(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing history:', error)
    }
  }

  /**
   * Get a specific session by ID
   */
  static getSession(sessionId: string): ConsultationSession | null {
    const history = this.getHistory()
    return history.find(s => s.id === sessionId) || null
  }

  /**
   * Get sessions by doctor ID
   */
  static getSessionsByDoctor(doctorId: string): ConsultationSession[] {
    const history = this.getHistory()
    return history.filter(s => s.specialistId === doctorId)
  }

  /**
   * Get sessions by status
   */
  static getSessionsByStatus(status: 'active' | 'completed' | 'cancelled'): ConsultationSession[] {
    const history = this.getHistory()
    return history.filter(s => s.status === status)
  }

  /**
   * Get recent sessions (last 10)
   */
  static getRecentSessions(limit: number = 10): ConsultationSession[] {
    const history = this.getHistory()
    return history.slice(0, limit)
  }
}

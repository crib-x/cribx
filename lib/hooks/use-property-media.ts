import { useState, useCallback } from 'react'
import { useNotificationStore } from '../store/notifications-store'

interface UsePropertyMediaOptions {
  maxFileSize?: number // in bytes
  allowedTypes?: string[]
  maxFiles?: number
}

export function usePropertyMedia({
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles = 10
}: UsePropertyMediaOptions = {}) {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const addNotification = useNotificationStore(state => state.addNotification)

  const validateFile = useCallback((file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported'
    }
    if (file.size > maxFileSize) {
      return `File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`
    }
    return null
  }, [allowedTypes, maxFileSize])

  const handleFiles = useCallback((newFiles: File[]) => {
    setIsLoading(true)
    try {
      // Check total files limit
      if (files.length + newFiles.length > maxFiles) {
        throw new Error(`Maximum ${maxFiles} files allowed`)
      }

      // Validate each file
      const validationErrors: string[] = []
      newFiles.forEach(file => {
        const error = validateFile(file)
        if (error) validationErrors.push(`${file.name}: ${error}`)
      })

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'))
      }

      setFiles(current => [...current, ...newFiles])
    } catch (error) {
      addNotification({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to process files',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }, [files, maxFiles, validateFile, addNotification])

  const removeFile = useCallback((index: number) => {
    setFiles(current => current.filter((_, i) => i !== index))
  }, [])

  const clearFiles = useCallback(() => {
    setFiles([])
  }, [])

  return {
    files,
    isLoading,
    handleFiles,
    removeFile,
    clearFiles
  }
}
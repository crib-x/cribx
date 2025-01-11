'use server'

import { storageService } from "@/lib/services/storage/storage-service"

export async function uploadFile(file: File, path: string) {

    try {
        const filePath = storageService.uploadFile(file, path)
        if (!filePath) {
            throw new Error('Failed to upload file')
        }
        return filePath
    } catch (error) {

        throw error

    }
}
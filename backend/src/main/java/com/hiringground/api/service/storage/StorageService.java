package com.hiringground.api.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    /**
     * Uploads a file and returns the public URL or path to access it.
     * 
     * @param file The file to upload
     * @param directory The directory/folder to store it in (e.g., "profiles", "resumes")
     * @return The public URL or path to the file
     */
    String uploadFile(MultipartFile file, String directory);
    
    /**
     * Deletes a file from storage.
     * 
     * @param fileUrl The URL or path of the file to delete
     */
    void deleteFile(String fileUrl);
}

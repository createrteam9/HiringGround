package com.hiringground.api.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "local", matchIfMissing = true)
public class LocalStorageServiceImpl implements StorageService {

    private final Path fileStorageLocation;

    public LocalStorageServiceImpl(@Value("${app.storage.local.upload-dir:uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public String uploadFile(MultipartFile file, String directory) {
        try {
            // Create the sub-directory if it doesn't exist
            Path targetLocation = this.fileStorageLocation.resolve(directory);
            Files.createDirectories(targetLocation);

            // Generate unique filename
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String newFileName = UUID.randomUUID().toString() + fileExtension;
            
            Path filePath = targetLocation.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return a relative URL path that can be mapped to a static resource handler in Spring
            // e.g. /files/profiles/uuid.jpg
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/")
                    .path(directory + "/")
                    .path(newFileName)
                    .toUriString();

            return fileDownloadUri;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file. Please try again!", ex);
        }
    }

    @Override
    public void deleteFile(String fileUrl) {
        try {
            // Extract filename from URL (e.g. from http://localhost:8080/files/profiles/uuid.jpg -> profiles/uuid.jpg)
            if (fileUrl != null && fileUrl.contains("/files/")) {
                String relativePath = fileUrl.substring(fileUrl.indexOf("/files/") + 7);
                Path filePath = this.fileStorageLocation.resolve(relativePath).normalize();
                Files.deleteIfExists(filePath);
            }
        } catch (IOException ex) {
            System.err.println("Failed to delete file: " + fileUrl + " - " + ex.getMessage());
        }
    }
}

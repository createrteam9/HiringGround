package com.hiringground.api.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.net.URI;
import java.util.UUID;

@Service
@ConditionalOnProperty(name = "app.storage.provider", havingValue = "r2")
public class CloudflareR2StorageServiceImpl implements StorageService {

    @Value("${app.storage.r2.endpoint}")
    private String endpoint;

    @Value("${app.storage.r2.access-key}")
    private String accessKey;

    @Value("${app.storage.r2.secret-key}")
    private String secretKey;

    @Value("${app.storage.r2.bucket}")
    private String bucketName;

    @Value("${app.storage.r2.public-url}")
    private String publicUrl;

    private S3Client s3Client;

    @PostConstruct
    public void init() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        
        // Cloudflare R2 uses auto as region, but AWS SDK requires a valid region format. us-east-1 is standard fallback.
        this.s3Client = S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .region(Region.US_EAST_1) 
                .build();
    }

    @Override
    public String uploadFile(MultipartFile file, String directory) {
        try {
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            
            String newFileName = directory + "/" + UUID.randomUUID().toString() + fileExtension;

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(newFileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            // Return the public URL to access the file
            return publicUrl + "/" + newFileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file to Cloudflare R2. Please try again!", ex);
        }
    }

    @Override
    public void deleteFile(String fileUrl) {
        try {
            // Extract the key from the public URL
            if (fileUrl != null && fileUrl.startsWith(publicUrl)) {
                String key = fileUrl.substring(publicUrl.length() + 1); // +1 to remove trailing slash if present
                
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();
                
                s3Client.deleteObject(deleteObjectRequest);
            }
        } catch (Exception ex) {
            System.err.println("Failed to delete file from Cloudflare R2: " + fileUrl + " - " + ex.getMessage());
        }
    }
}

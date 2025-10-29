package com.tallerfrida.caso2team8;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;


import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.tallerfrida.caso2team8.controller.*;

/**
 * Unit tests for ImagesAnalysisController#analyzeImage.
 */

@ExtendWith(MockitoExtension.class)
public class ImageAnalysisControllerTestMockito {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private MultipartFile multipartFile;

    @InjectMocks
    private ImagesAnalysisController imagesAnalysisController = Mockito.spy(
        new ImagesAnalysisController()
    );

    @BeforeEach
    public void setup() {
        // Replace RestTemplate with mock for REST call
        //imagesAnalysisController.createRestTemplate() = restTemplate;
    }

    // ---------- Happy Paths ----------
    @Test
    @DisplayName("Test analyzeImage with valid image input")
    void testAnalyzeImageWithValidFile() throws IOException {
        // Arrange
        byte[] imageBytes = new byte[]{1, 2, 3, 4, 5};
        when(multipartFile.getBytes()).thenReturn(imageBytes);
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(imageBytes);
        String payload = "{\"image\":\"" + base64Image + "\"}";
        // Stub constructPayload and extractInnerJson
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        String originalJson = "{\"content\": \"{\\\"label\\\": \\\"cat\\\"}\"}";
        ResponseEntity<String> mockResponse = ResponseEntity.ok(originalJson);
        when(restTemplate.exchange(
                anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)
        )).thenReturn(mockResponse);
        doReturn("{\"label\": \"cat\"}").when(imagesAnalysisController).extractInnerJson(originalJson);

        // Act
        ResponseEntity<String> result = imagesAnalysisController.analyzeImage(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode(), "Should return 200 OK");
        assertEquals("{\"label\": \"cat\"}", result.getBody(), "Should parse content field as JSON");
        verify(multipartFile, times(1)).getBytes();
        verify(imagesAnalysisController, times(1)).constructPayload(base64Image);
        verify(restTemplate, times(1))
            .exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class));
        verify(imagesAnalysisController, times(1)).extractInnerJson(originalJson);
    }

    // ---------- Edge Cases ----------
    @Test
    @DisplayName("Test analyzeImage with empty image file (zero bytes)")
    void testAnalyzeImageWithEmptyFile() throws IOException {
        // Arrange
        byte[] imageBytes = new byte[0];
        when(multipartFile.getBytes()).thenReturn(imageBytes);
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(imageBytes);
        String payload = "{\"image\":\"" + base64Image + "\"}";
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        String origJson = "{\"content\": \"{\\\"label\\\": \\\"none\\\"}\"}";
        ResponseEntity<String> mockResponse = ResponseEntity.ok(origJson);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
                .thenReturn(mockResponse);
        doReturn("{\"label\": \"none\"}").when(imagesAnalysisController).extractInnerJson(origJson);

        // Act
        ResponseEntity<String> result = imagesAnalysisController.analyzeImage(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode(), "Should return 200 OK");
        assertEquals("{\"label\": \"none\"}", result.getBody(), "Should handle empty file gracefully");
    }

    @Test
    @DisplayName("Test analyzeImage with maximum size byte array")
    void testAnalyzeImageWithLargeFile() throws IOException {
        // (Note: JVM memory limits apply. Here, simulate 'large' as 1MB for test feasibility)
        byte[] imageBytes = new byte[1024 * 1024]; // 1MB
        Arrays.fill(imageBytes, (byte) 128);
        when(multipartFile.getBytes()).thenReturn(imageBytes);
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(imageBytes);
        String payload = "{\"image\":\"" + base64Image + "\"}";
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        String origJson = "{\"content\": \"{\\\"label\\\": \\\"large\\\"}\"}";
        ResponseEntity<String> mockResponse = ResponseEntity.ok(origJson);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
                .thenReturn(mockResponse);
        doReturn("{\"label\": \"large\"}").when(imagesAnalysisController).extractInnerJson(origJson);

        // Act
        ResponseEntity<String> result = imagesAnalysisController.analyzeImage(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode(), "Should return 200 OK");
        assertEquals("{\"label\": \"large\"}", result.getBody(), "Should handle large file correctly");
    }

    @Test
    @DisplayName("Test analyzeImage when MultipartFile throws IOException")
    void testAnalyzeImageWithIOException() throws IOException {
        // Arrange
        when(multipartFile.getBytes()).thenThrow(new IOException("Read error"));

        // Act & Assert
        Exception exception = assertThrows(IOException.class, () -> {
            imagesAnalysisController.analyzeImage(multipartFile);
        });
        assertTrue(exception.getMessage().contains("Read error"), "Should propagate IOException from MultipartFile");
    }

    @Test
    @DisplayName("Test analyzeImage when MultipartFile does not contain binary data (type mismatch)")
    void testAnalyzeImageWithStringContentType() throws IOException {
        // Arrange
        // Simulate returning ASCII/UTF string in the byte array
        String fakeString = "not-an-image";
        when(multipartFile.getBytes()).thenReturn(fakeString.getBytes());
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(fakeString.getBytes());
        String payload = "{\"image\":\"" + base64Image + "\"}";
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        String origJson = "{\"content\": \"{\\\"label\\\": \\\"invalid_format\\\"}\"}";
        ResponseEntity<String> mockResponse = ResponseEntity.ok(origJson);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
                .thenReturn(mockResponse);
        doReturn("{\"label\": \"invalid_format\"}").when(imagesAnalysisController).extractInnerJson(origJson);

        // Act
        ResponseEntity<String> result = imagesAnalysisController.analyzeImage(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode(), "Should return 200 OK even for string file");
        assertEquals("{\"label\": \"invalid_format\"}", result.getBody(), "Should handle string input gracefully");
    }

    @Test
    @DisplayName("Test analyzeImage when REST call fails (throws exception)")
    void testAnalyzeImageWithRestCallException() throws IOException {
        // Arrange
        byte[] imageBytes = new byte[]{10, 20, 30};
        when(multipartFile.getBytes()).thenReturn(imageBytes);
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(imageBytes);
        String payload = "{\"image\":\"" + base64Image + "\"}";
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
                .thenThrow(new RuntimeException("REST call error"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            imagesAnalysisController.analyzeImage(multipartFile);
        });
        assertTrue(exception.getMessage().contains("REST call error"), "Should propagate REST call exception");
    }

    @Test
    @DisplayName("Test analyzeImage with non-JSON response from REST API")
    void testAnalyzeImageWithInvalidJsonResponse() throws IOException {
        // Arrange
        byte[] imageBytes = new byte[]{5, 6, 7};
        when(multipartFile.getBytes()).thenReturn(imageBytes);
        String base64Image = org.apache.commons.codec.binary.Base64.encodeBase64String(imageBytes);
        String payload = "{\"image\":\"" + base64Image + "\"}";
        doReturn(payload).when(imagesAnalysisController).constructPayload(base64Image);
        String badResponse = "plain-text-not-json";
        ResponseEntity<String> mockResponse = ResponseEntity.ok(badResponse);
        when(restTemplate.exchange(anyString(), eq(HttpMethod.POST), any(HttpEntity.class), eq(String.class)))
                .thenReturn(mockResponse);
        doReturn("PARSE ERROR").when(imagesAnalysisController).extractInnerJson(badResponse);

        // Act
        ResponseEntity<String> result = imagesAnalysisController.analyzeImage(multipartFile);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode(), "Should return 200 OK");
        assertEquals("PARSE ERROR", result.getBody(), "Should handle non-JSON response gracefully");
    }
}
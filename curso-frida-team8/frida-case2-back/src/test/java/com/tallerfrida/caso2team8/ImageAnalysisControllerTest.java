


package com.tallerfrida.caso2team8;

// Filename: ImagesAnalysisControllerTest.java
// Instructions:
// 1. Ensure you have JUnit 5 and Mockito dependencies in your build configuration (pom.xml or build.gradle).
//    - For Maven, include junit-jupiter and mockito-core.
// 2. This test assumes ImagesAnalysisController has public or package-private visibility.
// 3. Place this file in src/test/java/com/tallerfrida/caso2team8/controller/
// 4. Use your IDE or run: mvn test (for Maven) or gradle test (for Gradle) to execute tests.


import org.apache.commons.codec.binary.Base64;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import com.tallerfrida.caso2team8.controller.*;


/**
 * Unit tests for ImagesAnalysisController.analyzeImage method.
 */

class ImagesAnalysisControllerTest {

    @InjectMocks
    ImagesAnalysisController controller;

    @Mock
    RestTemplate restTemplate;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        // Optionally override RestTemplate in controller using reflection if required
    }

    // Happy Paths
    @Nested
    @DisplayName("Happy Paths")
    class HappyPathTests {

        @Test
        @DisplayName("Test analyzeImage with valid image file returns expected JSON")
        void testAnalyzeImageWithValidImage() throws Exception {
            // Arrange: create a valid mock image file (e.g., PNG)
            byte[] dummyImage = new byte[] {0x01, 0x02, 0x03, 0x04};
            MultipartFile file = new MockMultipartFile("file", "image.png", "image/png", dummyImage);

            // Mock payload/response
            String base64Image = Base64.encodeBase64String(dummyImage);
            String payload = "{\"image\":\"" + base64Image + "\"}";
            String restResponse = "{\"content\":\"{\\\"result\\\":\\\"success\\\"}\"}";
            String extractedJson = "{\"result\":\"success\"}";

            // Spy on controller to mock constructPayload/extractInnerJson
            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());

            doReturn(payload).when(spyController).constructPayload(anyString());
            doReturn(extractedJson).when(spyController).extractInnerJson(restResponse);

            // Mock RestTemplate's exchange
            RestTemplate mockRestTemplate = mock(RestTemplate.class);
            ResponseEntity<String> restEntity = new ResponseEntity<>(restResponse, HttpStatus.OK);
            when(mockRestTemplate.exchange(anyString(), eq(HttpMethod.POST), any(), eq(String.class)))
                    .thenReturn(restEntity);

            // Use reflection if necessary to inject mock RestTemplate
            java.lang.reflect.Field field = ImagesAnalysisController.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(spyController, mockRestTemplate);

            // Act
            ResponseEntity<String> response = spyController.analyzeImage(file);

            // Assert
            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(extractedJson, response.getBody());
        }

        @Test
        @DisplayName("Test analyzeImage with empty but valid file returns correct JSON")
        void testAnalyzeImageWithEmptyFile() throws Exception {
            MultipartFile file = new MockMultipartFile("file", "empty.jpg", "image/jpeg", new byte[0]);
            String payload = "{\"image\":\"\"}";
            String restResponse = "{\"content\":\"{\\\"result\\\":\\\"empty\\\"}\"}";
            String extractedJson = "{\"result\":\"empty\"}";

            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());
            doReturn(payload).when(spyController).constructPayload(anyString());
            doReturn(extractedJson).when(spyController).extractInnerJson(restResponse);

            RestTemplate mockRestTemplate = mock(RestTemplate.class);
            ResponseEntity<String> restEntity = new ResponseEntity<>(restResponse, HttpStatus.OK);
            when(mockRestTemplate.exchange(anyString(), eq(HttpMethod.POST), any(), eq(String.class)))
                    .thenReturn(restEntity);

            java.lang.reflect.Field field = ImagesAnalysisController.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(spyController, mockRestTemplate);

            ResponseEntity<String> response = spyController.analyzeImage(file);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(extractedJson, response.getBody());
        }
    }

    // Edge Cases
    @Nested
    @DisplayName("Edge Cases")
    class EdgeCaseTests {

        @Test
        @DisplayName("Test analyzeImage with null file throws exception")
        void testAnalyzeImageWithNullFile() {
            MultipartFile file = null;

            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());

            assertThrows(NullPointerException.class, () -> spyController.analyzeImage(file));
        }

        @Test
        @DisplayName("Test analyzeImage with IOException when reading bytes")
        void testAnalyzeImageWithIOException() throws Exception {
            MultipartFile file = mock(MultipartFile.class);
            when(file.getBytes()).thenThrow(new IOException("IO error!"));

            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());

            assertThrows(IOException.class, () -> spyController.analyzeImage(file));
        }

        @Test
        @DisplayName("Test analyzeImage with file containing maximum byte size")
        void testAnalyzeImageWithLargeFile() throws Exception {
            // Simulate file with max size (assuming, e.g., 10MB for testing)
            byte[] largeBytes = new byte[10 * 1024 * 1024];
            MultipartFile file = new MockMultipartFile("file", "large.jpg", "image/jpeg", largeBytes);
            String base64Image = Base64.encodeBase64String(largeBytes);
            String payload = "{\"image\":\"" + base64Image + "\"}";
            String restResponse = "{\"content\":\"{\\\"result\\\":\\\"large\\\"}\"}";
            String extractedJson = "{\"result\":\"large\"}";

            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());
            doReturn(payload).when(spyController).constructPayload(anyString());
            doReturn(extractedJson).when(spyController).extractInnerJson(restResponse);

            RestTemplate mockRestTemplate = mock(RestTemplate.class);
            ResponseEntity<String> restEntity = new ResponseEntity<>(restResponse, HttpStatus.OK);
            when(mockRestTemplate.exchange(anyString(), eq(HttpMethod.POST), any(), eq(String.class)))
                    .thenReturn(restEntity);

            java.lang.reflect.Field field = ImagesAnalysisController.class.getDeclaredField("restTemplate");
            field.setAccessible(true);
            field.set(spyController, mockRestTemplate);

            ResponseEntity<String> response = spyController.analyzeImage(file);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(extractedJson, response.getBody());
        }

        @Test
        @DisplayName("Test analyzeImage handles input with incorrect type (string instead of file)")
        void testAnalyzeImageWithIncorrectType() {
            // The controller expects a MultipartFile, so simulate the wrong type scenario
            // by passing null (as only MultipartFile can actually be passed in Spring).
            ImagesAnalysisController spyController = Mockito.spy(new ImagesAnalysisController());
            assertThrows(NullPointerException.class, () -> spyController.analyzeImage(null));
        }
    }
}

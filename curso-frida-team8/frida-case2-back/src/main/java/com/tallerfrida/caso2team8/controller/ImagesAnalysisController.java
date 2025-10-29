package com.tallerfrida.caso2team8.controller;

// Java Spring Boot Controller demonstrating image upload, base64 conversion,
// REST call to LLM endpoint, and extraction of JSON from the returned 'content' field.

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * Controller providing an endpoint to upload an image,
 * send it to a REST LLM service for analysis, and return structured JSON detected in the image.
 */
@RestController
@RequestMapping("/api/image")
public class ImagesAnalysisController {

    private static final String LLM_URL = "https://frida-llm-api.azurewebsites.net/v1/chat/completions";
    private static final String LLM_TOKEN = "iVlsvwYeWzDLc9QVyCzs";

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Accepts images with 'multipart/form-data', including 'image/jpeg', encodes the image, and proxies to LLM.
     *
     * @param file MultipartFile representing the uploaded image
     * @return ResponseEntity with extracted JSON content
     * @throws IOException when reading the image file fails
     */
    @PostMapping(
        value = "/analyze",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> analyzeImage(@RequestParam("file") MultipartFile file) throws IOException {
        // Read image and encode to base64
        byte[] imageBytes = file.getBytes();
        String base64Image = Base64.encodeBase64String(imageBytes);

        // Construct payload with base64 image
        String payload = constructPayload(base64Image);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(LLM_TOKEN);

        // Build request
        HttpEntity<String> requestEntity = new HttpEntity<>(payload, headers);

        // Perform REST call
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                LLM_URL, HttpMethod.POST, requestEntity, String.class
        );

        // Parse response and extract inner JSON from content field
        String extractedJson = extractInnerJson(response.getBody());

        return ResponseEntity.ok(extractedJson);
    }

    /**
     * Constructs the request payload with the base64-encoded image.
     *
     * @param base64Image the image encoded in base64
     * @return the payload as a JSON string
     */
    public String constructPayload(String base64Image) throws IOException {
         // Use ObjectMapper for robust JSON creation, avoid manual string concatenation
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.createObjectNode()
                .put("model", "claude-4-sonnet")
                .put("stream", false)
                .put("enable_caching", true);

        // Build message content array
        JsonNode contentArray = mapper.createArrayNode()
                .add(mapper.createObjectNode()
                        .put("type", "text")
                        .put("text", "Whats in this image?. In spanish. return content as a well formed json with categories such as type of product, estimate weight, price (in Euro) and others sutiable for a supermarket catalogue"))
                .add(mapper.createObjectNode()
                        .put("type", "image_url")
                        .set("image_url", mapper.createObjectNode()
                                .put("url", "data:image/jpeg;base64," + base64Image)
                                .put("detail", "auto")));

        // Build messages array
        JsonNode messagesArray = mapper.createArrayNode()
                .add(mapper.createObjectNode()
                        .put("role", "user")
                        .set("content", contentArray));

        ((com.fasterxml.jackson.databind.node.ObjectNode) root).set("messages", messagesArray);

        return mapper.writeValueAsString(root);
    }

    /**
     * Extracts the inner JSON from the 'content' field in the response body.
     *
     * @param responseBody the raw body returned by the LLM endpoint
     * @return the extracted JSON string
     */
    public String extractInnerJson(String llmResponse) throws IOException {
        JsonNode root = objectMapper.readTree(llmResponse);
        JsonNode contentNode = root.path("choices").get(0)
                .path("message")
                .path("content");

        String content = contentNode.asText();

        // Extract JSON from within triple-backtick block, e.g. ```json\n{ ... }\n```
        int startIdx = content.indexOf("{");
        int endIdx = content.lastIndexOf("}");
        if (startIdx >= 0 && endIdx >= 0 && endIdx > startIdx) {
            String jsonContent = content.substring(startIdx, endIdx + 1);
            // Optionally, validate the inner JSON
            objectMapper.readTree(jsonContent); // Throws if invalid
            return jsonContent;
        }
        // If not found, return the raw content
        return content;   
    }
}
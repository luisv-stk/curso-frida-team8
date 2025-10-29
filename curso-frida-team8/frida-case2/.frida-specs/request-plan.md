<tasks>
  <task>
    <task_name>Create Angular API Service for Image Analysis</task_name>
    <subtasks>
      <subtask>
        <id>1</id>
        <name>Generate base API service structure</name>
        <description>Create api.service.ts file with proper Angular service setup, including necessary imports, dependency injection for HttpClient, and configuration of the base URL pointing to the deployed backend at Railway.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>2</id>
        <name>Implement image analysis service method</name>
        <description>Create analyzeImage method that accepts a File object, constructs FormData for multipart upload, and makes HTTP POST request to /api/image/analyze endpoint with proper headers and error handling.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>3</id>
        <name>Add TypeScript interfaces for API responses</name>
        <description>Define TypeScript interfaces for the expected JSON response structure from the image analysis endpoint, including product type, weight, price, and other supermarket catalogue properties.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>4</id>
        <name>Configure service for dependency injection</name>
        <description>Ensure the service is properly configured as an Injectable provider and can be imported and used throughout the Angular application components.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Create Home Page Component</task_name>
    <subtasks>
      <subtask>
        <id>5</id>
        <name>Generate home-page component structure</name>
        <description>Create home-page component inside the pages folder with proper Angular component architecture including TypeScript class, HTML template, and CSS styling files.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>6</id>
        <name>Design and implement home page layout</name>
        <description>Create an attractive and functional home page layout with navigation, hero section, feature highlights, and call-to-action elements that showcase the image analysis functionality.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>7</id>
        <name>Configure routing for home page</name>
        <description>Set up Angular routing to make the home page accessible and ensure proper navigation integration with the existing application structure.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>8</id>
        <name>Add store management navigation button</name>
        <description>Create a "Gestión de Tienda" button in the home page component that navigates to the manage-product page using Angular Router when clicked.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
</tasks>
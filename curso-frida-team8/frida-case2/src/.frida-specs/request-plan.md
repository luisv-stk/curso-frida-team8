<tasks>
  <task>
    <task_name>Identify and Update Header Component File</task_name>
    <subtasks>
      <subtask>
        <id>1</id>
        <name>Determine target file location for Header component</name>
        <description>Analyze the project structure to identify where this Angular HeaderComponent code should be placed, typically in src/app/header/header.component.ts or src/app/components/header/header.component.ts, or ask the user to specify the exact file location.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>2</id>
        <name>Insert header component code into target file</name>
        <description>Add the complete HeaderComponent class with its @Component decorator, imports, and properties to the identified file location using the appropriate file modification technique.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Update Angular Bootstrap Configuration</task_name>
    <subtasks>
      <subtask>
        <id>3</id>
        <name>Determine main.ts file location and update bootstrap configuration</name>
        <description>Analyze the project structure to identify the main.ts file location (typically in src/main.ts) and insert the Angular bootstrapApplication code with proper imports and configuration, or ask the user to specify the exact file location if unclear.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Update Angular Routes Configuration</task_name>
    <subtasks>
      <subtask>
        <id>4</id>
        <name>Determine target file location for routes configuration</name>
        <description>Analyze the project structure to identify where this Angular routes configuration should be placed, typically in src/app/app.routes.ts or similar routing file, or ask the user to specify the exact file location.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>5</id>
        <name>Insert routes configuration code into target file</name>
        <description>Add the Angular routes configuration with imports and route definitions to the identified file location using the appropriate file modification technique.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Update Main App Template</task_name>
    <subtasks>
      <subtask>
        <id>6</id>
        <name>Identify target file for main app template</name>
        <description>Analyze the project structure to identify where this HTML template should be placed, typically in src/app/app.component.html or similar main template file, or ask the user to specify the exact file location.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>7</id>
        <name>Insert template code into main app file</name>
        <description>Add the HTML template with header component, navigation, and router-outlet to the identified file using selective insertion to preserve existing content where appropriate.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Handle Manage Product Page File Structure</task_name>
    <subtasks>
      <subtask>
        <id>8</id>
        <name>Clarify file location and insert manage product page structure</name>
        <description>Ask the user to specify which file the manage product page structure belongs to, or analyze the project to determine the appropriate location (likely a project documentation file, file tree visualization, or component organization file), then insert the provided directory structure information.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Insert CSS Styles</task_name>
    <subtasks>
      <subtask>
        <id>9</id>
        <name>Identify target file for CSS styles and insert code</name>
        <description>Determine the appropriate CSS file location for the provided section and h2 styles (likely a component CSS file, global styles, or theme file) by analyzing the project structure, or ask the user to specify the exact file location, then insert the CSS styles using selective insertion.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Handle Manage Product Page Component</task_name>
    <subtasks>
      <subtask>
        <id>10</id>
        <name>Determine file location for ManageProductPage component and insert code</name>
        <description>Analyze the project structure to identify the most appropriate location for the ManageProductPage component (typically src/app/manage-product-page/manage-product-page.component.ts or similar), or ask the user to specify the exact file location, then insert the Angular component code using selective insertion.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Handle Navigation Links HTML Template</task_name>
    <subtasks>
      <subtask>
        <id>11</id>
        <name>Identify target file for navigation links template</name>
        <description>Analyze the project structure to determine where this navigation links HTML template belongs, likely in a header component template file (header.component.html), main app template, or navigation component template, or ask the user to specify the exact file location.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>12</id>
        <name>Insert navigation links template code</name>
        <description>Add the navigation links HTML with Angular router directives to the identified template file using selective insertion to integrate with existing content appropriately.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Handle Product Management HTML Template</task_name>
    <subtasks>
      <subtask>
        <id>13</id>
        <name>Determine target file for product management template</name>
        <description>Analyze the project structure to identify where this product management HTML template belongs, likely in a manage-product-page component template file (manage-product-page.component.html) or similar product management component template, or ask the user to specify the exact file location.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>14</id>
        <name>Insert product management template code</name>
        <description>Add the HTML template section with product management content to the identified template file using selective insertion to integrate with existing content appropriately.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Create New Manage Product Page</task_name>
    <subtasks>
      <subtask>
        <id>15</id>
        <name>Create manage-product-page component files in pages folder</name>
        <description>Within the pages folder, create a new manage-product-page directory with all necessary Angular component files including component TypeScript, HTML template, CSS styles, and any required specification files.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
  
  <task>
    <task_name>Add Navigation Functionality to Cart Component</task_name>
    <subtasks>
      <subtask>
        <id>16</id>
        <name>Add click handler to cart component button</name>
        <description>Modify the cart.component.html file to add a click event handler to the "Añadir producto" button that will navigate to the manage-product-page component using Angular Router.</description>
        <completed>true</completed>
      </subtask>
      <subtask>
        <id>17</id>
        <name>Update cart component TypeScript file with navigation logic</name>
        <description>Add the necessary imports for Router service and implement the navigation method in the cart component's TypeScript file to handle the button click and navigate to the manage-product-page route.</description>
        <completed>true</completed>
      </subtask>
    </subtasks>
  </task>
</tasks>
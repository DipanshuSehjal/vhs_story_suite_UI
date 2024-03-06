## Using FormData with fetch API

When sending form data containing files using the `fetch` API and `FormData` in JavaScript, it's important to handle the `Content-Type` header appropriately.

### Correct Approach

When using `FormData` to send form data with files, do **not** manually set the `Content-Type` header to `'multipart/form-data'`. Instead, allow the `fetch` API to handle setting the `Content-Type` header automatically.

Example:
```javascript
// Correct approach: Let fetch API handle Content-Type automatically
const formData = new FormData();
formData.append('fieldName', fieldValue);
// Add more form data fields as needed

fetch('http://example.com/api/endpoint', {
  method: 'POST',
  body: formData,
}).then(response => {
  // Handle response
}).catch(error => {
  // Handle error
});

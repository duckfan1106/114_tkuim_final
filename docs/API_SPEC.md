# API Specification

## Base URL
`http://localhost:5000/api/items`

## Endpoints

### 1. Get All Items
-   **URL**: `/`
-   **Method**: `GET`
-   **Description**: Retrieves a list of all shared items.
-   **Response Example**:
    ```json
    [
      {
        "_id": "6783d...",
        "ownerName": "Ash",
        "itemName": "Pikachu Plush",
        "category": "Plush",
        "condition": "New",
        "description": "A cute electric mouse.",
        "createdAt": "2026-01-12T12:00:00.000Z"
      }
    ]
    ```

### 2. Create Item
-   **URL**: `/`
-   **Method**: `POST`
-   **Description**: Adds a new item to the collection.
-   **Body**:
    ```json
    {
      "ownerName": "Misty",
      "itemName": "Starmie Figure",
      "category": "Figure",
      "condition": "Used",
      "description": "Slight wear on the gem."
    }
    ```
-   **Response**: `201 Created` with the new item object.

### 3. Update Item
-   **URL**: `/:id`
-   **Method**: `PUT`
-   **Description**: Updates an existing item by ID.
-   **Body**: (Any field to update)
    ```json
    {
      "condition": "Like New"
    }
    ```
-   **Response**: `200 OK` with the updated item object.

### 4. Delete Item
-   **URL**: `/:id`
-   **Method**: `DELETE`
-   **Description**: Removes an item from the collection.
-   **Response**: `200 OK` with `{ "message": "Deleted Item" }`.

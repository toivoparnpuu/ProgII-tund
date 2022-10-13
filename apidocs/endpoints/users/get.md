# List of users
List of all users

**URL:** `/api/v1/users/`

**Method** `GET`

## Success Response
**Code:** `200 OK`

**Content examples**

```
{
  "success": true,
  "message": "List of users",
  "users": [
    {
      "id": 1,
      "firstName": "Juhan",
      "lastName": "Juurikas",
      "email": "juhan@juurikas.ee",
      "password": "juhan"
    }
  ]
}
```

# User by id
User by id

**URL:** `/api/v1/users/:id`

**Method** `GET`

## Success Response
**Code:** `200 OK`

**Content examples**

```
{
  "success": true,
  "message": "User",
  "data": {
    "id": 1,
    "firstName": "Juhan",
    "lastName": "Juurikas",
    "email": "juhan@juurikas.ee"
  }
}
```

## Not found response
```
{
  "success": false,
  "message": "User not found"
}
```

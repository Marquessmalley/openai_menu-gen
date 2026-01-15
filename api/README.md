# Menu Generator API

A REST API for managing and retrieving menu schedules.

## Overview

This API serves menu data for the Menu Generator application. It provides endpoints to retrieve the master menu list, current month's generated menu, and historical monthly menus.

## Setup

### Prerequisites

- Node.js
- npm

### Installation

```bash
cd api
npm install
```

### Environment Variables

Create a `.env` file in the `api/` directory:

```
PORT=3000
```

### Running the Server

```bash
npm run dev
```

---

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

---

### 1. Get All Menu Items (Master List)

Retrieves all available menu items from the master menu list. These are the dishes that can be scheduled for monthly menus.

| Property     | Value           |
| ------------ | --------------- |
| **Endpoint** | `GET /api/menu` |
| **Method**   | `GET`           |

#### Response

```json
[
  {
    "id": 1,
    "name": "Chili",
    "sides": ["crackers", "cornbread"]
  },
  {
    "id": 2,
    "name": "Steak Bites",
    "sides": ["sweet potatoes", "broccoli"]
  }
]
```

#### Response Schema

| Field   | Type       | Description                        |
| ------- | ---------- | ---------------------------------- |
| `id`    | `number`   | Unique identifier for the menu item |
| `name`  | `string`   | Name of the dish                   |
| `sides` | `string[]` | Array of side dishes               |

---

### 2. Get Current Month's Menu

Retrieves the generated menu schedule for the current month.

| Property     | Value                   |
| ------------ | ----------------------- |
| **Endpoint** | `GET /api/menu/current` |
| **Method**   | `GET`                   |

#### Response

Returns the current month's menu content.

#### Error Responses

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| `404`       | No menu found for the current month      |

---

### 3. Get All Monthly Menus

Retrieves all generated monthly menus from the archive.

| Property     | Value                  |
| ------------ | ---------------------- |
| **Endpoint** | `GET /api/menu/months` |
| **Method**   | `GET`                  |

#### Response

```json
[
  {
    "month": "January",
    "year": 2026,
    "filename": "January-2026-menu.txt"
  },
  {
    "month": "November",
    "year": 2025,
    "filename": "November-2025-menu.txt"
  }
]
```

#### Response Schema

| Field      | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| `month`    | `string` | Name of the month              |
| `year`     | `number` | Year of the menu               |
| `filename` | `string` | Filename of the menu file      |

---

### 4. Get Specific Month's Menu (Optional)

Retrieves a specific month's menu by month name and year.

| Property     | Value                               |
| ------------ | ----------------------------------- |
| **Endpoint** | `GET /api/menu/months/:month/:year` |
| **Method**   | `GET`                               |

#### Parameters

| Parameter | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `month`   | `string` | Month name (e.g., "January")     |
| `year`    | `string` | Year (e.g., "2026")              |

#### Example

```
GET /api/menu/months/January/2026
```

#### Error Responses

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| `404`       | No menu found for the specified month    |

---

## Project Structure

```
api/
├── src/
│   └── server.ts    # Express server and route definitions
├── package.json
├── tsconfig.json
└── README.md
```

## Data Sources

- **Master Menu**: `src/data/menu.json`
- **Monthly Menus**: `src/data/output/*.txt`

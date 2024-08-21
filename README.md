# Node Communication System Test

## Overview

This project tests a communication system with three nodes (A, B, and H). Node H routes and validates messages from Nodes A and B before storing them in a database. The testing tool generates messages with an ID, data, and signature. The system ensures security by verifying these signatures using a public/private key pair.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm (v7 or later)

### Installation

- Clone the repository:
    ```bash
    git clone https://github.com/your-username/node-communication-system.git
    cd node-communication-system
    ```
- Install dependencies:
    ```bash
    npm install
    ```
### Testing

- Run

    ```bash
    npm run test
    ```

## Testing types

- `Integration Testing: Ensure that the communication and interaction between Nodes A, B, and H function correctly as a whole, including message routing and validation.`
- `Functional Testing: Verify that the system meets its specified requirements, such as correct message validation, routing, and storage behavior, including handling edge cases like non-contiguous or duplicate IDs.`
- `Security Testing: Identify and address potential security vulnerabilities, such as ensuring only valid messages with correct signatures are accepted, and guarding against replay attacks.`




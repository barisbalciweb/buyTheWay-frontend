 # [buyTheWay](btw.barisbalci.de)

<!-- ENGLISH -->
<details>
  <summary>
    ENGLISH
  </summary><br>

⚠️ **Note**: This project is currently under development. Some sections and functionalities are still in progress.

## Introduction
"buyTheWay" is a modern e-commerce application that allows users to shop conveniently and efficiently. With intuitive features and seamless navigation, "buyTheWay" becomes a practical companion for everyday shopping.

## Design
You can view the UI design of the page at the following link: [buyTheWay Figma Design](https://barisbalci.de/buyTheWay-UI.pdf)

## Features
- **Shopping Experience**
  - [x] Users can save desired products to a wishlist and later add them to or remove them from the cart.
  - [x] Users can view recently viewed products.
  - [x] Users are suggested similar products from the same category and gender when available.
  - [x] Users can quickly browse products through the mobile menu.
  - [x] Users can filter products by categories, price, size, etc.
  - [x] Users can search for products.

- **User Management**:
  - [x] Users can register and log in with a secure password.
  - [x] Authentication is implemented using JWT (JSON Web Token).

- **Profile Management**:
  - [x] Users can manage their profiles, update information, and save their favorites.

- **Customer Support**:
  - [ ] Chat support based on multi-agent systems with ChatGPT. 🚧

## Technologies
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API Type**: RESTful API
- **Design Tools**: Figma

## Client-Side Routing
- [x] The application uses **React Router** to enable fast and user-friendly navigation.

## Performance Optimization
- [ ] **Lazy Loading**: Components and resources are loaded as needed to minimize load times. 🚧

## SEO and Accessibility
- [ ] **Lighthouse Score**: The application is optimized for SEO, performance, and accessibility. 🚧
- [x] **Semantic HTML**: For better user experience and accessibility.

## Testing and Code Quality
- [ ] **Unit Tests**: Jest for test coverage. 🚧
- [x] **Code Style**: ESLint and Prettier for consistency.
- [x] **Version Control**: Git with a clear branching strategy.

## Security
- [x] **Proxy Server**: All API requests are routed through a proxy server before reaching the API server, keeping the direct API address hidden for additional security.
- [x] **Data Encryption**: Sensitive data such as passwords and authentication tokens are encrypted during transmission and in the database. 
- [x] **CORS Policies**: Strict Cross-Origin Resource Sharing (CORS) policies are implemented to prevent unauthorized requests. 

## Installation

### Frontend
1. Clone the repository:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-frontend.git
   ```
   or
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend
1. Clone the repository:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-backend.git
   ```
   or
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Proxy Server
1. Clone the repository:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-proxyServer.git
   ```
   or
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-proxyServer.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Demo and Screenshots

[buyTheWay Live Demo](https://btw.barisbalci.de)

<img src="https://github.com/user-attachments/assets/b0e24693-c37c-4737-8d0e-6dbad7ae6fc5" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/8384fa77-d4e1-4686-badc-857b62842a725" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/5f4b4108-3409-4b6c-b4d6-1c36bda46de0" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/4073d1cc-64b7-4e92-b788-768b38bdb45c" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/acc1c675-9d12-4bb6-88df-c74a79bf0fab" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/2613b81f-a202-4631-afe3-39d0459c682b" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/34899d1d-21f0-48bf-8b16-83e3fde89e95" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/f5365bb7-074e-4422-a86f-39b20d99eb45" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/156895f0-f986-40d7-b2ca-9f26d578d650" alt="screenshot" width="200">
</details>


<!-- DEUTCH -->
<details>
  <summary>
    DEUTSCH
  </summary><br>

⚠️ **Hinweis**: Dieses Projekt befindet sich derzeit in der Entwicklung. Einige Abschnitte und Funktionalitäten sind noch in Bearbeitung.

## Einleitung
"buyTheWay" ist eine moderne E-Commerce-Anwendung, die es Benutzern ermöglicht, bequem und effizient einzukaufen. Mit intuitiven Funktionen und reibungsloser Navigation wird "buyTheWay" zu einem praktischen Begleiter für den Alltag.

## Design
Das UI-Design der Seite können Sie unter folgendem Link ansehen: [buyTheWay Figma Design](https://barisbalci.de/buyTheWay-UI.pdf)

## Funktionen
- **Einkaufserlebnis**
  - [x] Benutzer können gewünschte Produkte in einer Wunschliste speichern und sie später in den Warenkorb hinzufügen oder löschen.
  - [x] Benutzer können sehen, welche Produkte sie sich zuletzt angesehen haben.
  - [x] Benutzern werden, falls vorhanden, ähnliche Produkte aus der gleichen Kategorie und Geschlecht vorgeschlagen.
  - [x] Benutzer können schnell über das Mobile-Menü durch die Produkte browsen.
  - [x] Benutzer können Produkte nach z.B. Kategorien, Preis, Größe, etc. filtern.
  - [x] Benutzer können Produkte durchsuchen.

- **Benutzerverwaltung**:
  - [x] Benutzer können sich registrieren und mit einem sicheren Passwort einloggen. 
  - [x] Die Authentifizierung erfolgt über JWT (JSON Web Token).

- **Profilverwaltung**:
  - [x] Benutzer können ihr Profil verwalten, Informationen aktualisieren und ihre Favoriten speichern. 

- **Kundendienst**:
  - [ ] Chat-Support basierend auf Multi-Agent-Systemen mit ChatGPT. 🚧

## Technologien
- **Frontend**: React
- **Backend**: Node.js, Express
- **Datenbank**: MySQL
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **API-Typ**: RESTful API
- **Design-Tools**: Figma

## Client-Side Routing

- [x] Die Anwendung verwendet **React Router**, um eine schnelle und benutzerfreundliche Navigation zu ermöglichen.

## Performance-Optimierung 
- [ ] **Lazy Loading**: Komponenten und Ressourcen werden bei Bedarf geladen, um die Ladezeiten zu minimieren. 🚧

## SEO und Barrierefreiheit (Accessibility)
- [ ] **Lighthouse Score**: Die Anwendung wird auf SEO, Performance und Barrierefreiheit optimiert. 🚧
- [x] **Semantisches HTML**: Für eine bessere Benutzererfahrung und Barrierefreiheit.

## Testing und Codequalität
- [ ] **Unit Tests**: Jest für die Testabdeckung. 🚧
- [x] **Code Style**: ESLint und Prettier für Konsistenz.
- [x] **Versionskontrolle**: Git mit einer klaren Branch-Strategie.

## Sicherheit
- [x] **Proxy-Server**: Alle API-Anfragen werden über einen Proxy-Server geleitet, bevor sie den API-Server erreichen. Dadurch bleibt die direkte API-Adresse verborgen, was ein zusätzliches Sicherheitsniveau bietet.
- [x] **Datenverschlüsselung**: Sensible Daten wie Passwörter und Authentifizierungs-Tokens werden sowohl bei der Übertragung als auch in der Datenbank verschlüsselt. 
- [x] **CORS-Richtlinien**: Strikte Cross-Origin Resource Sharing (CORS)-Richtlinien werden implementiert, um unautorisierte Anfragen zu verhindern. 

## Installation

### Frontend
1. Repository klonen:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-frontend.git
   ```
   oder
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-frontend.git
   ```
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

### Backend
1. Repository klonen:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-backend.git
   ```
   oder
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-backend.git
   ```
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Entwicklungsserver starten:
   ```bash
   npm start
   ```

### Proxy Server
1. Repository klonen:
   ```bash
   git clone git@github.com:barisbalcimusic/buyTheWay-proxyServer.git
   ```
   oder
   ```bash
   git clone https://github.com/barisbalcimusic/buyTheWay-proxyServer.git
   ```
2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
3. Entwicklungsserver starten:
   ```bash
   npm start
   ```

## Demo und Screenshots

[buyTheWay Live-Demo](https://btw.barisbalci.de)

<img src="https://github.com/user-attachments/assets/b0e24693-c37c-4737-8d0e-6dbad7ae6fc5" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/8384fa77-d4e1-4686-badc-857b62842a725" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/5f4b4108-3409-4b6c-b4d6-1c36bda46de0" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/4073d1cc-64b7-4e92-b788-768b38bdb45c" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/acc1c675-9d12-4bb6-88df-c74a79bf0fab" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/2613b81f-a202-4631-afe3-39d0459c682b" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/34899d1d-21f0-48bf-8b16-83e3fde89e95" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/f5365bb7-074e-4422-a86f-39b20d99eb45" alt="screenshot" width="200">
<img src="https://github.com/user-attachments/assets/156895f0-f986-40d7-b2ca-9f26d578d650" alt="screenshot" width="200">
</details>

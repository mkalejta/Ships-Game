# Ships Game

**Ships Game** to przeglądarkowa gra typu "statki" (battleship), stworzona jako projekt edukacyjny. Gra umożliwia rozgrywkę w czasie rzeczywistym z innym graczem przez przeglądarkę, wykorzystując technologię WebSocket.

## Technologie

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white&style=for-the-badge)
![EJS](https://img.shields.io/badge/EJS-8C8C8C?style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![MQTT](https://img.shields.io/badge/MQTT-660066?logo=mqtt&logoColor=white&style=for-the-badge)

## Uruchomienie

### Uruchomienie z Docker (zalecane)

Najłatwiejszy sposób uruchomienia projektu — Docker Compose automatycznie uruchamia serwer aplikacji oraz lokalny broker MQTT.

#### Wymagania

- [Docker](https://www.docker.com/) oraz [Docker Compose](https://docs.docker.com/compose/)

#### Kroki

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/mkalejta/Ships-Game.git
   cd Ships-Game
   ```

2. **Skonfiguruj zmienne środowiskowe (opcjonalnie):**

   Skopiuj plik przykładowy i dostosuj wartości:

   ```bash
   cp .env.example .env
   ```

   Domyślne wartości pozwalają na uruchomienie bez edycji pliku `.env`.

3. **Uruchom projekt:**

   ```bash
   docker compose up --build
   ```

   To polecenie zbuduje obraz aplikacji, uruchomi serwer oraz lokalny broker MQTT (Eclipse Mosquitto).

4. **Zainicjalizuj bazę danych (tylko za pierwszym razem):**

   W drugim terminalu uruchom:

   ```bash
   docker compose exec app node seed.js
   ```

   Skrypt utworzy bazę danych z przykładowymi użytkownikami testowymi.

5. **Otwórz przeglądarkę i przejdź do:**

   ```
   http://localhost:3000
   ```

6. **Zatrzymanie projektu:**

   ```bash
   docker compose down
   ```

   Aby usunąć również dane (baza danych, logi MQTT):

   ```bash
   docker compose down -v
   ```

### Uruchomienie lokalne (bez Dockera)

#### Wymagania

- [Node.js](https://nodejs.org/) (wersja 18 lub wyższa)
- [npm](https://www.npmjs.com/) (zazwyczaj instalowany razem z Node.js)
- Dostęp do brokera MQTT (domyślnie używany jest publiczny broker `test.mosquitto.org`)

#### Kroki

1. **Sklonuj repozytorium:**

   ```bash
   git clone https://github.com/mkalejta/Ships-Game.git
   cd Ships-Game
   ```

2. **Skonfiguruj zmienne środowiskowe:**

   ```bash
   cp .env.example server/.env
   ```

   Edytuj `server/.env` i ustaw wartość `ACCESS_TOKEN_SECRET` na dowolny ciąg znaków.

3. **Zainstaluj zależności:**

   ```bash
   cd server
   npm install
   ```

4. **Zainicjalizuj bazę danych (tylko za pierwszym razem):**

   ```bash
   npm run seed
   ```

   Skrypt utworzy bazę danych z przykładowymi użytkownikami testowymi.

5. **Uruchom serwer:**

   ```bash
   npm start
   ```

6. **Otwórz przeglądarkę i przejdź do:**

   ```
   http://localhost:3000
   ```

## Zmienne środowiskowe

| Zmienna               | Opis                                    | Domyślna wartość               |
|-----------------------|-----------------------------------------|--------------------------------|
| `ACCESS_TOKEN_SECRET` | Sekret JWT do podpisywania tokenów      | `super_secret_key` (Docker)    |
| `MQTT_BROKER_URL`     | Adres URL brokera MQTT                  | `mqtt://test.mosquitto.org`    |
| `PORT`                | Port na którym nasłuchuje serwer        | `3000`                         |
| `API_HOST`            | Adres IPv4 hosta do gry w sieci LAN    | _(pusty — localhost)_          |

### Gra w sieci lokalnej (LAN)

Aby grać z innym urządzeniem w tej samej sieci Wi-Fi/LAN:

1. Sprawdź swój lokalny adres IPv4 (`ifconfig` na Mac / `ipconfig` na Windows)
2. Ustaw zmienną `API_HOST` w pliku `.env` (lub `server/.env`):
   ```
   API_HOST=192.168.0.130
   ```
3. Uruchom (lub zrestartuj) serwer
4. Drugi gracz otwiera w przeglądarce: `http://192.168.0.130:3000`

## Architektura

```
ships-game/
├── client/                  # Warstwa kliencka (widoki + zasoby statyczne)
│   ├── public/
│   │   ├── js/              # Skrypty JavaScript (frontend)
│   │   └── style/           # Arkusze stylów CSS
│   └── views/               # Szablony EJS
├── server/                  # Serwer Node.js / Express
│   ├── objects/             # Modele gry (Board, Game, Player, Ship, User)
│   ├── routing/             # Routing API i middleware
│   ├── db.js                # Konfiguracja bazy danych (JSON)
│   ├── mqttConfig.js        # Konfiguracja klienta MQTT
│   ├── ranking.js           # Logika rankingu (MQTT subscriber)
│   └── index.js             # Punkt wejścia serwera
├── docker-compose.yml       # Orkiestracja Docker
├── Dockerfile               # Obraz Docker aplikacji
├── mosquitto.conf           # Konfiguracja brokera MQTT
└── .env.example             # Przykładowe zmienne środowiskowe
```

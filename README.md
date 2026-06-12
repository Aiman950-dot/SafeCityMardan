# AMS Safe City Mardan

An indigenous, AI-powered city surveillance and public safety platform designed to monitor cities, detect threats, and manage assets in real time on local servers. Fully operational in Mardan, KPK, Pakistan since 2022.

## 🚀 Key Features

AMS Safe City integrates 11 AI-powered modules to run in parallel on your existing IP camera networks:

1. **Weapon Detection**: Automatically flags firearms, knives, and other dangerous objects.
2. **Facial Recognition**: Matches live faces against watchlists of wanted, missing, or unauthorized persons.
3. **Expression Recognition**: Analyzes facial micro-expressions to flag distress, aggression, or fear early.
4. **Drowsiness Detection**: Monitors control-room operators and staff to reduce fatigue-based oversight.
5. **Mob & Crowd Density**: Detects crowd surges, abnormal gatherings, and public order risks.
6. **Perimeter Breach**: Raises location-specific alerts when unauthorized personnel cross restricted lines.
7. **Facemask & Social Distancing**: Monitors health compliance in high-traffic or controlled-access facilities.
8. **Camera Tampering**: Alerts operators instantly if any camera feed is physically obstructed, tilted, or shifted.
9. **Smart Parking Management**: Automates bay occupancy logs, occupancy tracking, and parking violation alerts.
10. **Live Streaming & Command Dashboard**: Aggregates all feeds, alerts, logs, and map tracking in a single interface.
11. **Automatic Number Plate Recognition (ANPR)**: Reads vehicle license plates to track and flag wanted vehicles.

## 🛠️ Technology Stack

- **Frontend**: Clean Semantic HTML5 structure.
- **Styling**: Vanilla CSS for maximum flexibility and performance. Includes a dark-navy-and-pink Command Center/Defense-Tech HUD aesthetic.
- **Interactions**: Vanilla JavaScript for scroll reveals, stats animation counters, 3D tilt effects, magnetic buttons, and dynamic radar sweeps.
- **Assets**: Customized, context-specific AI overlay visualization graphics and transparent logo branding.

## 💻 Running Locally

To run the project locally:

1. Clone this repository.
2. Open the root folder and double-click `index.html` to view in the browser.
3. Alternatively, spin up a local web server (e.g. using Python):
   ```bash
   python -m http.server 8000
   ```
   Open `http://localhost:8000` in your web browser.

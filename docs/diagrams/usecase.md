# Use Case Diagram

```mermaid
usecaseDiagram
    actor User as "Academic User / Examiner"

    package "SafeRoute AI System" {
        usecase UC1 as "View Summary Dashboard"
        usecase UC2 as "Predict Accident Severity"
        usecase UC3 as "Explore Interactive Analytics"
        usecase UC4 as "Inspect Risk Hotspot Map"
        usecase UC5 as "Compare Model Performance Metrics"
    }

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
```

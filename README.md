# PersonalScheduler

An AI-powered personal scheduler with conflict resolution, built in Java.

## Features
- Add, list, and categorize tasks
- Schedule tasks to time slots
- Automatic conflict detection and resolution
- Command-line interface (CLI)
- (Planned) File saving/loading for persistent storage

## Usage
1. **Compile the project:**
   ```sh
   javac -d out src/main/**/*.java
   ```
2. **Run the program:**
   ```sh
   java -cp out main.main
   ```
3. **Menu options:**
   - Add categories and tasks
   - List all tasks
   - Schedule tasks (with conflict resolution)
   - View scheduled tasks

## Project Structure
- `src/main/models/` — Core data models (Task, Category, TimeSlot)
- `src/main/` — Main logic (TaskManager, Scheduler, ConflictResolver, main.java)
- `src/main/utils/` — Utility classes (DateTimeUtils)

## Requirements
- Java 8 or higher

## Contributing
Pull requests and suggestions are welcome!

## License
MIT (or specify your preferred license) 
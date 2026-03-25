package com.scheduler;

import com.scheduler.models.Task;
import com.scheduler.models.Category;
import com.scheduler.models.TimeSlot;
import com.scheduler.utils.DateTimeUtils;
import com.scheduler.service.TaskManager;
import com.scheduler.service.Scheduler;
import com.scheduler.service.ConflictResolver;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.*;
import java.io.*;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final TaskManager taskManager = new TaskManager();
    private static final Scheduler scheduler = new Scheduler();
    private static final ConflictResolver conflictResolver = new ConflictResolver();
    private static final List<Category> categories = new ArrayList<>();
    private static final String TASKS_FILE = "tasks.csv";
    private static final String CATEGORIES_FILE = "categories.csv";

    public static void main(String[] args) {
        loadCategories();
        taskManager.loadTasksFromFile(TASKS_FILE, categories);
        while (true) {
            printMenu();
            String choice = scanner.nextLine();
            switch (choice) {
                case "1":
                    addCategory();
                    break;
                case "2":
                    addTask();
                    break;
                case "3":
                    listTasks();
                    break;
                case "4":
                    scheduleTask();
                    break;
                case "5":
                    viewScheduledTasks();
                    break;
                case "0":
                    saveCategories();
                    taskManager.saveTasksToFile(TASKS_FILE);
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }

    private static void printMenu() {
        System.out.println("\n--- Personal Scheduler Menu ---");
        System.out.println("1. Add Category");
        System.out.println("2. Add Task");
        System.out.println("3. List Tasks");
        System.out.println("4. Schedule Task");
        System.out.println("5. View Scheduled Tasks");
        System.out.println("0. Exit");
        System.out.print("Enter your choice: ");
    }

    private static void addCategory() {
        System.out.print("Enter category name: ");
        String name = scanner.nextLine();
        categories.add(new Category(name));
        System.out.println("Category added.");
    }

    private static void addTask() {
        System.out.print("Enter task title: ");
        String title = scanner.nextLine();
        System.out.print("Enter description: ");
        String desc = scanner.nextLine();
        System.out.print("Enter deadline (yyyy-MM-dd HH:mm): ");
        LocalDateTime deadline = DateTimeUtils.parse(scanner.nextLine());
        System.out.print("Enter priority (1-5): ");
        int priority = Integer.parseInt(scanner.nextLine());
        System.out.println("Select category:");
        for (int i = 0; i < categories.size(); i++) {
            System.out.println((i + 1) + ". " + categories.get(i).getName());
        }
        int catIdx = Integer.parseInt(scanner.nextLine()) - 1;
        Category category = (catIdx >= 0 && catIdx < categories.size()) ? categories.get(catIdx) : null;
        Task task = new Task(title, desc, deadline, priority, category);
        taskManager.addTask(task);
        System.out.println("Task added.");
    }

    private static void listTasks() {
        List<Task> tasks = taskManager.getAllTasks();
        if (tasks.isEmpty()) {
            System.out.println("No tasks found.");
            return;
        }
        for (int i = 0; i < tasks.size(); i++) {
            System.out.println((i + 1) + ". " + tasks.get(i));
        }
    }

    private static void scheduleTask() {
        List<Task> tasks = taskManager.getAllTasks();
        if (tasks.isEmpty()) {
            System.out.println("No tasks to schedule.");
            return;
        }
        System.out.println("Select a task to schedule:");
        for (int i = 0; i < tasks.size(); i++) {
            System.out.println((i + 1) + ". " + tasks.get(i));
        }
        int taskIdx = Integer.parseInt(scanner.nextLine()) - 1;
        if (taskIdx < 0 || taskIdx >= tasks.size()) {
            System.out.println("Invalid task selection.");
            return;
        }
        Task task = tasks.get(taskIdx);
        System.out.print("Enter start time (yyyy-MM-dd HH:mm): ");
        LocalDateTime start = DateTimeUtils.parse(scanner.nextLine());
        System.out.print("Enter duration in minutes: ");
        long minutes = Long.parseLong(scanner.nextLine());
        LocalDateTime end = start.plusMinutes(minutes);
        TimeSlot slot = new TimeSlot(start, end);
        if (conflictResolver.hasConflict(slot, scheduler.getAllScheduledSlots())) {
            System.out.println("Conflict detected! Suggesting next available slot...");
            TimeSlot suggestion = conflictResolver.suggestNonConflictingSlot(start, Duration.ofMinutes(minutes), scheduler.getAllScheduledSlots());
            System.out.println("Suggested slot: " + suggestion.getStartTime() + " to " + suggestion.getEndTime());
            System.out.print("Schedule at suggested time? (y/n): ");
            if (scanner.nextLine().trim().equalsIgnoreCase("y")) {
                scheduler.scheduleTask(task, suggestion);
                System.out.println("Task scheduled at suggested time.");
            } else {
                System.out.println("Task not scheduled.");
            }
        } else {
            scheduler.scheduleTask(task, slot);
            System.out.println("Task scheduled.");
        }
    }

    private static void viewScheduledTasks() {
        List<TimeSlot> slots = scheduler.getAllScheduledSlots();
        if (slots.isEmpty()) {
            System.out.println("No scheduled tasks.");
            return;
        }
        for (TimeSlot slot : slots) {
            System.out.println(slot);
        }
    }

    // Category file I/O
    private static void saveCategories() {
        try (PrintWriter writer = new PrintWriter(new FileWriter(CATEGORIES_FILE))) {
            for (Category cat : categories) {
                writer.println(escape(cat.getName()));
            }
        } catch (IOException e) {
            System.err.println("Error saving categories: " + e.getMessage());
        }
    }
    private static void loadCategories() {
        categories.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(CATEGORIES_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                categories.add(new Category(unescape(line)));
            }
        } catch (FileNotFoundException e) {
            // Ignore if file doesn't exist
        } catch (IOException e) {
            System.err.println("Error loading categories: " + e.getMessage());
        }
    }
    private static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace(",", "\\,");
    }
    private static String unescape(String s) {
        if (s == null) return "";
        return s.replace("\\,", ",").replace("\\\\", "\\");
    }
}

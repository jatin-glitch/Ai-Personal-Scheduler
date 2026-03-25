package com.scheduler.service;

import com.scheduler.models.Task;
import com.scheduler.models.Category;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.io.*;
import java.time.LocalDateTime;
import com.scheduler.utils.DateTimeUtils;

public class TaskManager {
    private List<Task> tasks;

    public TaskManager() {
        this.tasks = new ArrayList<>();
    }

    public void addTask(Task task) {
        tasks.add(task);
    }

    public boolean removeTask(Task task) {
        return tasks.remove(task);
    }

    public boolean updateTask(Task oldTask, Task newTask) {
        int idx = tasks.indexOf(oldTask);
        if (idx != -1) {
            tasks.set(idx, newTask);
            return true;
        }
        return false;
    }

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks);
    }

    public List<Task> getTasksByCategory(Category category) {
        return tasks.stream()
                .filter(task -> task.getCategory() != null && task.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    public List<Task> getTasksByPriority(int priority) {
        return tasks.stream()
                .filter(task -> task.getPriority() == priority)
                .collect(Collectors.toList());
    }

    public List<Task> getCompletedTasks() {
        return tasks.stream()
                .filter(Task::isCompleted)
                .collect(Collectors.toList());
    }

    public List<Task> getIncompleteTasks() {
        return tasks.stream()
                .filter(task -> !task.isCompleted())
                .collect(Collectors.toList());
    }

    // File I/O: Save tasks to CSV
    public void saveTasksToFile(String filename) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            for (Task task : tasks) {
                writer.printf("%s,%s,%s,%d,%s,%b\n",
                        escape(task.getTitle()),
                        escape(task.getDescription()),
                        DateTimeUtils.format(task.getDeadline()),
                        task.getPriority(),
                        task.getCategory() != null ? escape(task.getCategory().getName()) : "",
                        task.isCompleted()
                );
            }
        } catch (IOException e) {
            System.err.println("Error saving tasks: " + e.getMessage());
        }
    }

    // File I/O: Load tasks from CSV
    public void loadTasksFromFile(String filename, List<Category> categories) {
        tasks.clear();
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = splitCsv(line);
                if (parts.length < 6) continue;
                String title = unescape(parts[0]);
                String desc = unescape(parts[1]);
                LocalDateTime deadline = DateTimeUtils.parse(parts[2]);
                int priority = Integer.parseInt(parts[3]);
                String catName = unescape(parts[4]);
                boolean completed = Boolean.parseBoolean(parts[5]);
                Category cat = categories.stream().filter(c -> c.getName().equals(catName)).findFirst().orElse(null);
                Task task = new Task(title, desc, deadline, priority, cat);
                task.setCompleted(completed);
                tasks.add(task);
            }
        } catch (FileNotFoundException e) {
            // Ignore if file doesn't exist
        } catch (IOException e) {
            System.err.println("Error loading tasks: " + e.getMessage());
        }
    }

    // Helper for CSV escaping
    private String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace(",", "\\,");
    }
    private String unescape(String s) {
        if (s == null) return "";
        return s.replace("\\,", ",").replace("\\\\", "\\");
    }
    private String[] splitCsv(String line) {
        List<String> result = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean escape = false;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (escape) {
                sb.append(c);
                escape = false;
            } else if (c == '\\') {
                escape = true;
            } else if (c == ',') {
                result.add(sb.toString());
                sb.setLength(0);
            } else {
                sb.append(c);
            }
        }
        result.add(sb.toString());
        return result.toArray(new String[0]);
    }
}

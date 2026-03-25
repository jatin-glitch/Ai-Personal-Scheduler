package com.scheduler.controllers;

import com.scheduler.models.Task;
import com.scheduler.service.TaskManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskManager taskManager = new TaskManager();

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskManager.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        taskManager.addTask(task);
        return ResponseEntity.ok(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable String id, @RequestBody Task task) {
        // For simplicity, using title as ID (in real app, use proper ID)
        List<Task> tasks = taskManager.getAllTasks();
        Task existingTask = tasks.stream()
                .filter(t -> t.getTitle().equals(id))
                .findFirst()
                .orElse(null);
        
        if (existingTask != null) {
            taskManager.updateTask(existingTask, task);
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        List<Task> tasks = taskManager.getAllTasks();
        Task taskToDelete = tasks.stream()
                .filter(t -> t.getTitle().equals(id))
                .findFirst()
                .orElse(null);
        
        if (taskToDelete != null) {
            taskManager.removeTask(taskToDelete);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

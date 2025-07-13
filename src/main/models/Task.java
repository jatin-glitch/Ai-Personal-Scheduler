package main.models;

import java.time.LocalDateTime;
import java.util.Objects;

public class Task {
    private String title;
    private String description;
    private LocalDateTime deadline;
    private int priority;  
    private Category category;
    private boolean completed;

    // Constructor
    public Task(String title, String description, LocalDateTime deadline, int priority, Category category) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.setPriority(priority); 
        this.category = category;
        this.completed = false;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        if (priority < 1 || priority > 5) {
            throw new IllegalArgumentException("Priority must be between 1 and 5");
        }
        this.priority = priority;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return "Task{" +
                "title='" + title + '\'' +
                ", deadline=" + deadline +
                ", priority=" + priority +
                ", category=" + category +
                ", completed=" + completed +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return priority == task.priority &&
                completed == task.completed &&
                Objects.equals(title, task.title) &&
                Objects.equals(deadline, task.deadline) &&
                Objects.equals(category, task.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, deadline, priority, category, completed);
    }
}

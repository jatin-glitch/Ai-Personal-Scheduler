package main;

import main.models.Task;
import main.models.TimeSlot;
import java.util.ArrayList;
import java.util.List;

public class Scheduler {
    private List<TimeSlot> scheduledSlots;

    public Scheduler() {
        this.scheduledSlots = new ArrayList<>();
    }

    public boolean scheduleTask(Task task, TimeSlot slot) {
        // Check for conflicts
        for (TimeSlot existing : scheduledSlots) {
            if (slot.overlaps(existing)) {
                return false; // Conflict detected
            }
        }
        slot.setTask(task);
        scheduledSlots.add(slot);
        return true;
    }

    public List<TimeSlot> getAllScheduledSlots() {
        return new ArrayList<>(scheduledSlots);
    }

    public List<TimeSlot> getConflictingSlots(TimeSlot slot) {
        List<TimeSlot> conflicts = new ArrayList<>();
        for (TimeSlot existing : scheduledSlots) {
            if (slot.overlaps(existing)) {
                conflicts.add(existing);
            }
        }
        return conflicts;
    }
}

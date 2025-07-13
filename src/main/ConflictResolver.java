package main;

import main.models.TimeSlot;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public class ConflictResolver {
    // Returns true if the slot conflicts with any in the list
    public boolean hasConflict(TimeSlot slot, List<TimeSlot> scheduledSlots) {
        for (TimeSlot existing : scheduledSlots) {
            if (slot.overlaps(existing)) {
                return true;
            }
        }
        return false;
    }

    // Suggests a new non-conflicting time slot after the given start
    public TimeSlot suggestNonConflictingSlot(LocalDateTime desiredStart, Duration duration, List<TimeSlot> scheduledSlots) {
        LocalDateTime start = desiredStart;
        LocalDateTime end = start.plus(duration);
        TimeSlot candidate = new TimeSlot(start, end);
        boolean conflict;
        do {
            conflict = false;
            for (TimeSlot existing : scheduledSlots) {
                if (candidate.overlaps(existing)) {
                    // Move start to the end of the conflicting slot
                    start = existing.getEndTime();
                    end = start.plus(duration);
                    candidate = new TimeSlot(start, end);
                    conflict = true;
                    break;
                }
            }
        } while (conflict);
        return candidate;
    }
}

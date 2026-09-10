// Central definitions for ticket status and priority.
// Keeping these in one place avoids "magic strings" scattered across components.

export const STATUS = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
};

export const PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

// Ordered lists used to populate filter dropdowns and status selectors.
export const STATUS_OPTIONS = [STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.RESOLVED];
export const PRIORITY_OPTIONS = [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH];

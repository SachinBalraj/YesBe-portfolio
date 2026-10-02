export interface ScrollToTopButtonProps {
  className?: string;
  showThreshold?: number;
  /**
   * Selector for content that owns the bottom of the mobile viewport. While any
   * of it is on screen the button stands down on phones, so it can never sit on
   * top of the consultation form's Back/Continue controls. Ignored on desktop.
   */
  yieldToSelector?: string;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
}

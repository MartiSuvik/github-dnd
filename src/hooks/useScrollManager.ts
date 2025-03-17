import { useEffect, useRef } from 'react';

interface ScrollState {
  isLocked: boolean;
  position: number;
}

class ScrollManager {
  private static instance: ScrollManager;
  private state: ScrollState = {
    isLocked: false,
    position: 0,
  };
  private subscribers = new Set<(state: ScrollState) => void>();
  private scrollbarWidth: number;

  private constructor() {
    // Calculate scrollbar width once
    this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  subscribe(callback: (state: ScrollState) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  lockScroll() {
    if (!this.state.isLocked) {
      // Store current scroll position
      this.state.position = window.scrollY;
      this.state.isLocked = true;

      // Prevent content shift when scrollbar disappears
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
      
      // Fix the body position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.state.position}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.bottom = '0';
      document.body.style.overflow = 'hidden';
      
      this.notify();
    }
  }

  unlockScroll() {
    if (this.state.isLocked) {
      // Remove all styles in a specific order
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.bottom = '';

      // Restore scroll position
      requestAnimationFrame(() => {
        window.scrollTo({
          top: this.state.position,
          behavior: 'instant' as ScrollBehavior
        });
        
        this.state.isLocked = false;
        this.notify();
      });
    }
  }

  isScrollLocked() {
    return this.state.isLocked;
  }

  getScrollPosition() {
    return this.state.position;
  }
}

export const useScrollManager = () => {
  const manager = ScrollManager.getInstance();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return manager;
};
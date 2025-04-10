import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.updateSidebarState();
  }

  closeSidebar() {
    this.isOpen = false;
    this.updateSidebarState();
  }

  private updateSidebarState() {
    const sidebar = document.getElementById('default-sidebar');
    const backdrop = document.getElementById('default-sidebar-backdrop');
    
    if (sidebar && backdrop) {
      if (this.isOpen) {
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
      } else {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
      }
    }
  }
}

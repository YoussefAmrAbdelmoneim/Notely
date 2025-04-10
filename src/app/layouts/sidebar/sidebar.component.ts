import { isPlatformBrowser } from '@angular/common';
import { Component, inject, input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html', 
  styleUrl: './sidebar.component.scss' 
})
export class SidebarComponent implements OnInit{  
  isLogin = input<boolean>(true);
  constructor(private renderer: Renderer2 ,public sidebarService: SidebarService){}
 private readonly platformId= inject(PLATFORM_ID);
 private readonly router=inject(Router)
  isDarkMode: boolean = false;
  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
  
      const htmlElement = document.documentElement;
  
      if (this.isDarkMode) {
        this.renderer.addClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.removeClass(htmlElement, 'dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      if (this.isDarkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      }
    }
  }
logOut(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}

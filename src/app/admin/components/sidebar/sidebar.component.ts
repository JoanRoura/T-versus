import { Component, Input, ViewChild } from '@angular/core';

import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  @ViewChild('sidebar') sidebar!: Sidebar;

  @Input() display!: boolean;

}

import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  items: MegaMenuItem[] = [
    {
      label: 'Videos', icon: 'bi bi-camera-reels',
      items: [
        [
          {
            label: 'Video 1',
            items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
          },
          {
            label: 'Video 2',
            items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
          }
        ],
        [
          {
            label: 'Video 3',
            items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
          },
          {
            label: 'Video 4',
            items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
          }
        ]
      ]
    },
    {
      label: 'Users', icon: 'bi bi-people-fill',
      items: [
        [
          {
            label: 'User 1',
            items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
          },
          {
            label: 'User 2',
            items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
          },
        ],
        [
          {
            label: 'User 3',
            items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
          },
          {
            label: 'User 4',
            items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
          }
        ],
        [
          {
            label: 'User 5',
            items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
          },
          {
            label: 'User 6',
            items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
          }
        ]
      ]
    },
    {
      label: 'Events', icon: 'bi bi-calendar-fill',
      items: [
        [
          {
            label: 'Event 1',
            items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
          },
          {
            label: 'Event 2',
            items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
          }
        ],
        [
          {
            label: 'Event 3',
            items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
          },
          {
            label: 'Event 4',
            items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
          }
        ]
      ]
    },
    {
      label: 'Settings', icon: 'bi bi-gear',
      items: [
        [
          {
            label: 'Setting 1',
            items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
          },
          {
            label: 'Setting 2',
            items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
          },
          {
            label: 'Setting 3',
            items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
          }
        ],
        [
          {
            label: 'Technology 4',
            items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
          }
        ]
      ]
    }
  ];

}

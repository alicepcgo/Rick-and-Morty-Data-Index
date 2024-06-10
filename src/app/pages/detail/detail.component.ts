import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarComponent } from '../../toolbar/toolbar.component';

interface ExtraByType {
  [key: string]: [string, string, string];
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  info: any = {}; 
  type: string;
  id: number;
  extras: any[] = []; 
  extraByType: ExtraByType = {
    "episode": ["characters", "character", "Characters featured in:"],
    "location": ["residents", "character", "Located at:"],
    "character": ["episode", "episode", "Episodes featured in:"]
  };

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.id = +this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
  }

  async ngOnInit(): Promise<void> {
    this.info = await this.api.detail(this.type, this.id);
    const ids = this.info[this.extraByType[this.type][0]]
      .map((i: string) => i.split('/').slice(-1)[0])
      .join(',');
    this.extras = await this.api.extras(this.extraByType[this.type][1], ids);
  }
}

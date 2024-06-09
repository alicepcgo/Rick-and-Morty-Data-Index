import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  info: any = {};
  type: string;
  id: number;
  extras: any[] = [];
  extraByType: any = {
    "episode": ["characters", "character", "Characters featured in:"],
    "location": ["residents", "character", "Located at:"],
    "character": ["episode", "episode", "Episodes featured in:"]
  }

  constructor(private api: ApiService, private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
  }

  async ngOnInit() {
    this.info = await this.api.detail(this.type, this.id);
    let ids = []
    ids = this.info[this.extraByType[this.type][0]].map((i: any) => {
      return i.split('/').slice(-1)
    }).join(',');
    this.extras = await this.api.extras(this.extraByType[this.type][1], ids);
  }
}

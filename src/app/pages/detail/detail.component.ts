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

  constructor(private api: ApiService, private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];
    this.type = this.route.snapshot.params['type'];
  }

  async ngOnInit() {
    this.info = await this.api.detail(this.type, this.id)
    console.log(this.info);
  }
}

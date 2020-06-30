import { globals } from './../../../utils/golbals';
import { AuthServiceService } from './../../../services/testeo/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-test',
  templateUrl: './header-test.component.html',
  styleUrls: ['./header-test.component.scss']
})
export class HeaderTestComponent implements OnInit {

  constructor(
    private authService: AuthServiceService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut().then(() => {
      // globals.estado = false;
      this.router.navigate(['/entrar']);
    })
  }

}

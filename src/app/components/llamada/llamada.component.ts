import { Router, ActivatedRoute } from '@angular/router';
import { id } from 'date-fns/locale';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-llamada',
  templateUrl: './llamada.component.html',
  styleUrls: ['./llamada.component.scss']
})
export class LlamadaComponent implements OnInit {
  id = ""
  url
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.url = "https://meet.jit.si/" + this.id + "#jitsi_meet_external_api_id=0&amp;config.channelLastN=4&amp;config.startWithAudioMuted=true&amp;config.startWithVideoMuted=true&amp;interfaceConfig.TOOLBAR_BUTTONS=%5B%22microphone%22%2C%22camera%22%2C%22closedcaptions%22%2C%22desktop%22%2C%22fullscreen%22%2C%22fodeviceselection%22%2C%22hangup%22%2C%22profile%22%2C%22chat%22%2C%22recording%22%2C%22%22%2C%22etherpad%22%2C%22sharedvideo%22%2C%22settings%22%2C%22raisehand%22%2C%22videoquality%22%2C%22filmstrip%22%2C%22invite%22%2C%22feedback%22%2C%22stats%22%2C%22shortcuts%22%2C%22tileview%22%2C%22%22%2C%22download%22%2C%22help%22%2C%22mute-everyone%22%2C%22security%22%5D&amp;interfaceConfig.SHOW_JITSI_WATERMARK=true&amp;interfaceConfig.JITSI_WATERMARK_LINK=%22https%3A%2F%2Futcancun.ozelot.tech%22"

  }
  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
import { AppInitConfig } from '@type';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppInitConfig;

  setConfig(config: AppInitConfig) {
    this.config = config;
  }
}

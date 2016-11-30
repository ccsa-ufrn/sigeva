import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ExternalModule } from './external.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(ExternalModule);
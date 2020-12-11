import { Routes } from '@angular/router';
import { AcsComponent } from './acs/acs.component';
import { LoginComponent } from './login/login.component';
import { MetadataComponent } from './metadata/metadata.component';
import { SlsComponent } from './sls/sls.component';

export const SsoRouters: Routes = [
    {
        path: 'SSOLogin',
        children: [
            {
                path: 'acs',
                component: AcsComponent
            },
            {
                path: 'metadata',
                component: MetadataComponent
            },
            {
                path: 'sls',
                component: SlsComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
]
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { HomeComponent } from './home/home.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

export const PublicRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'faq',
                component: FaqComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'not-authorized',
                component: NotAuthorizedComponent
            },
            {
                path: 'user-guide',
                component: UserGuideComponent
            },
            {
                path: 'terms-conditions',
                component: TermsConditionsComponent
            }
        ]
    }
]
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { HomeComponent } from './home/home.component';

export const PublicRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'contact-us',
                component: ContactComponent
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
                path: 'user-guide',
                component: UserGuideComponent
            }
        ]
    }
]
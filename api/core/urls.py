from datetime import datetime, timedelta

from django.conf import settings
from django.conf.urls import include, url
from django.contrib.gis import admin

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()

# Freeforms app

from freeforms.views import (
    FreeformViewSet
)

freeforms_router = router.register(
    'freeforms', FreeformViewSet
)

# Organisations app

from organisations.views import (
    OrganisationViewSet
)

organisations_router = router.register(
    'organisations', OrganisationViewSet
)

# Outfits app

from outfits.views import (
    OutfitViewSet
)

outfits_router = router.register(
    'outfits', OutfitViewSet
)

# Products app

from products.views import (
    ProductViewSet
)

products_router = router.register(
    'products', ProductViewSet
)

# Tickets app

from tickets.views import (
    TicketTopicViewSet,
    TicketSubjectViewSet,
    TicketViewSet,
    TicketCBIDViewSet,
    TicketInvestigationViewSet
)

ticket_topics_router = router.register(
    'ticket-topics', TicketTopicViewSet
)

ticket_subjects_router = router.register(
    'ticket-subjects', TicketSubjectViewSet
)

tickets_router = router.register(
    'tickets', TicketViewSet
)

cbid_tickets_router = router.register(
    'cbid-tickets', TicketCBIDViewSet
)

investigation_tickets_router = router.register(
    'investigation-tickets', TicketInvestigationViewSet
)

# Transactions app

from transactions.views import (
    TransactionViewSet,
    CartCBIDViewSet,
    CartProductViewSet,
    ReconcileViewSet
)

transactions_router = router.register(
    'transactions', TransactionViewSet
)

cbid_carts_router = router.register(
    'cbid-carts', CartCBIDViewSet
)

product_carts_router = router.register(
    'product-carts', CartProductViewSet
)

reconciles_router = router.register(
    'reconciles', ReconcileViewSet
)

# Users app

from users.views import (
    CustomUserViewSet
)

users_router = router.register(
    'users', CustomUserViewSet
)

urlpatterns = [
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('rest_auth.urls')),
    url(r'auth/registration/', include('rest_auth.registration.urls')),

    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]
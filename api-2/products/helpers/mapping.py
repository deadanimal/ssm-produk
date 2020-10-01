import pytz

from datetime import datetime
from django.utils.timezone import make_aware

def state_mapping(temp_state):

    if temp_state == 'R':
        temp_state = 'PERLIS'
    elif temp_state == 'K':
        temp_state = 'KEDAH'
    elif temp_state == 'P':
        temp_state = 'PULAU PINANG'
    elif temp_state == 'D':
        temp_state = 'KELANTAN'
    elif temp_state == 'T':
        temp_state = 'TERENGGANU'
    elif temp_state == 'A':
        temp_state = 'PERAK'
    elif temp_state == 'B':
        temp_state = 'SELANGOR'
    elif temp_state == 'C':
        temp_state = 'PAHANG'
    elif temp_state == 'M':
        temp_state = 'MELAKA'
    elif temp_state == 'J':
        temp_state = 'JOHOR'
    elif temp_state == 'X':
        temp_state = 'SABAH'
    elif temp_state == 'N':
        temp_state = 'NEGERI SEMBILAN'        
    elif temp_state == 'Y':
        temp_state = 'SARAWAK'
    elif temp_state == 'L':
        temp_state = 'LABUAN'
    elif temp_state == 'W':
        temp_state = 'WILAYAH PERSEKUTUAN'
    elif temp_state == 'Q':
        temp_state = 'SINGAPURA'
    elif temp_state == 'U':
        temp_state = 'WILAYAH PERSEKUTUAN PUTRAJAYA'
    elif temp_state == 'F':
        temp_state = 'FOREIGN'
    elif temp_state == 'I':
        temp_state = 'INTERNET'
    elif temp_state == 'S':
        temp_state = 'SABAH'
    elif temp_state == 'E':
        temp_state = 'SARAWAK'
    
    return temp_state

def time_mapping(temp_time):

    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    temp_time = make_aware(datetime.strptime(temp_time, '%Y-%m-%dT%H:%M:%S.000Z'))
    temp_time = temp_time.astimezone(pytz.timezone(time_zone)).strftime(date_format)

    return temp_time

def status_mapping(temp_status, lang):

    if temp_status == 'A' and lang == 'ms':
        temp_status = 'AKTIF'
    elif temp_status == 'L' and lang == 'ms':
        temp_status = 'LUPUT'
    elif temp_status == 'T' and lang == 'ms':
        temp_status = 'PENAMATAN'
    elif temp_status == 'B' and lang == 'ms':
        temp_status = 'BUBAR-PERTUKARAN KEPADA PERKONGSIAN LIALIBITI TERHAD (PLT)'
    elif temp_status == 'A' and lang == 'en':
        temp_status = 'ACTIVE'
    elif temp_status == 'L' and lang == 'en':
        temp_status = 'EXPIRED'
    elif temp_status == 'T' and lang == 'en':
        temp_status = 'TERMINATED'
    elif temp_status == 'B' and lang == 'en':
        temp_status = 'LLP CONVERSION'
    
    return temp_status

def race_mapping(temp_race):

    if temp_race == 'M':
        temp_race = 'MELAYU'
    elif temp_race == 'C':
        temp_race = 'CINA'
    elif temp_race == 'I':
        temp_race = 'INDIA'
    elif temp_race == 'R':
        temp_race = 'PERSENDIRIAN (SDN BHD)'
    elif temp_race == 'U':
        temp_race = 'UMUM (SYKT AWAM)'
    elif temp_race == 'F':
        temp_race = 'FOREIGNER'
    elif temp_race == 'S':
        temp_race = 'PERNIAGAAN'
    elif temp_race == 'A':
        temp_race = 'PERBADANAN'
    elif temp_race == 'K':
        temp_race = 'KADAZAN'
    elif temp_race == 'D':
        temp_race = 'DUSUN'
    elif temp_race == 'J':
        temp_race = 'BAJAU'
    elif temp_race == 'Y':
        temp_race = 'BIDAYUH'
    elif temp_race == 'T':
        temp_race = 'IBAN'
    elif temp_race == 'E':
        temp_race = 'MELANAU'
    elif temp_race == 'O':
        temp_race = 'LAIN-LAIN BANGSA'
    elif temp_race == 'N':
        temp_race = 'NATIVE'
    elif temp_race == 'B':
        temp_race = 'BUMIPUTERA SABAH'
    elif temp_race == 'W':
        temp_race = 'BUMIPUTERA SARAWAK'
    
    return temp_race

def gender_mapping(temp_gender, lang):

    if temp_gender == 'L' and lang == 'en':
        temp_gender = 'MALE'
    elif temp_gender == 'P' and lang == 'en':
        temp_gender = 'FEMALE'
    elif temp_gender == 'L' and lang == 'ms':
        temp_gender = 'LELAKI'
    elif temp_gender == 'P' and lang == 'ms':
        temp_gender = 'PEREMPUAN'
    
    return temp_gender

def ammend_type_mapping(temp_ammend_type, lang):

    if temp_ammend_type == 'B' and lang == 'en':
        temp_ammend_type = 'NEW OWNER'
    elif temp_ammend_type == 'D' and lang == 'en':
        temp_ammend_type = 'PULL-OUT'
    elif temp_ammend_type == 'M' and lang == 'en':
        temp_ammend_type = 'DECEASED'
    elif temp_ammend_type == 'A' and lang == 'en':
        temp_ammend_type = 'ADDRESS UPDATE'
    elif temp_ammend_type == 'P' and lang == 'en':
        temp_ammend_type = 'OWNERSHIP CHANGES'
    elif temp_ammend_type == 'K' and lang == 'en':
        temp_ammend_type = 'ID CARD NUMBER CHANGES'
    elif temp_ammend_type == 'N' and lang == 'en':
        temp_ammend_type = 'OWNER NAME CHANGES'
    elif temp_ammend_type == 'S' and lang == 'en':
        temp_ammend_type = 'PARTNERSHIP DISSOLVE'
    elif temp_ammend_type == 'O' and lang == 'en':
        temp_ammend_type = 'COURT ORDER'
    elif temp_ammend_type == 'B' and lang == 'ms':
        temp_ammend_type = 'PEMILIK BARU'
    elif temp_ammend_type == 'D' and lang == 'ms':
        temp_ammend_type = 'TARIK DIRI'
    elif temp_ammend_type == 'M' and lang == 'ms':
        temp_ammend_type = 'KEMATIAN'
    elif temp_ammend_type == 'A' and lang == 'ms':
        temp_ammend_type = 'PERUBAHAN ALAMAT'
    elif temp_ammend_type == 'P' and lang == 'ms':
        temp_ammend_type = 'PERUBAHAN NAMA PEMILIK'
    elif temp_ammend_type == 'K' and lang == 'ms':
        temp_ammend_type = 'PERUBAHAN NO KP'
    elif temp_ammend_type == 'N' and lang == 'ms':
        temp_ammend_type = 'PERUBAHAN NAMA PEMILIK'
    elif temp_ammend_type == 'S' and lang == 'ms':
        temp_ammend_type = 'PEMBUBARAN PERKONGSIAN'
    elif temp_ammend_type == 'O' and lang == 'ms':
        temp_ammend_type = 'PERINTAH MAHKAMAH'
    
    return temp_ammend_type

def comp_status_mapping(temp_comp_status, lang):

    if temp_comp_status == 'R' and lang == 'en':
        temp_comp_status = 'PRIVATE LIMITED'
    elif temp_comp_status == 'U' and lang == 'en':
        temp_comp_status = 'PUBLIC LIMITED'
    elif temp_comp_status == 'R' and lang == 'ms':
        temp_comp_status = 'SYARIKAT PERSENDIRIAN'
    elif temp_comp_status == 'U' and lang == 'ms':
        temp_comp_status = 'SYARIKAT AWAM'

    return temp_comp_status

def status_of_comp_mapping(temp_status_of_comp):

    if temp_status_of_comp == 'B':
        temp_status_of_comp = 'DISSOLVED CONVERSION TO LLP'
    elif temp_status_of_comp == 'C':
        temp_status_of_comp = 'CEASED BUSINESS'
    elif temp_status_of_comp == 'D':
        temp_status_of_comp = 'DISSOLVED'
    elif temp_status_of_comp == 'E':
        temp_status_of_comp = 'EXISTING'
    elif temp_status_of_comp == 'R':
        temp_status_of_comp = 'REMOVED'
    elif temp_status_of_comp == 'W':
        temp_status_of_comp = 'WINDING UP'
    elif temp_status_of_comp == 'X':
        temp_status_of_comp = 'NULL AND VOID BY COURT ORDER'
    elif temp_status_of_comp == 'Y':
        temp_status_of_comp = 'STRUCK-OFF & WINDING-UP VIA COURT ORDER'

    return temp_status_of_comp

def comp_type_mapping(temp_comp_type, lang):

    if temp_comp_type == 'B' and lang == 'en':
        temp_comp_type = 'LIMITED BY SHARE AND GUARANTEE'
    elif temp_comp_type == 'G' and lang == 'en':
        temp_comp_type = 'LIMITED BY GUARANTEE'
    elif temp_comp_type == 'S' and lang == 'en':
        temp_comp_type = 'LIMITED BY SHARES'
    elif temp_comp_type == 'U' and lang == 'en':
        temp_comp_type = 'UNLIMITED'
    elif temp_comp_type == 'B' and lang == 'ms':
        temp_comp_type = 'BERHAD MENURUT SAHAM DAN JAMINAN'
    elif temp_comp_type == 'G' and lang == 'ms':
        temp_comp_type = 'BERHAD MENURUT JAMINAN'
    elif temp_comp_type == 'S' and lang == 'ms':
        temp_comp_type = 'BERHAD MENURUT SYER'
    elif temp_comp_type == 'U' and lang == 'ms':
        temp_comp_type = 'TIDAK TERHAD'

    return temp_comp_type

def origin_country_mapping(temp_origin):

    if temp_origin == 'ADE':
        temp_origin = 'ADEN'
    elif temp_origin == 'MAL':
        temp_origin = 'MALAYSIA'
    elif temp_origin == 'SIN':
        temp_origin = 'SINGAPORE'
    
    return temp_origin

def officer_designation_mapping(temp_designation):

    if temp_designation == 'Q':
        temp_designation = 'ALT DIRECTOR'
    elif temp_designation == 'D':
        temp_designation = 'DIRECTOR'
    elif temp_designation == 'M':
        temp_designation = 'MANAGER'
    elif temp_designation == 'S':
        temp_designation = 'SECRETARY'
    elif temp_designation == 'A':
        temp_designation = 'AGENT'
    elif temp_designation == 'P':
        temp_designation = 'SUBSCRIBER'
    elif temp_designation == 'L':
        temp_designation = 'LIQUIDATOR'
    elif temp_designation == 'R':
        temp_designation = 'RECEIVER'
    elif temp_designation == 'T':
        temp_designation = 'AUTH PERSON'
    elif temp_designation == 'O':
        temp_designation = 'OWNER'
    elif temp_designation == 'V':
        temp_designation = 'PROVISIONAL LIQUIDATOR'

    return temp_designation

def branch_code(branch_code):

    if branch_code == 'AS':
        branch_name = 'KEDAH'
    elif branch_code == 'PG':
        branch_name = 'PULAU PINANG'    
    elif branch_code == 'IP':
        branch_name = 'PERAK'        
    elif branch_code == 'SA':
        branch_name = 'SHAH ALAM'
    elif branch_code == 'MA':
        branch_name = 'MELAKA'    
    elif branch_code == 'JM':
        branch_name = 'JOHOR BAHRU'    
    elif branch_code == 'KT':
        branch_name = 'KELANTAN'   
    elif branch_code == 'TR':
        branch_name = 'TERENGGANU'
    elif branch_code == 'CA':
        branch_name = 'PAHANG'         
    elif branch_code == 'KL':
        branch_name = 'KUALA LUMPUR' 
    elif branch_code == 'LA':
        branch_name = 'W.P. LABUAN'  
    elif branch_code == 'RA':
        branch_name = 'PERLIS'
    elif branch_code == 'NS':
        branch_name = 'N. SEMBILAN'
    elif branch_code == 'SW':
        branch_name = 'SARAWAK'
    elif branch_code == 'SB':
        branch_name = 'SABAH'
    elif branch_code == 'MY':
        # repeatative coding
        branch_name = 'KUALA LUMPUR'

    return branch_name



def charge_code(charge_code):

    if charge_code == 'S':
        charge_name = 'FULLY SATISFIED'
    elif charge_code == 'P':
        charge_name = 'PARTLY SATISFIED'    
    elif charge_code == 'R':
        charge_name = 'FULLY RELEASED'        
    elif charge_code == 'Q':
        charge_name = 'PARTLY RELEASED'
    elif charge_code == 'U':
        charge_name = 'UNSATISFIED'    
    elif charge_code == 'B':
        charge_name = 'CANCELLATION'    
    elif charge_code == 'C':
        charge_name = 'FULLY CEASED'   

    return charge_name
# AFG	AFGHANISTAN
# AGL	ANGUILLA
# AZB	REPUBLIC OF AZERBAIJAN
# NCD	NEW CALEDONIA
# LVA	LATVIA
# ALG	ALGERIA
# ALM	ALMAIN
# AND	ANDORRA
# ANG	ANGOLA
# ANT	ANTIGUA
# ARG	ARGENTINA
# ASA	AMERICAN SAMOA
# AST	AUSTRIA
# AUS	AUSTRALIA
# AZO	AZORES
# BAH	BAHRAIN
# BAL	BELEARIC ISLAND
# BAN	BANGLADESH
# BAR	BARBADOS
# BEL	BELGIUM
# BER	BERMUDA
# BHM	BAHAMAS
# BIS	BISSAU
# BOS	BOSNIA HERZOGOVINA
# BOL	BOLIVIA
# BRA	BRAZIL
# BRU	BRUNEI
# BUL	BULGARIA
# BUR	MYAMMAR
# BWI	BRITISH WEST INDIES
# CAM	CAMERON
# CAN	CANADA
# CEU	CEUTA & MELLILA
# CHA	CHAD
# CHI	CHILE
# CNI	CAYMAN ISLAND
# CRA	COSTA RICA
# CSI	CHRISTMAS ISLAND
# CUB	CUBA
# CVI	CAPE VERDE ISLAND
# CYI	CANARY ISLAND
# CYP	CYPRUS
# CZE	CZECHOSLOVAKIA
# DEN	DENMARK
# DOM	COMMONWEALTH OF DOMINICA
# DRK	KOREA (DEM. P.R)
# EGY	EGYPT
# EIR	EIRE
# EQU	EQUADOR
# ESR	EL SALVADOR
# ETH	ETHIOPIA
# FEI	FAEROE ISLAND
# FII	FIJI ISLAND
# FIN	FINLAND
# FRA	FRANCE
# FWI	FRENCH W. INDIES
# GAB	GABON
# GAM	GAMBIA
# GER	GERMANY
# GHA	GHANA
# GIB	GIBRALTAR
# GRA	GRANADA
# GRE	GREECE
# GTE	GUATEMALA
# GUA	GUAM
# GUI	GUINEA
# GUY	GUYANA
# HKG	HONG KONG
# HON	HONDURAS
# HUN	HUNGARY
# ICE	ICELAND
# INA	INDONESIA
# IND	INDIA
# IRN	IRAN
# IRQ	IRAQ
# ITA	ITALY
# JAM	JAMAICA
# JAP	JAPAN
# JOR	JORDAN
# KAM	KAMPUCHEA
# KEN	KENYA
# KUW	KUWAIT
# LAO	LAOS
# LEB	LEBANON
# LIB	LIBERIA
# LUX	LUXEMBORG
# MAC	MACAO
# MAD	MADERIA
# IRL	IRELAND
# MAL	MALAYSIA
# MAU	MAURITANIA
# MEX	MEXICO
# MLI	MALI
# MLT	MALTA
# MLW	MALAWI
# MON	MONTSERRAT
# MOR	MOROCCO
# MOZ	MOZAMBIQUE
# MRT	MAURITIUS
# MSI	MALDIVES ISLAND
# NAU	NAURA
# NEP	NEPAL
# NET	NETHERLANDS
# NGR	NIGER
# NHS	NEW HEBRIDES
# NIC	NICARAGUA
# NIG	NIGERIA
# NIU	NIUE
# NKI	NORFOLD ISLAND
# NOR	NORWAY
# NWI	NETHERLANDS WI
# NZD	NEW ZEALAND
# OMA	OMAN
# PAK	PAKISTAN
# PAN	PANAMA
# PAR	PARAGUAY
# PER	PERU
# PHI	PHILIPPINES
# PLD	POLAND
# PNG	PAPUA NEW GUINEA
# POR	PORTUGAL
# PRC	CHINA (PEOPLES REPUBLIC)
# PUE	PUERTO RICO
# RUM	RUMANIA
# SAN	SANAA (YEMEN ARAB REPUBLIC)
# SAU	SAUDIA ARABIA
# SEN	SENEGAL
# SEY	SEYCHELLES
# SIA	ST. LUCIA
# SIN	SINGAPORE
# SKA	ST. KITTA
# ALB	ALBANIA
# SNI	SOLOMON ISLAND
# SOK	KOREA SOUTH
# SOM	SOMALIA
# SPA	SPAIN
# SRI	SRI LANKA
# STP	ST. THOME & PRINCIPTE
# SUD	SUDAN
# SVT	ST. VINCENT
# SWE	SWEDEN
# SWI	SWITZERLAND
# TAH	TAHITI
# TAR	TANGIER
# THA	THAILAND
# TON	TONGUA
# TSI	TURKS ISLAND
# TTO	TRINIDAD & TABAGO
# TUN	TUNISIA
# TUR	TURKEY
# UAE	UNITED ARAB EMIRATES
# UGA	UGANDA
# UKG	UNITED KINGDOM
# URU	URUGUAY
# USA	UNITED STATES OF AMERICA
# USR	U.S.S.R.
# UVA	UPPER VOLTA
# VAT	VATICAN CITY
# VEN	VENEZUELA
# VIB	VIRGIN ISLAND (BRI)
# VIE	VIETNAM
# VIU	VIRGIN ISLAND (US)
# WSA	WESTERN SAMOA
# YUG	YUGOSLAVIA
# ZAI	ZAIRE
# ZAM	ZAMBIA
# ZIM	ZIMBABWE
# KOR	SOUTH KOREA
# IOM	ISLE OF MAN,BRITAIN
# TAI	TAIWAN
# SCO	SCOTLAND
# AFR	AFRICA
# SAF	SOUTH AFRICA
# BVI	BRITISH VIRGIN ISLANDS
# YAM	YAMAN
# LIA	LIBYA
# SYR	SYRIA
# CRO	CROATIA
# UBK	UZBEKISTAN
# CON	REPUBLIC OF CONGO
# KIR	REP. OF KIRIBATI
# COL	REPUBLIC OF COLOMBIA
# TAJ	REPUBLIK TAJIKISTAN
# LCH	LIECHTENSTEIN
# REB	REPUBLIC OF BELARUS
# PSE	PALESTINE
# QAT	QATAR
# KZT	KAZAKHSTAN
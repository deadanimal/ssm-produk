def comp_prof(self, request, *args, **kwargs):
    
    product_data = json.loads(request.body)
        
    items = product_data['test']
    language = product_data['lang']
 
    date_format = "%d-%m-%Y"
    time_zone = 'Asia/Kuala_Lumpur'

    if items['rocCompanyInfo']['companyType'] == 'B':
        companyType = 'Limited by Share and Guarantee'
    elif items['rocCompanyInfo']['companyType'] == 'G':
        companyType =' Limited by Guarantee'
    elif items['rocCompanyInfo']['companyType'] == 'S': 
        companyType = 'Limited by Shares'
    elif items['rocCompanyInfo']['companyType'] == 'U': 
        companyType = 'Unlimited'
    elif items['rocCompanyInfo']['companyType'] == 'R': 
        companyType = 'Private Limited'
    elif items['rocCompanyInfo']['companyType'] == 'U': 
        companyType = 'Public Limited'
        
        if items['rocCompanyInfo']['statusOfCompany'] == 'B':
            companyStatus = 'Dissolved Conversion to LLP'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'C':
            companyStatus ='Ceased Business'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'D': 
            companyStatus = 'Dissolved'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'E': 
            companyStatus = 'Existing'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'R': 
            companyStatus = 'Removed'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'W': 
            companyStatus = 'Winding Up'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'X': 
            companyStatus = 'Null and Void by Court Order'
        elif items['rocCompanyInfo']['statusOfCompany'] == 'Y': 
            companyStatus = 'Struck-off & Winding-up via Court Order'
        
        data_lol = {
            'CIName': items['rocCompanyInfo']['companyName'],
            'CILastOldName': items['rocCompanyInfo']['companyOldName'],
            'CIDateOfChange': date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format),
            'CIRegistrationNo': 'a',
            'CIIncorpDate': incorp_date.astimezone(pytz.timezone(time_zone)).strftime(date_format),
            'CICompanyType': companyType,
            'CICompanyStatus': companyStatus,
            'CIRegAddress1': items['rocCompanyInfo']['statusOfCompany']
        }

        date_of_change = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['dateOfChange'], '%Y-%m-%dT%H:%M:%S.000Z'))
        incorp_date = make_aware(datetime.datetime.strptime(items['rocCompanyInfo']['incorpDate'], '%Y-%m-%dT%H:%M:%S.000Z'))
        # officer_infos = (items['rocCompanyOfficerListInfo']['rocCompanyOfficerInfos']['rocCompanyOfficerInfos'])
        # charge_infos = (items['rocChargesListInfo']['rocChargesInfos']['rocChargesInfos'])
        # financial_year_end_date = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['financialYearEndDate'])
        # date_of_tabling = (items['rocBalanceSheetListInfo']['rocBalanceSheetInfos']['rocBalanceSheetInfos']['dateOfTabling'])

        # date_format = "%d-%m-%Y"
        # time_zone = 'Asia/Kuala_Lumpur'
        # localDatetime = hehe.astimezone(pytz.timezone(time_zone))
        # print('qwrqwrqwrqwr124', localDatetime)

        # items['rocCompanyInfo']['dateOfChange'] = date_of_change.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        # items['rocCompanyInfo']['incorpDate'] = incorp_date.astimezone(pytz.timezone(time_zone)).strftime(date_format)
        # print('doc', items['rocCompanyInfo']['dateOfChange'])
        print('inc', items['rocCompanyInfo']['incorpDate'])


        html_string = render_to_string('product/company_profile_nonctc_bi.html', {'items': items})
        html = HTML(string=html_string)
        pdf_file = html.write_pdf(stylesheets=[CSS('https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css')])
        
        file_path = "ssm/product/" + datetime.datetime.utcnow().strftime("%s") + "-" + uuid.uuid4().hex + '.pdf'
        saved_file = default_storage.save(
            file_path, 
            ContentFile(pdf_file)
        )
        
        full_url_path = settings.MEDIA_ROOT + saved_file

        serializer = 'https://pipeline-project.sgp1.digitaloceanspaces.com/'+file_path
        return Response(serializer)
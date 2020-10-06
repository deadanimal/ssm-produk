export class User {
  public id: string;
  public title: string;
  public full_name: string;
  public birth_date: string;
  public nationality: string;
  public identification_type: string;
  public nric_number: string;
  public gender: string;
  public race: string;
  public user_type: string;
  public email: string;
  public phone_number: string;
  public home_number: string;
  public office_number: string;
  public fax_number: string;
  public address_1: string;
  public address_2: string;
  public address_3: string;
  public city: string;
  public postcode: string;
  public state: string;
  public country: string;
  public registration_number: string;
  public company_name: string;
  public company_number: string;
  public company_email: string;
  public company_address_1: string;
  public company_address_2: string;
  public company_address_3: string;
  public company_city: string;
  public company_postcode: string;
  public company_state: string;
  public company_country: string;
  public position_or_grade: string;
  public head_of_department_name: string;
  public head_of_department_position: string;
  public head_of_department_email: string;
  public ministry_name: string;
  public division_name: string;
  public agency_name: string;
  public department_name: string;
  public username: string;
  public is_active: boolean;
  public egov_request: string;
  public egov_quota: string;
  public egov_package: number;

  constructor(
    id: string,
    title: string,
    full_name: string,
    birth_date: string,
    nationality: string,
    identification_type: string,
    nric_number: string,
    gender: string,
    race: string,
    user_type: string,
    phone_number: string,
    home_number: string,
    office_number: string,
    fax_number: string,
    address_1: string,
    address_2: string,
    address_3: string,
    city: string,
    postcode: string,
    state: string,
    country: string,
    registration_number: string,
    company_name: string,
    company_number: string,
    company_email: string,
    company_address_1: string,
    company_address_2: string,
    company_address_3: string,
    company_city: string,
    company_postcode: string,
    company_state: string,
    company_country: string,
    position_or_grade: string,
    head_of_department_name: string,
    head_of_department_position: string,
    head_of_department_email: string,
    ministry_name: string,
    division_name: string,
    agency_name: string,
    department_name: string,
    username: string,
    is_active: boolean,
    egov_request: string,
    egov_quota: string,
    egov_package: number
  ) {
    this.id = id;
    this.title = title;
    this.full_name = full_name;
    this.birth_date = birth_date;
    this.nationality = nationality;
    this.identification_type = identification_type;
    this.nric_number = nric_number;
    this.gender = gender;
    this.race = race;
    this.user_type = user_type;
    this.phone_number = phone_number;
    this.home_number = home_number;
    this.office_number = office_number;
    this.fax_number = fax_number;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.address_3 = address_3;
    this.city = city;
    this.postcode = postcode;
    this.state = state;
    this.country = country;
    this.registration_number = registration_number;
    this.company_name = company_name;
    this.company_number = company_number;
    this.company_email = company_email;
    this.company_address_1 = company_address_1;
    this.company_address_2 = company_address_2;
    this.company_address_3 = company_address_3;
    this.company_city = company_city;
    this.company_postcode = company_postcode;
    this.company_state = company_state;
    this.company_country = company_country;
    this.position_or_grade = position_or_grade;
    this.head_of_department_name = head_of_department_name;
    this.head_of_department_position = head_of_department_position;
    this.head_of_department_email = head_of_department_email;
    this.ministry_name = ministry_name;
    this.division_name = division_name;
    this.agency_name = agency_name;
    this.department_name = department_name;
    this.username = username;
    this.is_active = is_active;
    this.egov_request = egov_request;
    this.egov_quota = egov_quota;
    this.egov_package = egov_package;
  }
}
